import React, { useState } from "react";
import { Icon } from "@iconify/react";
import useAxiosWithAuth from "../services/hooks/useAxiosWithAuth";
import SweetAlert from "../commons/SweetAlert";
import axiosConfig from "../services/api/axiosConfig";
import { useNavigate } from "react-router-dom";
import {Modal, Box, Typography} from "@mui/material";
 
 
function PostAction({ postId = "", type = "", toggleCommentButton, id}){
    const [liked, setLiked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("");
    const [reason, setReason] = useState("");
    const handleOpen = () => {
      setIsOpen(!isOpen)
    }
   
 
  const handleClose = () => {
    setAnchorEl(null);
  };
  
 
const navigate = useNavigate()
 
    const axios = useAxiosWithAuth();
   // const postId = " ";
 
const handleLike = async (id) => {
    console.log(id)
    setLoading(true)
    try {
        console.log(postId)
        const res = await axiosConfig.post(`/like/post`, {
            content: postId
        });
        console.log(res)
        if(res.status === 200 || res.status === 201) {
            SweetAlert("Post liked succesfully!")
            window.location.reload()
        }
        setLoading(false)
        console.log(res)
    } catch (error) {
        setLoading(false)
        throw error
    }
    setLoading(false)
}
 
//  const handleReport = async(id) => {
//   console.log(id);
//   setLoading(true);
//   try {
//     console.log(postId);
//     const response = await axios.post(
//       `api/posts/${ postId }/report?reportReason=${ reportReason }`
//     );
//     console.log(response);
//     if (response.status === 200 || response.status === 201) {
//       SweetAlert(response.data["message"], "success");
//       window.location.reload();
//     } else {
//       SweetAlert(response.data["message"], "error");
//     }
//     setLoading(false);
//     console.log(response);
//   } catch (error) {
//     setLoading(false);
//     throw error;
//   }
//   setLoading(false);
// }
 
const handleReportPost = async (postId) => {
  console.log(postId)
  setLoading(true)
  try {
      const res = await axiosConfig.post(`/api/posts/${postId}/report?reportReason=${reason}`)
      if(res.status === 200 || res.status === 201) {
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


 
 
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
 
   return (
    <div
      style={{
        width: 694,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        gap: 160,
        display: "inline-flex",
      }}
    >
      <div
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 4,
          display: "flex",
        }}
      >
        <Icon icon="icon-park-outline:like" width={25} onClick={handleLike}/>
        <div
          style={{
            color: "#475467",
            fontSize: 14,
            fontFamily: "Inter",
            fontWeight: "400",
            lineHeight: 20,
            wordWrap: "break-word",
          }}
        >
          Like
        </div>
      </div>
      <div
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 4,
          display: "flex",
        }}
        onClick={() => {
          toggleCommentButton(postId)
          setAnchorEl(null);
        }}
      >
        <Icon icon="uil:comment" width={25} />
        <div
          style={{
            color: "#475467",
            fontSize: 14,
            fontFamily: "Inter",
            fontWeight: "400",
            lineHeight: 20,
            wordWrap: "break-word",
          }}
        >
          Comment
        </div>
      </div>
      <div
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 4,
          display: "flex",
        }}
        onClick={() => {
          setIsOpen(true)
          setAnchorEl(null);
        }}
      >
        <Icon icon="ph:flag" width={25}  />
        <div 
          style={{
            color: "#475467",
            fontSize: 14,
            fontFamily: "Inter",
            fontWeight: "400",
            lineHeight: 20,
            wordWrap: "break-word",
          }}
        >
          Report
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
          <textarea style={{ resize: "unset"}} className="min-h-[150px] p-2 rounded-lg mt-2 w-full border border-[#e8e8e8]" onChange={(e) => setReason(e.target.value)} value={reason}/>
          <div className="action-btn flex gap-2 items-center mt-2">
            <button onClick={() => setIsOpen(false)} className="bg-blue-500 h-[42px] text-white border rounded-lg w-full">Cancel</button><button 
            onClick={() => handleReportPost(id)} className="bg-green-500 h-[42px] text-white border rounded-lg w-full">{loading ? "Submit..." : "Submit"}</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
 
 
 
export default PostAction