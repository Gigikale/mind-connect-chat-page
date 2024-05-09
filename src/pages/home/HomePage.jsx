import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/sidebar/Sidebar"
import OnboardingHeader from "../../components/headers/OnboardingHeader"
import { Icon } from "@iconify/react";
import SweetAlert from "../../commons/SweetAlert";
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Modal, Box, Typography } from "@mui/material";
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth";
import SaveIcon from '@mui/icons-material/Save';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CreatePostField from "../../components/formFields/CreatePostField"
import PostAction from "../../components/PostAction";
import axiosConfig from "../../services/api/axiosConfig";
import { useNavigate } from "react-router-dom";


function HomePage({ postId = "", commentId = "" }) {

    const [posts, setPosts] = useState([]);
    // const [comments, setComments] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [error, setError] = useState("");
    const [postcontent, setPostContent] = useState("");
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [id, setId] = useState("");
    const [content, setContent] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [showComments, setShowComments] = useState({index: null, show: false});
    console.log('showcomments is ', showComments);
    // const [postId, setPostId] = useState(null)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };


    const toggleCommentButton = (postId, index) => {
      posts.some(post => {
        console.log("This is post.postId: ", post.postId)
        console.log("This is postId: ", postId)
        if(post.postId===postId){
          console.log("id found")
          if(showComments.index === index){
            if(showComments.show === true){
            setShowComments({index, show: false})
            }else {
              setShowComments({index, show: true})
            }
          }else{
            setShowComments({index, show: true})
            }
      }
    })
    }


    const axios = useAxiosWithAuth()
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await axios.post("/user/news/feed", {
                isUser: false,
                groupId: null,
                page: 0,
                size: 0
            });
            if (response.status === 200) {
                console.log('Post fetched successfully:', response.data);
                setPosts(response.data.data);
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
              // window.location.reload()
              setPostContent('')
              handleFetchComment(id)
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
              console.log('Commnt fetched successfully:', response.data);
              // setComments(response.data.data); // Assuming data is in the 'data' property
              const comments = response.data.data;
              setPosts(prevPost => prevPost.map(post => {
                if(post.postId === id){
                  return {...post, comments}
                }   return post
              }))
           
          } else {
              console.error('Unexpected response status:', response.status);
              SweetAlert(response.data["message"], 'error')
          }
      } catch (error) {
          console.error('Error fetching post:', error);
          setError('Error fetching post: ' + error.message);
      }

      
  };

  const handleLikeComment = async (id) => {
    console.log(id)
    setLoading(true)
    try {
      if (!commentId) {
          throw new Error('Comment ID is missing or null');
      }
        const resp = await axiosConfig.post("/like/comment", {
            content: commentId
        });
        console.log(resp)
        if(resp.status === 200 || resp.status === 201) {
            SweetAlert("Comment liked succesfully!")
            window.location.reload()
        }
        setLoading(false)
        console.log(resp)
    } catch (error) {
        setLoading(false)
        throw error
    }
    setLoading(false)
 };


    const handleReportPost = async (postId) => {
        console.log(postId)
        setLoading(true)
        try {
            const res = await axiosConfig.post(`/api/posts/${postId}/report?reportReason=${reason}`)
            if (res.status === 200 || res.status === 201) {
                SweetAlert("Post reported!")
                setLoading(false)
                setIsOpen(false)
                console.log(res)
                window.location.reload()
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            SweetAlert("Post already reported", 'error')
        }
        setLoading(false)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const handRouterPush = () => {
        navigate(`/createpostfield`)
    }



    return (
        <div className="flex flex-col pb-12 bg-slate-70">
            <OnboardingHeader />
            <div className="flex flex-col px-10 justify-center  bg-slate-50 rounded border border-solid">
                <div className="flex flex-col justify-center pt-5 px-10 text-base leading-6 text-gray-400 whitespace-nowrap max-w-[628px]">
                    <CreatePostField fetchData={fetchData} />
                    {/* <input
                onClick={handRouterPush}
                placeholder={"What's on your mind?"}

                style={{
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    background: '#fff',
                    cursor: 'pointer',
                    width: '500px'
                }}
                value={content}
                readOnly
            /> */}

                </div>
                <div className="mx-5 mt-6 max-md:mr-2.5 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                        <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full border-solid rounded-2xl">
                            <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                                {
                                    posts?.map(({content, commentCount, likeCount, posterFirstName, posterLastName, postId, profilePictureUrl, timeCreated, comments}, index) => (
                                      <div className="flex flex-col px-8 py-4 bg-white rounded-2xl border border-solid mt-5 border-b-[color:var(--Grey-400,#98A2B3)] max-md:px-5 max-md:max-w-full">
                                            <div className="flex gap-5 justify-between pr-1.5 w-full max-md:flex-wrap max-md:max-w-full">
                                                <div className="flex gap-5 justify-between text-center whitespace-nowrap">
                                                    <div className="justify-center self-start px-5 py-5 text-xs font-medium leading-4 text-center text-white whitespace-nowrap bg-blue-600 aspect-[1.35] rounded-[200px]">
                                                        {posterFirstName.substring(0, 1) + posterLastName.substring(0, 1)}
                                                    </div>
                                                    <div className="flex flex-col flex-1 my-auto">
                                                        <div className="font-semibold text-center leading-[140%] max-md:max-w-full">
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
                                                                style={{
                                                                    zIndex: "99999"
                                                                }}

                                                            >
                                                                <MenuItem >
                                                                    <ListItemIcon>
                                                                        <SaveIcon fontSize="small" color="blue" />
                                                                    </ListItemIcon>
                                                                    Block Account
                                                                </MenuItem>
                                                                <Divider />
                                                                <MenuItem onClick={() => {
                                                                    setIsOpen(true)
                                                                    setId(postId)
                                                                    setAnchorEl(null);
                                                                }} >
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
                                            <div className="mt-3 postpage-container-body">
                                                <p className="text-[#101828]">{content}</p>
                                                <div className="pt-4 flex justify-between items-center">
                                                    <p className="flex items-center gap-2 text-[#475467] text-sm" >
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/56f11efc5c2631e4ec06d02c80380e32329d858cb1968906fc21df73aa210292?"
                                                            className="w-5 aspect-square fill-red-700"
                                                        />{likeCount}</p>
                                                     <p className="text-[#475467] text-sm" onClick={() =>{handleFetchComment(postId);  toggleCommentButton(postId, index)}}>{commentCount} comment{commentCount > 1 ? "s" : ""} </p>
                                                </div>
                                            </div>
                                            <div className="self-center mt-2 max-w-full h-px bg-zinc-100 w-[626px]" />
                                            <div className="flex gap-5 justify-between px-20 mt-2 w-full text-sm leading-5 whitespace-nowrap text-slate-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                                <PostAction postId= {postId} type = "posts" toggleCommentButton={toggleCommentButton} id={id} setId={setId}/>
                                            </div>
                                            <div className="self-center mt-2 max-w-full h-px bg-zinc-100 w-[626px]" />
                                            {showComments.index === index && showComments.show? (comments?.map(({content, likeCount, commenterFirstName, commenterLastName, commentId, profilePictureUrl, timeCreated}) => (                 
                                                <div className="gap-5 mt-6 max-md:flex-wrap max-md:max-w-full">
                                                    <div className="flex gap-4">
                                                        <Icon icon="carbon:user-avatar-filled" width={50} />
                                                        <div className="flex flex-col flex-grow">
                                                            <div className="font-semibold text-gray-900">
                                                            {commenterFirstName} {commenterLastName}
                                                            </div>
                                                            <div className="mt-1 leading-6 max-md:max-w-full">
                                                            {content}{" "}
                                                            </div>
                                                            <div className="flex justify-between mt-1 text-sm leading-5 text-slate-600 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                                                                <div className="flex gap-4">
                                                                    <div>{timeCreated}</div>
                                                                    <div onClick={handleLikeComment}>Like</div>
                                                                    <div>Reply</div>
                                                                </div>
                                                                <div className="flex gap-1 items-center">
                                                                    <div>{likeCount}</div>
                                                                    <img
                                                                        loading="lazy"
                                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/56f11efc5c2631e4ec06d02c80380e32329d858cb1968906fc21df73aa210292?"
                                                                        className="w-5 aspect-square fill-red-700"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>{" "}





                                                </div>))) : null}{" "}
                                                {showComments? (<div className="flex gap-5 justify-between mt-6 max-md:flex-wrap max-md:max-w-full">
                                                 <Icon icon={profilePictureUrl} width={50} />{" "}
                                                <form className="flex gap-5 justify-between px-2.5 py-3 w-full bg-white rounded border border-solid border-[color:var(--Gray-400,#BDBDBD)] max-md:flex-wrap max-md:max-w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Write a comment"
                                                        className="grow border-none"
                                                        value={postcontent}
                                                        onChange={handleContentChange}
                                                    />
                                                    <div className="flex gap-1 justify-between text-sm leading-5 whitespace-nowrap text-slate-600">
                                                        <Icon icon="lucide:send" width={25} onClick={() => handleCreateComment(postId)} />{" "}
                                                        <div className="grow my-auto" onClick={() => handleCreateComment(postId)}>send</div>
                                                    </div>
                                                </form>
                                            </div>) : null}
                                        </div>
                                    ))}
                            </div>
                        </div>{" "}
                        {/* <div className="flex flex-col px-5 py-11 mx-auto w-full text-base leading-6 bg-white shadow-sm max-w-[480px]">
              <Sidebar />
            </div> */}
                    </div>
                </div>{" "}
                <div className="flex gap-4 justify-center self-center mt-16 text-base tracking-normal leading-6 text-blue-600 whitespace-nowrap max-md:mt-10">
                    <div className="grow" >View older posts</div>{" "}
                    <Icon icon="mynaui:arrow-down" width={25} />
                </div>
            </div>
            <Modal
                open={isOpen}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-base font-medium">
                        Report Reason:
                    </Typography>
                    <textarea style={{ resize: "unset" }} className="min-h-[150px] p-2 rounded-lg mt-2 w-full border border-[#e8e8e8]" onChange={(e) => setReason(e.target.value)} value={reason} />
                    <div className="action-btn flex gap-2 items-center mt-2">
                        <button onClick={() => setIsOpen(false)} className="bg-blue-500 h-[42px] text-white border rounded-lg w-full">Cancel</button><button
                            onClick={() => handleReportPost(id)} className="bg-green-500 h-[42px] text-white border rounded-lg w-full">{loading ? "Submit..." : "Submit"}</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default HomePage;