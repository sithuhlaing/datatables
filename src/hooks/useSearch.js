
import { useState, useMemo } from 'react';

export const useSearch = (data) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData
  };
};
