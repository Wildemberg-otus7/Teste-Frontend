import EmployeeList from "../components/EmployeeList/EmployeeList"

const HomePage = () => {
  return (
    <div className="max-w-[1024px] mx-auto bg-white shadow-lg min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold">BeTalent</h1>
      </div>

      {/* Size indicator */}
      <div className="flex justify-center -mt-3">
        <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-md">
          <span className="md:hidden">375 Hug × 60 Hug</span>
          <span className="hidden md:inline">1024 × 60</span>
        </div>
      </div>

      {/* Title */}
      <div className="p-6 pb-2 flex items-center gap-2">
        <h2 className="text-2xl font-semibold">Funcionários</h2>
        <div className="hidden md:block bg-blue-100 text-[#0000FF] text-xs px-2 py-1 rounded">120 × 24</div>
      </div>

      {/* Employee List Component */}
      <EmployeeList />

      {/* Desktop size indicators */}
      <div className="hidden md:flex justify-center mt-4">
        <div className="bg-blue-100 text-[#0000FF] text-xs px-2 py-1 rounded">960 × 499</div>
      </div>
      <div className="hidden md:flex justify-center mt-4 mb-4">
        <div className="bg-blue-100 text-[#0000FF] text-xs px-2 py-1 rounded">1024 × 800</div>
      </div>
    </div>
  )
}

export default HomePage

