import * as React from "react";
import DescriptionFormField from "../../components/formFields/DescriptionFormField";
import TextFormField from "../../components/formFields/TextFormField";
import { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import SweetAlert from "../../commons/SweetAlert";
import OnboardingHeader from "../../components/headers/OnboardingHeader";
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth";
import SweetPopup from "../../commons/SweetPopup";
import CreatedGroupSuccessModal from "../../components/popups/CreatedGroupSuccessmodal";
import axiosConfig from "../../services/api/axiosConfig";
import { CircularProgress } from "@mui/material";
import Loader from "../../commons/Loader";
import JoinedGroupSuccessModal from "../../components/popups/JoinedGroupSuccessModal";
import { useNavigate } from "react-router-dom";
import OurRoutes from "../../commons/OurRoutes";
import useAuth from "../../services/hooks/useAuth";


function GroupPage() {
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [groups, setGroups] = React.useState([])
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [ isSuccess, setSuccess ] = useState(false);
  const [ showJoinedGroupSuccessModal, setShowJoinedGroupSuccessModal ] = useState(false);
  const [showCreatedGroupSuccessModal, setShowCreatedGroupSuccessModal] = useState(false);
  const navigate = useNavigate()
  const {emailAddress } = useAuth();
  const axios = useAxiosWithAuth()


  const handleClose = () => {
    setShowJoinedGroupSuccessModal(false)
    setShowCreatedGroupSuccessModal(false)
};

const handleCreateGroup = async () => {
  setLoading(true)
  await axios.post("/group/create-group", {
      name: name,
      about: about
  }).then((response) => {
      setLoading(false)
      console.log(name, about)
      if(response.data["statusCode"] === 200) {
        console.log("New group created response " + response)
          SweetAlert(response.data["message"], 'success')
          // window.location.reload();
          getGroups()
          setSuccess(true)
          return
      } else {
          SweetAlert(response.data["message"], 'error')
          return
      }
  }).catch(() => setLoading(false))
}

   const getGroups = () => {
    try {
      axiosConfig.get("/group/popular_groups?page=0&size=100")
      .then((data) => {
        console.log("Get Group Result "+ JSON.stringify(data.data, null, 2))
          const result = data?.data
          setGroups(result);
      })
      .catch((err) => console.error(err))
  } catch (error) {
      throw error
  }
   }   


useEffect(() => {
     getGroups()
},[])


// const joingroup = async (name) => {
//   try {
//      /*  const res = await axiosConfig.post(`/group/joinGroup?name=${name}`)
//       if(res.status === 200 || res.status === 201) {
//           SweetAlert("Group joined succesfully!")
//       } */
//       const response = await axiosConfig.post(`/group/joinGroup?name=${name}`)
//       .then((data) => {
//         if(data.status === 200 || data.status === 201) {
//           SweetAlert("Group joined succesfully!")
//         } else {
//           SweetAlert(response.data["message"], 'error')
//       }
//       })
//   } catch(error) {
//     alert(error)
//   }
// }


const joingroup = async (name) => {
 
  try {
      const response = await axiosConfig.post(`/group/joinGroup?name=${name}`);
      if (response !=null){
      if (response.status === 200 || response.status === 201) {
        console.log("Join group response " + response)
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
 
const isAMember = (emails) => {
  return Object.values(emails)?.some(value => 
    { const emailArray = value.split(',')
    console.log(emailArray)
    return emailArray.includes(emailAddress)
      });
      
}


  return (
    <div className="flex flex-col pb-12 bg-slate-50">
      <OnboardingHeader />

      <SweetPopup
        open={showCreatedGroupSuccessModal}
        loaderElement={
          loader ? (
            <CircularProgress size="70px" style={{ color: "#082567" }} />
          ) : (
            <CreatedGroupSuccessModal />
          )
        }
        handleClose={() => setShowCreatedGroupSuccessModal(false)}
      />

       <SweetPopup
          open={showJoinedGroupSuccessModal}
          loaderElement={<JoinedGroupSuccessModal />
          }
        />
      {/* {
          groups?.map((group, idx) => (
            <div className="flex gap-5 justify-between py-3 mt-6 tracking-normal whitespace-nowrap" key={idx}>
            <div className="grow text-gray-900">{group.name}</div>
            <div className="font-medium text-blue-700 cursor-pointer" role="button"onClick={() => joingroup(group?.name)}>Join</div>
          </div>
          ))
        } */}
      <div className="justify-center self-center px-4 py-8 w-full max-w-[1266px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[69%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-10 py-8 w-full bg-white rounded-2xl shadow-sm max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <div className="text-2xl font-bold leading-8 text-gray-900 max-md:max-w-full">
                Popular Groups
              </div>
              {groups?.map(
                ({
                  groupId,
                  name,
                  about,
                  usersCount,
                  postsCount,
                  adminName,
                  createdAt,
                  usersEmail
                }, index) => (
                  <div key={index} className="flex flex-col px-6 pt-4 pb-7 mt-6 bg-gray-50 rounded-2xl border-b border-solid shadow-sm border-b-[color:var(--Grey-400,#98A2B3)] max-md:px-5 max-md:max-w-full">
                    <div className="self-start text-2xl leading-8 text-blue-700">
                      {name}
                    </div>
                    <div className="w-[286px] h-5 justify-start items-start gap-8 inline-flex">
                      <div className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                        Created by: <div> {adminName} </div>
                      </div>
                      <div className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                        {createdAt}
                      </div>
                    </div>
                    <div className="flex flex-col px-2 py-1 mt-6 bg-white rounded-2xl max-md:max-w-full">
                      <div className="text-base font-medium tracking-normal leading-6 text-gray-400 max-md:max-w-full">
                        {about}
                      </div>
                      <div className="flex gap-5 justify-between mt-4 text-sm leading-5 text-gray-500 max-md:flex-wrap max-md:max-w-full">
                        <div> {usersCount} Members</div>
                        <div> {postsCount} Posts</div>
                      </div>
                    </div>
                    <div
                      className="self-end mt-4 mr-4 text-base font-medium tracking-normal leading-6 text-blue-700 
                                whitespace-nowrap max-md:mr-2.5"
                      role="button"
                      onClick={() => {isAMember(usersEmail) ? navigate(`${OurRoutes.joinedgroup}?groupId=${groupId}&groupName=${name}`): joingroup(name)}}
                    >
                      {isAMember(usersEmail)? "View Group" : "Join group"}
                      {/* Join Group */}
                    </div>
                  </div>
                )
              )}

              {/* <div className="self-start mt-8 text-2xl font-bold leading-8 text-gray-900 max-md:max-w-full">
                More Groups
              </div>
              <div className="flex gap-5 justify-between py-1.5 mt-6 max-w-full leading-[140%] w-[499px] max-md:flex-wrap">
                <div className="flex-auto text-2xl text-gray-900">
                  You Are What You Eat
                </div>
                <div className="my-auto text-base font-medium tracking-normal text-blue-700">
                  Join group
                </div>
              </div>
              <div className="flex gap-5 justify-between py-1.5 mt-5 max-w-full leading-[140%] w-[499px] max-md:flex-wrap">
                <div className="flex-auto text-2xl text-gray-900">
                  Jos Crisis PTSD
                </div>
                <div className="my-auto text-base font-medium tracking-normal text-blue-700">
                  Exit group
                </div>
              </div>
              <div className="flex gap-5 justify-between py-1.5 mt-5 max-w-full leading-[140%] w-[499px] max-md:flex-wrap">
                <div className="flex-auto text-2xl text-gray-900">
                  Grief & Loss Hugs
                </div>
                <div className="my-auto text-base font-medium tracking-normal text-blue-700">
                  Join group
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[31%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-end self-stretch px-6 py-8 my-auto w-full bg-gray-50 rounded-2xl shadow-sm max-md:px-5 max-md:mt-10">
              <div className="self-center text-2xl font-bold leading-8 text-gray-900 whitespace-nowrap">
                Create a new group here
              </div>
              <div className="mt-14 text-sm font-medium leading-5 text-neutral-800 max-md:mt-10">
                Group name
              </div>
              <TextFormField
                id={"name"}
                type={"text"}
                placeHolder={"Enter group name"}
                onValueChanged={(e) => setName(e)}
              />
              <div className="flex flex-col mt-4 whitespace-nowrap bg-white">
                <div className="text-sm font-medium leading-5 text-neutral-800">
                  About
                </div>
                <DescriptionFormField
                  id="description"
                  title="About"
                  placeHolder="write group description"
                  onValueChanged={(e) => setAbout(e)}
                />
              </div>
              <Button text="Create a new group" onClick={handleCreateGroup} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GroupPage;