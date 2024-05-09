import * as React from 'react';
import { OtherUserChatCard } from './OtherUserChatCard';
import { CurrentUserChatCard } from './CurrentUserChatCard';


const RealTimeChatComponent = React.memo(({messages, currentUserEmail}) => {
    return (
        <>
            {messages.map((message, index) => (
                message.senderEmailAddress === currentUserEmail ? (
                    <CurrentUserChatCard key={`${message.messageId}-${index}`} message={message} />
                ) : (
                    <OtherUserChatCard key={`${message.messageId}-${index}`} message={message} />
                )
            ))}
        </>
    );
});
export default RealTimeChatComponent;