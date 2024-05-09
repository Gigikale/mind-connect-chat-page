

export const CurrentUserChatCard = ({ message }) => {
    return (
      <div className="relative flex items-center justify-end mb-4">
        <div className="p-2 bg-white">
          <div className="text-gray-900 text-base font-normal font-inter leading-snug tracking-tight">
            {message.content}
          </div>
        </div>
      </div>
    );
  };