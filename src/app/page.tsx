import Image from 'next/image';
import logo from '../assets/images/logo.svg';

import EmployeeList from '../components/EmployeeList';

const HomePage = () => {
  return (
    <div className="bg-gray-00 h-fit min-h-screen">
      <div className="bg-white max-h-[3.75rem] p-3 border-b border-gray-200 shadow-xl z-10">
        <div className="relative h-[2.125rem] w-24">
          <Image src={logo} alt="Logo" layout="fill" objectFit="contain" />
        </div>
      </div>

      <EmployeeList />
    </div>
  );
};

export default HomePage;
