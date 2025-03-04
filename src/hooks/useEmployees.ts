"use client";

import { useState, useEffect } from "react";
import type { Employee } from "../types/employee";

const useEmployees = (searchTerm: string) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/employees?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar os funcionários");
        }
        const data = await response.json();
        setEmployees(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [searchTerm]);

  return { employees, loading, error };
};

export default useEmployees;