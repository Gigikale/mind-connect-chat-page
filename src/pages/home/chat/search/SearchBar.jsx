import React from 'react';
import { useState, useEffect } from 'react';
import useAxiosWithAuth from '../../../../services/hooks/useAxiosWithAuth';
import useDebounce from '../../../../services/hooks/useDebounce';

const SearchBar = ({setData, searchTerm, setSearchTerm}) => {
    const [loading, setIsLoading] = useState(false);
    const axios = useAxiosWithAuth();
    const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce the searchTerm with a delay of 500ms

    useEffect(() => {
        const fetchOptions = async () => {
          setIsLoading(true);
          try {
            if (debouncedSearchTerm.length >= 1) {
            // Make fetch request to your API endpoint
            const response = await axios.get('/user/search', {
              params: {
                query: debouncedSearchTerm
              }
            });
            if (response.status !== 200) {
              throw new Error('Failed to fetch options');
            }
            const result = await response.data.data;
            console.log('result is ', result);
            setData(result); // Assuming data is an array of options
          } else {
            setData([]);
          }
          }catch (error) {
            console.error('Error fetching options:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchOptions();
      }, [searchTerm, setData]); // Fetch options when the component mounts

      const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
      };
    
    return (
        <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
    )
}
export default SearchBar;