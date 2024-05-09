import React from 'react';

const SearchResults = ({data, setSearchTerm, setRecipientData, setIsOpen, setSelected, recentChats}) => {

    const onSelect = (user) => {
        setSearchTerm( `${user?.firstName} ${user?.lastName}`);
        const isPresent =  recentChats.some(rc => {
          if (rc.recipientEmail === user.emailAddress) {return true}});
          if(!isPresent) {
        setRecipientData({
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            profilePicUrl: user.profilePicUrl
        });
        setSelected(true)
      } else {
        setSelected(false)
      }
        setIsOpen(false)
       
    }

    return (
        <div className="w-full bg-white flex flex-col shadow-md rounded-lg mt-4 max-h-72 overflow-y-auto">
    {data?.map((user, id) => {
      return <SearchResult
      user={user}
      key={user.emailAddress}
      onClick={(user) => onSelect(user)}
    />;
    })}
  </div>
    )
}
export default SearchResults;

const SearchResult = ({user, onClick}) => {
    return (
        <div
        className="p-2 px-4 cursor-pointer hover:bg-gray-200"
        onClick={(e) => {onClick(user)}}
      >
       { `${user?.firstName} ${user?.lastName}`}
      </div>
    )
}