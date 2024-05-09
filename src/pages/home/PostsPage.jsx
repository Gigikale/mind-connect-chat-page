import * as React from "react";
import { useEffect, useState } from "react";
import OnboardingHeader from "../../components/headers/OnboardingHeader";
import CreatePostPageBody from "./post/CreatePostPageBody";
import Sidebar from "../../components/sidebar/Sidebar";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { FaRegEyeSlash } from "react-icons/fa6";
import axiosConfig from "../../services/api/axiosConfig";
import SweetAlert from "../../commons/SweetAlert";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth";
import CreatePostField from "../../components/formFields/CreatePostField";
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { AiTwotonePicture } from "react-icons/ai";
import { GoDeviceCameraVideo } from "react-icons/go";
import { GrAttachment } from "react-icons/gr";
import { GoSmiley } from "react-icons/go";
import { stepContentClasses } from "@mui/material";
import { MdOutlineRemoveRedEye } from "react-icons/md";


function PostsPage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [visible, setVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postcontent, setPostContent] = useState("");
    const [editPost, setEditPost] = useState({postId : "", postcontent : ""})
    const [isPostHidden, setIsPostHidden] = useState(() => {
        // Initialize the visibility status from local storage, or default to false if not found
        const storedValue = localStorage.getItem('isPostHidden');
        return storedValue ? JSON.parse(storedValue) : false;
    });
    useEffect(() => {
        // Update local storage whenever the visibility status changes
        localStorage.setItem('isPostHidden', JSON.stringify(isPostHidden));
    }, [isPostHidden]);



    const openModal = () => {
        setIsModalOpen(true);
        // setPostContent(content)
    };
    const editClick = (id, content) => {
        setEditPost({postId: id, postcontent : content})
        openModal();
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onValueChanged = (value) => {
        setPostContent(value)
        setEditPost({...editPost, postcontent:value})
    }

    const modalStyles = {
        content: {
            width: '30em',
            height: '300px',
            margin: 'auto',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
    };

  



    const axios = useAxiosWithAuth()

    const fetchData = async () => {
        try {
            const response = await axios.post("/user/news/feed", {
                isUser: true,
                groupId: "",
                page: 0,
                size: 0
            });
            if (response.status === 200) {
                console.log('Post fetched successfully:', response.data);
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


    const deletePost = async (id) => {
        console.log(id)
        setLoading(true)
        try {
            const res = await axiosConfig.delete(`/api/posts/${id}/delete`)
            if (res.status === 200 || res.status === 201) {
                SweetAlert("Post deleted succesfully!")
                fetchData()
                setTimeout(()=>{closeModal()}, 1000)
            }
            setLoading(false)
            console.log(res)
        } catch (error) {
            setLoading(false)
            throw error
        }
        setLoading(false)
    }

    const [postArray, setPostArray] = useState(new Array(posts.length).fill(false))

    const handleHidePost = async (postId) => {
        console.log('postId:', postId);
        setLoading(true);
        try {
            const res = await axios.post(`api/posts/${postId}/toggleVisibility`, {
                content: postId
            });
            console.log('Response:', res);
            if (res.status === 200 || res.status === 201) {
                if (isPostHidden) {
                    SweetAlert("Post unhidden successfully!"); 
                    fetchData()
                    setTimeout(()=>{closeModal()}, 1000)
                } else {
                    SweetAlert("Post hidden successfully!");
                }
                setIsPostHidden(!isPostHidden);
            }
            setLoading(false);
        } catch (error) {
            if (error?.code === "ERR_NETWORK") {
              SweetAlert("Network error. Please check your internet connection", "error")
            }
          }
    };
    
    
    

    const handleEditPost = async () => {
        console.log("edit post is ", editPost)
        try {
            console.log({ postcontent })
            const response = await axiosConfig.put(`/api/posts/${editPost.postId}/update`, {content: editPost.postcontent})

            console.log({ response })


            if (response.data.statusCode === 200) {
                SweetAlert(response.data.message, "success");
                fetchData()
                setTimeout(()=>{closeModal()}, 1000)
            }
                setEditPost({postId: "", postcontent: ""})
        } catch (error) {
            console.error("Error:", error);
            SweetAlert(error.message, "error");
        }
    };

    return (
        <div className=" bg-slate-100 min-h-screen">


            <OnboardingHeader />
            <div className="flex mx-24 gap-11 ">
                <div className="w-4/6 bg-[#fff] mt-8 p-4">
                    {/* <CreatePostPageBody/>  */}
                    <div className="postpage-header">
                        <h1 className="font-bold text-2xl">Your Posts</h1>
                    </div>
                    <div className="postpage-body grid gap-4 mt-8">
                        {
                            posts?.map(({ content, commentCount, likeCount, posterFirstName, posterLastName, postId, profilePictureUrl, timeCreated }) => (
                                <div className="py-[16px] px-[32px] rounded-lg border-b-2 min-h-[314px]" key={postId}>
                                    <div className="postpage-container-header flex justify-between items-center">
                                        <div className="postpage-header-left flex gap-4">
                                            <div>
                                                {<Icon icon="carbon:user-avatar" className="w-[40px] h-[40px] rounded-full" />}
                                            </div>
                                            <div>
                                                <h2 className="font-semibold text-base text-[#98A2B3]">{posterFirstName} {posterLastName}</h2>
                                                <p className="text-sm font-normal">{timeCreated}</p>
                                            </div>
                                        </div>
                                        <div className="postpage-header-right flex gap-2">
                                            <HiOutlineDotsHorizontal size={24} color="#667085" />
                                            <IoClose size={24} color="#667085" />
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
                                            <p className="text-[#475467] text-sm">{commentCount} comment{commentCount > 1 ? "s" : ""}</p>
                                        </div>
                                        
                                        <div className="mt-10 flex justify-evenly border-t-2 border-b-2 border-[#EEEEEE]">
                                            {/* <Link to={`/post/compose/?postId=${postId}`}> */}
                                            <button className="my-4 flex items-center gap-2 text-sm text-[#475467]"><FaEdit color="#667085" onClick={() => editClick(postId, content)} />Edit</button>
                                            <button className="my-4 flex items-center gap-2 text-[#475467]" onClick={() => deletePost(postId)}><GoTrash color="#667085" />{loading ? "Deleting..." : "Delete"}</button>
                                            <button className="my-4 flex items-center gap-2 text-[#475467]" onClick={() => handleHidePost(postId)}>
            {isPostHidden ? <FaRegEyeSlash color="#667085" /> : <MdOutlineRemoveRedEye />}
            {isPostHidden ? 'Show' : 'Hide'}
        </button>
                                        </div>
                                    </div>
                                    <Modal
                                        isOpen={isModalOpen}
                                        editPost={editPost}
                                        setEditPost={setEditPost}
                                        setPosts={setPosts}
                                        onRequestClose={closeModal}
                                        contentLabel="Update Post Modal"
                                        style={modalStyles}
                                    >
                                        <div className="relative flex flex-col max-md:ml-0 max-md:w-full">
                                            <div className="flex justify-end">
                                                <button onClick={closeModal} className="p-2 text-gray-500" style={{ fontSize: '30px' }}>
                                                    <IoIosClose />
                                                    <MdOutlineRemoveRedEye />
                                                </button>
                                            </div>
                                            <textarea
                                                // value={value}
                                                onChange={e => {
                                                    onValueChanged(e.target.value)
                                                }}
                                                value={editPost.postcontent}
                                                // onChange={e => setPostContent(e.target.value)}
                                                className="px-4 pt-7 bg-white border border-solid border-[color:var(--Grey-300,#D0D5DD)];"
                                                style={{ height: '200px' }}
                                                // placeholder={'placeHolder'}

                                            />
                                            <div className="absolute bottom-2 left-2 pt-20">
                                                <div className="flex gap-2">
                                                    <AiTwotonePicture />
                                                    <GoDeviceCameraVideo />
                                                    <GrAttachment />
                                                    <GoSmiley />
                                                </div>
                                            </div>
                                            <button onClick={handleEditPost} className="absolute bottom-2 right-2 bg-blue-500 text-white py-2 px-4 rounded mb-5">Post</button>

                                        </div>

                                    </Modal>
                                </div>

                            ))}
                    </div>
                </div>



                <div className="w-2/6">
                    <Sidebar />
                </div>

            </div>
        </div>
    );
}

export default PostsPage;
// Collapse
// has context menu
// Compose