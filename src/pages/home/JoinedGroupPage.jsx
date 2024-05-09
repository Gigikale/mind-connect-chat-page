import * as React from "react";
import { useParams } from 'react-router-dom';
import OnboardingHeader from "../../components/headers/OnboardingHeader";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import OurRoutes from "../../commons/OurRoutes";
import CreatePostField from "../../components/formFields/CreatePostField";
import PostAction from "../../components/PostAction";
import { Icon } from "@iconify/react";
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth";
import axiosConfig from "../../services/api/axiosConfig";
import SweetAlert from "../../commons/SweetAlert";
import {Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { useLocation } from 'react-router-dom';






function JoinedGroupPage({postId = ""}) {

    const [posts, setPosts] = useState([]);
    const [groups, setGroups] = React.useState([])
    const [comments, setComments] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [error, setError] = useState("");
    const [postcontent, setPostContent] = useState("");
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");

    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupId = searchParams.get('groupId');
  const groupName = searchParams.get('groupName')

  // Now you can use the groupId variable in your component
  console.log(groupId);
  console.log(groupName);

  const handleClose = () => {
    setAnchorEl(null); 
  };
  

const axios = useAxiosWithAuth()



const fetchData = async () => {
  try {
      const response = await axios.post("/user/news/feed", {
          isUser: false,
          groupId: groupId,
          page: 0,
          size: 0
      });
      if (response.status === 200) {
          console.log('posts fetched in joined group page:', response.data);
          setPosts(response.data.data); // Assuming data is in the 'data' property
      } else {
          console.error('Unexpected response status:', response.status);
          SweetAlert(response.data["message"], 'error')
      }
  } catch (error) {
      console.error('Error fetching post:', error);
      setError('Error fetching post: ' + error.message);
  }
};
useEffect(() => {

  fetchData();
}, []);

const handleCreateComment = async (id) => {
  setLoading(true)
  try{
    console.log({id})
  const resp = await axiosConfig.post(`/api/comments/create?postId=${id}`, {content:postcontent})
  // .then((response) => {
  //     setLoading(false)
      console.log(resp)
      if(resp.status === 200|| resp.status === 201) {
          SweetAlert('comment created successfully')
          setPostContent('')
          setLoading(true)
          setSuccess(true)
          return
      } setLoading(false)
      console.log(resp)
      }catch (error) {
    setLoading(false)
    throw error
}
}

const handleContentChange = (e) => {
  setPostContent(e.target.value)
}

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

  const handleFetchComment = async (id) => {
      try {
          const response = await axios.get(`api/posts/${id}/comments`);
          if (response.status === 200) {
              console.log('Post fetched successfully:', response.data);
              setComments(response.data.data); // Assuming data is in the 'data' property
          } else {
              console.error('Unexpected response status:', response.status);
              SweetAlert(response.data["message"], 'error')
          }
      } catch (error) {
          console.error('Error fetching post:', error);
          setError('Error fetching post: ' + error.message);
      }
  };


    return (
      <div className="bg-blue-50">
        <OnboardingHeader />
        <div className="bg-blue-50 py-12">
          <div className="flex justify-between px-10 items-center">
            <Link className="flex gap-2" to={OurRoutes.grouppage}>
              <FaLongArrowAltLeft />
              Go back
            </Link>
            <p class="font-inter text-32 font-bold leading-140 tracking-0.25 text-Main-Text">
              {groupName}
            </p>
            <button className="bg-blue-700 rounded-md text-white px-4 py-3 font-medium justify-center">
              Leave group
            </button>
          </div>
          <div className="justify-center items-start self-stretch py-3 pr-16 pl-3 text-base leading-6 text-gray-400 whitespace-nowraprounded border-[color:var(--Gray-400,#BDBDBD)] max-w-[628px] max-md:pr-5 ml-60">
            <CreatePostField groupId={groupId} fetchData={fetchData}/>
          </div>
              
          <div className="flex flex-col max-w-[962px] mx-60">
          {
               posts?.map(({content, commentCount, likeCount, posterFirstName, posterLastName, postId, profilePictureUrl, timeCreated}) => (
            <div className="flex flex-col px-12 py-4 w-full bg-gray-50 rounded-2xl border-b border-solid border-b-[color:var(--Grey-400,#98A2B3)] max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 justify-between pr-20 w-full max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                <div className="flex gap-5 justify-between text-center whitespace-nowrap">
                  <div className="justify-center self-start px-5 py-5 text-xs font-medium leading-4 text-center text-white whitespace-nowrap bg-blue-600 aspect-[1.35] rounded-[200px]">
                  {posterFirstName.substring(0, 1) + posterLastName.substring(0, 1)}
                  </div>
                  <div className="flex flex-col flex-1 my-auto">
                    <div className="text-base font-semibold tracking-normal leading-6 text-gray-900">
                    {posterFirstName} {posterLastName}
                    </div>
                    <div className="text-sm leading-5 text-gray-400">
                    {timeCreated}
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between my-auto">
                <div>
                        <Tooltip title="">
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                          >
                            <Icon icon="ph:dots-three-bold" width={25} />
                          </IconButton>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    
                          >
                            <MenuItem >
                              <ListItemIcon>
                                <SaveIcon fontSize="small" color="blue" />
                              </ListItemIcon>
                              Block Account
                            </MenuItem>
                            <Divider />
                            <MenuItem >
                              <ListItemIcon>
                                <Icon icon="ph:flag" width={25} color="blue" />
                              </ListItemIcon>
                              Report account
                            </MenuItem>
                          </Menu>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip title="">
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                          >
                            <Icon icon="fontisto:close-a" />
                          </IconButton>
                          <Menu
                            id="basic"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                          >
                          </Menu>
                        </Tooltip>
                      </div>
                </div>
              </div>
              <div className="mt-4 text-base tracking-normal leading-6 text-gray-900 max-md:max-w-full">
               {content}
              </div>
              <div className="flex gap-5 justify-between mt-4 w-full text-sm leading-5 text-slate-600 max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-1 justify-between whitespace-nowrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a94d0eb7a9dfb3ef41ec3b92dd7c35d48c33df384d16fe4f3be1f96bad211b9?"
                    className="w-5 aspect-square fill-red-700"
                  />
                  <div>{likeCount}</div>
                </div>
                <div>{commentCount} comment{commentCount > 1 ? "s" : ""}</div>
              </div>
              <div className="self-center mt-2 max-w-full h-px bg-zinc-100 w-[621px]" />
              <div className="flex justify-center items-center px-16 mt-2 text-sm leading-5 whitespace-nowrap text-slate-600 max-md:px-5 max-md:max-w-full">
                <PostAction />
              </div>
              <div className="self-center mt-2 max-w-full h-px bg-zinc-100 w-[621px]" />
              {comments?.map(({content, likeCount, commenterFirstName, commenterLastName, commentId, profilePictureUrl, timeCreated}) => (   
              <div className="flex gap-5 justify-between mt-6 max-md:flex-wrap max-md:max-w-full">
              <Icon icon="carbon:user-avatar-filled" width={50} />
                <div className="flex flex-col flex-1 justify-center max-md:max-w-full">
                  <div className="flex flex-col px-2 py-1 text-base tracking-normal text-gray-900 bg-white rounded-2xl max-md:max-w-full">
                    <div className="font-semibold text-center leading-[140%] max-md:max-w-full">
                      {commenterFirstName} {commenterLastName}
                    </div>
                    <div className="mt-1 leading-6 max-md:max-w-full">
                    {content}
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between pr-20 mt-1 w-full text-sm leading-5 text-slate-600 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                    <div className="flex gap-4">
                      <div>{timeCreated}</div>
                      <div>Like</div>
                      <div>Reply</div>
                    </div>
                    <div className="flex gap-1 justify-between whitespace-nowrap">
                    <div>{likeCount}</div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dff9dfd6547b96026e4302c27caae99fabdddfd9e5322f5bbfc72442d83f115c?"
                        className="w-5 aspect-square fill-red-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
              ))}
              <div className="flex gap-5 justify-between self-start mt-6 max-md:flex-wrap max-md:max-w-full">
                {/* <div className="justify-center self-start px-5 py-5 text-xs font-medium leading-4 text-center text-white whitespace-nowrap bg-blue-600 aspect-[1.35] rounded-[200px]">
                <Icon icon="carbon:user-avatar-filled" width={50} />
                </div> */}
                {/* <div className="flex flex-col flex-1 justify-center max-md:max-w-full">
                  <div className="flex flex-col px-2 py-1 text-base tracking-normal leading-6 text-gray-900 bg-white rounded-2xl max-md:max-w-full">
                    <div className="font-semibold text-center max-md:max-w-full">
                      Jane Doe
                    </div>
                    <div className="mt-1 max-md:max-w-full">
                      There are many variations of passages of Lorem Ipsum.{" "}
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between mt-1 w-full text-sm leading-5 text-slate-600 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex gap-4">
                      <div>19 min</div>
                      <div>Like</div>
                      <div>Reply</div>
                    </div>
                    <div className="flex gap-1 justify-between whitespace-nowrap">
                      <div>2</div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d82b1efcb81330bae0a3251da5892386b869c583cfa381666c1122dea5f7ccdf?"
                        className="w-5 aspect-square fill-red-700"
                      />
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="flex gap-5 justify-between mt-6 max-md:flex-wrap max-md:max-w-full">
                <Icon icon="carbon:user-avatar-filled" width={50} />{" "}
                <form className="flex gap-5 justify-between px-2.5 py-3 w-full bg-white rounded border border-solid border-[color:var(--Gray-400,#BDBDBD)] max-md:flex-wrap max-md:max-w-full">
                  {/* <div className="flex-auto text-base leading-6 text-neutral-500">
                        Write a comment
                      </div>{" "} */}
                  <input
                    type="text"
                    placeholder="Write a comment"
                    className="grow border-none"
                    value={postcontent}
                    onChange={handleContentChange}
                  />
                  <div className="flex gap-1 justify-between text-sm leading-5 whitespace-nowrap text-slate-600" 
                   onClick={() => handleCreateComment(postId)}>
                    <Icon
                      icon="lucide:send"
                      width={25}
                    />{" "}
                    <div className="grow my-auto">send</div>
                  </div>
                </form>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    );
}
export default JoinedGroupPage;