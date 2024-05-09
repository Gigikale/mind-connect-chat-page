import React from 'react';
import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export const SearchUserModal = ({setIsOpen, isOpen , setSelected, setRecipientData, recentChats}) => {

 
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  



  return (
    <div>
    {isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 ml-[-400px] rounded-lg" style={{ width: '800px', height: '550px', marginTop: '150px' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">{recentChats.length === 0 ? 'Get Started' : 'Start a new chat'}</h2>
          {recentChats.length !== 0 ? <Icon icon="mdi-close" width={20} onClick={() => { console.log('clicked!'); setIsOpen(false) }} /> : null}
        </div>
        <div className="flex flex-col">
          <SearchBar 
          setData={setData} 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          />
         { data?.length > 0 ? 
         (<SearchResults data={data} setSearchTerm={setSearchTerm} setRecipientData={setRecipientData} setIsOpen={setIsOpen} setSelected={setSelected} recentChats={recentChats} />): null}
        </div>
      </div>
    </div>
  )}
</div>

  );
};