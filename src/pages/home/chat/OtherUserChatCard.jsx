

import { Avatar} from "@mui/material"
import useAuth from "../../../services/hooks/useAuth";

export const OtherUserChatCard = ({ message }) => {
  const {user} = useAuth();
    return (
      <div className="relative flex items-center mb-4">
        {user.profilePicture ? <Avatar  src={user.profilePicture} sx={{ width: 50, height: 50 }} /> :
        <div className="w-12 h-12 px-3 py-2 bg-blue-600 rounded-full text-white flex items-center justify-center">
          {message.senderFirstName.charAt(0).toUpperCase() + message.senderLastName.charAt(0).toUpperCase()}
        </div>}
        <div className="ml-2 p-2 bg-gray-200 rounded-lg">
          <div className="text-gray-900 text-base font-normal font-inter leading-snug tracking-tight">
            {message.content}
          </div>
        </div>
      </div>
    );
  };