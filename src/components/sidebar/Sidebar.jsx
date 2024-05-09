import * as React from "react";
import SidebarImage from '../../assets/SidebarImage.png'
import { useEffect, useState } from "react";
import axiosConfig from "../../services/api/axiosConfig";
import SweetAlert from "../../commons/SweetAlert";
import RecentChatsComponent from "../../pages/home/chat/RecentChatsComponent";
import SweetPopup from "../../commons/SweetPopup";
import JoinedGroupSuccessModal from "../popups/JoinedGroupSuccessModal";
import { useNavigate } from "react-router-dom";
import OurRoutes from "../../commons/OurRoutes";


const Sidebar = () => {

  const [groups, setGroups] = React.useState([])
  const [recentChats, setRecentChats] = useState([]);
  const [loader, setLoader] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [ showJoinedGroupSuccessModal, setShowJoinedGroupSuccessModal ] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
      try {
          axiosConfig.get("/group/popular_groups?page=0&size=100")
          .then((data) => {
              const result = data?.data
              setGroups(result);
          })
          .catch((err) => console.error(err))
      } catch (error) {
          throw error
      }
  },[])

  useEffect(() => {
    axiosConfig.get("/user/chat/recent?page=0&size=10")
      .then((response) => {
        const recentChatsData = response.data.data;
        setRecentChats(recentChatsData);
      })
      .catch((error) => {
        console.error("Error fetching recent chats:", error);
      });
  }, []);

  


//   const joingroup = async (name) => {
//     try {
//        /*  const res = await axiosConfig.post(`/group/joinGroup?name=${name}`)
//         if(res.status === 200 || res.status === 201) {
//             SweetAlert("Group joined succesfully!")
//         } */
//        const response = await axiosConfig.post(`/group/joinGroup?name=${name}`)
//         .then((response) => {
//           if(response.status === 200 || response.status === 201) {
//             SweetAlert("Group joined succesfully!")
//             setShowJoinedGroupSuccessModal(true)
//           } else {
//             SweetAlert(response.data["message"], 'error')
//         }
//         })
//     } catch(error) {
//       alert(error)
//     }
// }

const joingroup = async (name) => {
 
  try {
      const response = await axiosConfig.post(`/group/joinGroup?name=${name}`);
      if (response !=null){
      if (response.status === 200 || response.status === 201) {
          // Check if the user is a member
          const isMember = response.data.isUserMember; // Assuming the response contains this information
          const isAdmin = response.data.admin
          if (isMember || isAdmin) {
              // Redirect to visitgroup
              navigate(OurRoutes.joinedgroup);
          } else {
              // Implement join group
              SweetAlert("You are not a member. Joining group...");
              setShowJoinedGroupSuccessModal(true);
          }
      } else {
          SweetAlert(response.data["message"], 'error');
      }
    }
  } catch (error) {
      alert(error);
  }
}



  return (
    <div className="flex flex-col px-5 pt-10 pb-14 mx-auto w-full text-base leading-6 bg-white shadow-sm max-w-[480px] mt-20 mr-24">
          <SweetPopup
          open={showJoinedGroupSuccessModal}
          loaderElement={<JoinedGroupSuccessModal />
          }
        />
      <div className="flex flex-col px-2 py-4 w-full bg-white rounded-md shadow-md border-t ">
        <div className="self-center font-semibold tracking-normal text-center text-blue-600">
          Suggestions
        </div>
        <div className="shrink-0 mt-6 h-px bg-zinc-100" />
        <div className="mt-8 text-2xl font-bold text-center text-gray-900">
          Popular Groups
        </div>
        <div className="mt-2 text-sm leading-5 text-gray-400">
          Here is a list of some very active groups you might be interested in
          based on your location and engagements.
        </div>
        {
          groups?.map((group, idx) => (
            <div className="flex gap-5 justify-between py-3 mt-6 tracking-normal whitespace-nowrap" key={idx}>
            <div className="grow text-gray-900">{group.name}</div>
            <div className="font-medium text-blue-700 cursor-pointer" role="button"onClick={() => joingroup(group?.name)}>Join</div>
          </div>
          ))
        }
       
      </div>
      <img
        loading="lazy"
        srcSet={SidebarImage}
        className="mt-16 w-full aspect-[2.38]"
      />
      <div className="flex flex-col px-2 py-4 mt-16 w-full bg-white rounded-2xl shadow-sm">
        <div className="self-center font-semibold tracking-normal text-center text-blue-600">
          Messages
        </div>
        <div className="shrink-0 mt-6 h-px bg-zinc-100" />
        <div className="mt-8 text-2xl font-bold text-center text-gray-900">
          {" "}
          Chats
        </div>
        <div className="mt-2 text-sm leading-5 text-gray-400 whitespace-nowrap">
          Here is a list of people you chat with frequently.
        </div>
        {recentChats.map((chat, index) => (
          <div key={index} className="flex gap-5 justify-between py-3 mt-4 tracking-normal whitespace-nowrap">
            <div className="grow text-gray-900">{`${chat.otherUserFirstName} ${chat.otherUserLastName}`}</div>
            <div className="font-medium text-emerald-600">Online</div>
            <div className={`font-medium text-${chat.status === 'Online' ? 'emerald-600' : 'gray-400'}`}>{chat.status}</div>
          </div>
        ))}
      
      </div>
    </div>
  );
}
export default Sidebar;