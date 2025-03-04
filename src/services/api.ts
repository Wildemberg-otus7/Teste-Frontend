import { NextApiRequest, NextApiResponse } from 'next'
import { Employee } from '../../src/types/employee'

const employees: Employee[] = [
  // Adicione aqui os dados dos funcionários
  {
    id: 1,
    name: 'John Doe',
    job: 'Developer',
    admission_date: '2022-01-01',
    phone: '5511999999999',
    image: '/path/to/image.jpg'
  },
  // Outros funcionários...
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query

  if (typeof search === 'string') {
    const filteredEmployees = employees.filter(employee =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    )
    res.status(200).json(filteredEmployees)
  } else {
    res.status(200).json(employees)
  }
}