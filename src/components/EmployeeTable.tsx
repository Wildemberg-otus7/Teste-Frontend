'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Employee } from '@/types/employee';

interface EmployeeTableProps {
  employees: Employee[];
}

const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return '00/00/0000';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

const formatPhone = (phone: string) => {
  if (!phone) return '+55 (55) 55555-5555';
  return phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
};

const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  const [expandedEmployees, setExpandedEmployees] = useState<
    Record<string | number, boolean>
  >({});

  const toggleExpand = (employeeId: string | number) => {
    setExpandedEmployees((prev) => ({
      ...prev,
      [employeeId]: !prev[employeeId],
    }));
  };

  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-11rem)]">
        <p className="text-gray-500 text-lg">Nenhum funcionário encontrado.</p>
      </div>
    );
  }

  return (
    <>
      <div className="lg:hidden">
        <div className="bg-blue-primary text-white py-3 px-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center">
            <div className="w-20 font-bold">FOTO</div>
            <div className="flex-1 font-bold">NOME</div>
          </div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>
        <ul className="bg-white divide-y divide-gray-100 rounded-lg">
          {employees.map((employee, idx) => (
            <li
              key={employee.id}
              className={`${idx == employees.length ? 'rounded-b-lg' : ''} flex flex-col shadow-sm`}
            >
              <div
                className="flex items-center px-4 py-3 cursor-pointer"
                onClick={() => toggleExpand(employee.id)}
              >
                <div className="w-20">
                  <Image
                    src={employee.image || '/placeholder.svg'}
                    alt={employee.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 font-medium">{employee.name}</div>
                {expandedEmployees[employee.id] ? (
                  <ChevronUp className="w-5 h-5 text-blue-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-primary" />
                )}
              </div>

              {expandedEmployees[employee.id] && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="font-medium">Cargo</div>
                    <div className="text-right">{employee.job}</div>

                    <div className="font-medium">Data de admissão</div>
                    <div className="text-right">
                      {formatDate(employee.admission_date)}
                    </div>

                    <div className="font-medium">Telefone</div>
                    <div className="text-right">
                      {formatPhone(employee.phone)}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden lg:block">
        <table className="w-full bg-white shadow-lg rounded-t-lg overflow-hidden">
          <thead className="bg-blue-primary text-white">
            <tr className="py-3.5">
              <th className="text-left px-8 font-medium">FOTO</th>
              <th className="text-left px-8 font-medium">NOME</th>
              <th className="text-left px-8 font-medium">CARGO</th>
              <th className="text-left px-8 font-medium">DATA DE ADMISSÃO</th>
              <th className="text-left py-3 px-8 font-medium">TELEFONE</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-gray-100 shadow-sm">
                <td className="px-8">
                  <Image
                    src={employee.image || '/placeholder.svg'}
                    alt={employee.name}
                    width={34}
                    height={34}
                    className="h-[34px] rounded-full object-cover"
                  />
                </td>
                <td className="py-4 px-8">{employee.name}</td>
                <td className="py-4 px-8">{employee.job}</td>
                <td className="py-4 px-8">
                  {formatDate(employee.admission_date)}
                </td>
                <td className="py-4 px-8">{formatPhone(employee.phone)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeTable;
