import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a Pokémon..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      {searchTerm && (
        <button onClick={handleClear} className="clear-btn">
          Clear
        </button>
      )}
    </div>
  );
}
