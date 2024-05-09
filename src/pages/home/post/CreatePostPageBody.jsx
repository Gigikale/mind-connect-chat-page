import * as React from "react";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
import { IoFlagOutline } from "react-icons/io5";
import { useState } from "react";
import SweetAlert from "../../../commons/SweetAlert"
import useAxiosWithAuth from "../../../services/hooks/useAxiosWithAuth"
import CreatePostField from "../../../components/formFields/CreatePostField";



function CreatePostPageBody(props) {

    const [content, setContent] = useState("");
    // const [postedContent, setPostedContent] = useState('');
   

    const axios = useAxiosWithAuth()


    // const handleCreatePost = async () => {
    //     try {
    //       const response = await axios.post('/api/posts/create', {
    //         content: content
    //       });
    
    //       if (response.status === 200) {
    //         console.log('Post created successfully:', response.data);
    //         SweetAlert(response.data["message"], "success")
    //         // setPostedContent(response.data.data);
    //         setContent("");
            

    //       } else {
    //         console.error('Unexpected response status:', response.status);
           
    //       }
    //     } catch (error) {
    //       console.error('Error creating post:', error);
          
    //     }
    //   };
      const handleChange = (event) => {
        setContent(event.target.value);
      };

    
    return (
        <div className="flex flex-col pb-12">
            <div className="ml-24 mt-7 max-w-[1244px] max-md:max-w-full">
                <div className="">
                    <div className="flex flex-col max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">

                           <CreatePostField value={content} onValueChanged={e => setContent(e)}/>
                           
       
                            <div className="flex flex-col px-8 py-4 mt-12 bg-gray-50 rounded-2xl border-b border-solid border-b-[color:var(--Grey-400,#98A2B3)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                                <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                                    <div className="flex gap-5 justify-between text-center whitespace-nowrap">
                                        <img
                                            loading="lazy"
                                            srcSet="..."
                                            className="w-12 aspect-square"
                                        />
                                        <div className="flex flex-col flex-1 my-auto">
                                            <div className="text-base font-semibold tracking-normal leading-6 text-gray-900">
                                                Jane Doe
                                            </div>
                                            <div className="text-sm leading-5 text-gray-400">
                                                37 min
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 justify-between my-auto">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e07f950cedccdedf85d6e560390b4e6bec306eda2479d06f94076be48f4286bc?"
                                            className="w-6 aspect-square"
                                        />
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6536ec29deebf65e8721c749d6aba62ec2efe990a30c5178f0c88b5479e17608?"
                                            className="w-6 aspect-square"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 text-base tracking-normal leading-6 text-gray-900 max-md:max-w-full">
          
                                </div>
                                <div className="mt-4 text-base tracking-normal leading-6 text-gray-900 max-md:max-w-full">

                                </div>

                                <div className="flex gap-5 justify-between mt-4 w-full text-sm leading-5 text-slate-600 max-md:flex-wrap max-md:max-w-full">
                                    <div className="flex gap-1 justify-between whitespace-nowrap">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/090f3a7c6f1e070aa94b8f1669c0224a8b3203cbb7d00b7e81bd971dfbd7c033?"
                                            className="w-5 aspect-square fill-red-700"
                                        />
                                        <div>12</div>
                                    </div>
                                    <div className="flex-auto">9 comments</div>
                                </div>
                                <div className="self-center mt-2 max-w-full h-px bg-zinc-100 w-[620px]" />
                                <div className="flex gap-5 justify-between px-20 mt-2 w-full text-sm leading-5 whitespace-nowrap text-slate-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                    <div className="flex gap-1 justify-between">
                                       <button className="flex gap-2">
                                       <FcLike />
                                       Like
                                       </button>
                                    </div>
                                    <div className="flex gap-1 justify-between">
                                       <button className="flex gap-2">
                                       <FaRegComment />
                                       Comment
                                       </button>
                                    </div>
                                    <div className="flex gap-1 justify-between">
                                       <button className="flex gap-2">
                                       <IoFlagOutline />
                                       Report
                                       </button>
                                    </div>
                                </div>
                                <div className="self-center mt-2 max-w-full h-px bg-zinc-100 w-[620px]" />
                            </div>

                            <div className="flex gap-4 justify-center self-end px-5 mt-16 text-base tracking-normal leading-6 text-blue-600 max-md:mt-10">
                                <div>View older posts</div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad54d6b36a66e8e175a577cb019432571897eeacac761e925999a6abe8429bad?"
                                    className="w-6 aspect-square"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreatePostPageBody;





