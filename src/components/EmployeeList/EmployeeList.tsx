"use client";

import { useState } from "react";
import useEmployees from "../../hooks/useEmployees";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";

const normalizeString = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
};

const normalizePhone = (phone: string) => {
  return phone.replace(/\D/g, "");
};

const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return "00/00/0000";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

const formatPhone = (phone: string) => {
  if (!phone) return "+55 (55) 55555-5555";
  return phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
};

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { employees, loading, error } = useEmployees(searchTerm);

  const searchQuery = normalizeString(searchTerm);

  const filteredEmployees = employees.filter(employee => {
    const nameMatch = normalizeString(employee.name).includes(searchQuery);
    const jobMatch = normalizeString(employee.job).includes(searchQuery);
    const phoneMatch = normalizePhone(employee.phone).includes(searchQuery);

    return nameMatch || jobMatch || phoneMatch;
  });

  const searchMessage = filteredEmployees.length
    ? `Sucesso na busca de "${searchTerm}" entre os funcionários encontrados. Correspondência em: ${
        filteredEmployees.map(employee => {
          const matches = [];
          if (normalizeString(employee.name).includes(searchQuery)) matches.push("nome");
          if (normalizeString(employee.job).includes(searchQuery)) matches.push("cargo");
          if (normalizePhone(employee.phone).includes(searchQuery)) matches.push("telefone");
          return `${employee.name} (${matches.join(", ")})`;
        }).join("; ")
      }`
    : `Nenhum resultado encontrado para "${searchTerm}". Tente pesquisar pelo cargo, nome ou telefone.`;

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-primary"></div>
      </div>
    );

  if (error)
    return <div className="p-4 text-red-500 bg-red-50 rounded-md m-4">Erro: {error}</div>;

  return (
    <div className="bg-gray-50">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar"
            className="w-full py-3 px-4 rounded-[20px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0000FF] pl-10 bg-white shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        {searchTerm && (
          <div className={`text-sm p-4 ${filteredEmployees.length ? "text-blue-700" : "text-red-500"}`}>
            {searchMessage}
          </div>
        )}
      </div>

      <div className="md:hidden">
        <div className="bg-[#0000FF] text-white py-3 px-4 flex items-center rounded-none">
          <div className="w-20 font-bold">FOTO</div>
          <div className="flex-1 font-bold">NOME</div>
          <ChevronDown className="w-5 h-5 text-white" />
        </div>
        <ul className="bg-white divide-y divide-gray-100">
          {filteredEmployees.map((employee) => (
            <li key={employee.id} className="flex items-center px-4 py-3">
              <div className="w-20">
                <Image
                  src={employee.image || "/placeholder.svg"}
                  alt={employee.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1 font-medium">{employee.name}</div>
              <ChevronDown className="w-5 h-5 text-[#0000FF]" />
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden md:block">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-[#0000FF] text-white">
              <th className="text-left py-3 px-4 font-bold w-[120px]">FOTO</th>
              <th className="text-left py-3 px-4 font-bold">NOME</th>
              <th className="text-left py-3 px-4 font-bold">CARGO</th>
              <th className="text-left py-3 px-4 font-bold">DATA DE ADMISSÃO</th>
              <th className="text-left py-3 px-4 font-bold">TELEFONE</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <Image
                    src={employee.image || "/placeholder.svg"}
                    alt={employee.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{employee.name}</td>
                <td className="py-3 px-4">{employee.job}</td>
                <td className="py-3 px-4">{formatDate(employee.admission_date)}</td>
                <td className="py-3 px-4">{formatPhone(employee.phone)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;