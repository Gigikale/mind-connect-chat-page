import React from 'react';
import {useState, useEffect} from 'react';


const RecentChatsComponent = React.memo(({onClick, recentChats, fetchRecentChats})  => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

      
      useEffect(() => {
        fetchRecentChats();

      }, []);
      
      const onCardClick = (index, chat) => {
       
        if (selectedIndex !== -1) {
          setSelectedIndex(index);
        } else if (selectedIndex !== index) {
          onClick(chat);
        }
      }
      
      
    return (
        recentChats.map((chat, index) => (
          <>
    <div className="bg-white p-4 flex items-center cursor-pointer" key={chat.chatMessageId} onClick={() => {onCardClick(index, chat)}}>
       {chat?.otherUserProfilePictureUrl ? (<img className="w-12 h-12 relative rounded-[200px]"
                src={ chat.otherUserProfilePictureUrl} /> ) :
                <div className="w-12 h-12 px-3 py-2 bg-blue-600 rounded-full text-white flex items-center justify-center">
                {chat.otherUserFirstName.charAt(0).toUpperCase() + chat.otherUserLastName.charAt(0).toUpperCase()}
              </div> }
               
              <div className="flex flex-col justify-center ml-3 w-full">
                <div className="contact-box-header flex justify-between w-full mb-1">
                        <h3
                        className="text-center text-gray-900 text-base font-semibold font-['Inter'] leading-snug tracking-tight">{
                    chat?.otherUserFirstName + ' ' + chat?.otherUserLastName}
                        </h3>
                        <span className="text-gray-500 text-xs">{chat?.timeCreated}
                        </span>
                    </div>
                         <span className="flex items-end">{
                         chat?.message.length > 50 ? chat?.message.substring(0, 50) + '...' : chat?.message}
                         </span>
                </div>
           
    </div>
     <div className="flex w-[100%] h-px bg-zinc-100"/>
    </>
        ))
    );
});

export default RecentChatsComponent;