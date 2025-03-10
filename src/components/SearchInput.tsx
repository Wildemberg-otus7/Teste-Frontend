import { Search } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchInput = memo(({ searchTerm, setSearchTerm }: SearchInputProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm, setSearchTerm]);

  return (
    <div className="pt-0 pb-5 lg:py-8 relative">
      <input
        type="text"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        placeholder="Pesquisar"
        className="w-full h-12 py-3 px-4 border border-gray-10 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary"
      />
      <Search
        className="absolute right-4 top-4 lg:top-12 text-gray-10"
        size={18}
      />
    </div>
  );
});

export default SearchInput;
