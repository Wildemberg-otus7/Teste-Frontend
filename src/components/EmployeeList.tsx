'use client';

import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import useEmployees from '../hooks/useEmployees';
import SearchInput from './SearchInput';
import EmployeeTable from './EmployeeTable';
import { Employee } from '../types/employee';

const normalizeString = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .toLowerCase();
};

const normalizePhone = (phone: string) => {
  return phone.replace(/\D/g, '');
};

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { employees, loading, error } = useEmployees(searchTerm);

  const searchQuery = normalizeString(searchTerm);

  const filteredEmployees = employees.filter((employee: Employee) => {
    const nameMatch = normalizeString(employee.name).includes(searchQuery);
    const jobMatch = normalizeString(employee.job).includes(searchQuery);
    const phoneMatch = normalizePhone(employee.phone).includes(searchQuery);
    return nameMatch || jobMatch || phoneMatch;
  });

  const searchMessage = filteredEmployees.length
    ? `Encontramos "${searchTerm}" em: ${filteredEmployees
        .map((employee) => {
          const matches = [];
          if (normalizeString(employee.name).includes(searchQuery))
            matches.push('nome');
          if (normalizeString(employee.job).includes(searchQuery))
            matches.push('cargo');
          if (normalizePhone(employee.phone).includes(searchQuery))
            matches.push('telefone');
          return `${employee.name} (${matches.join(', ')})`;
        })
        .join('; ')}`
    : `Nenhum resultado encontrado para "${searchTerm}".`;

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md m-4">
        Erro: {error}
      </div>
    );

  return (
    <div className="px-8 w-full h-fit min-h-[calc(100vh-3.75rem)] shadow-lg mb-[10.125rem]">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="py-6 lg:py-11 flex items-center gap-2">
          <h2 className="text-xl text-black font-medium">Funcionários</h2>
        </div>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {searchTerm && (
          <div
            className={`hidden lg:block absolute top-[7.5rem] left-4 text-xs p-4 ${
              filteredEmployees.length ? 'text-blue-700' : 'text-red-500'
            }`}
          >
            {searchMessage}
          </div>
        )}
      </div>
      <EmployeeTable employees={filteredEmployees} />
    </div>
  );
};

export default EmployeeList;
