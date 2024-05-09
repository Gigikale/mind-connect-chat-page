import * as React from "react";
import { Link } from "react-router-dom";
import { SlHome } from "react-icons/sl";
import { RiPassportLine } from "react-icons/ri";
import { CiChat1 } from "react-icons/ci";
import { RiGroupLine } from "react-icons/ri";
import OurRoutes from "../../commons/OurRoutes";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Divider } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import useAuth from "../../services/hooks/useAuth";
import { useState } from "react";
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth";
import { useNavigate } from "react-router-dom";
import Logout from '@mui/icons-material/Logout';
import SweetAlert from "../../commons/SweetAlert";
import swal from 'sweetalert';



function OnboardingHeader(props) {
    

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { firstName, lastName, logout } = useAuth()
    const axios = useAxiosWithAuth();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { user } = useAuth();

    console.log('user is ', user);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleViewProfileClick = () => {
        navigate(OurRoutes.profilepage);
        handleClose();
    };

    async function handleLogout() {
        const shouldLogout = await swal({
            title: "Logout",
            text: "Are you sure you want to logout from MindConnect?",
            icon: "warning",
            buttons: ["Cancel", "Logout"],
            dangerMode: true,
        });

        if (shouldLogout) {
            setLoading(true);
            handleClose();

            axios.get("/auth/logout").then((response) => {
                if (response != null && response.status === 200) {
                    logout();
                    navigate(OurRoutes.login);
                } else {
                    SweetAlert("Error while loggin you out", 'error')
                }
            })

        }
    }



    return (
        <div className="flex flex-col"
            style={{
                position: "sticky",
                top: "0",
                zIndex: "99",

            }}>
            <div className=" flex flex-col justify-center py-5 w-full bg-white shadow-sm leading-[140%] max-md:max-w-full border-b h-24">
                <div className="flex justify-center items-center px-16 w-full max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-5 justify-between w-full max-w-[1192px] max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col text-3xl font-bold tracking-wide text-blue-700">
                            <div>MindConnect</div>
                            <div className="shrink-0 mt-1 h-2 bg-blue-700 rounded-md w-[80px]" />
                        </div>
                        <div className="flex gap-5 justify-between my-auto text-base tracking-normal text-gray-400">
                            <form className="h-[46px] w-[329px] flex gap-5 justify-between px-4 py-3 bg-gray-50 rounded-md border border-solid border-[color:var(--Grey-400,#98A2B3)]">
                                <input type="text" placeholder="Search" className="bg-inherit focus:outline-none" />
                                <button>
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7b5d5964bf4db3f26e21e766437185137c09c65fa7bbd13efaf38e1f51fdce5?"
                                        className="self-start w-5 aspect-square"
                                    />
                                </button>

                            </form>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbfdeba8f427f2d4aad1c13cab9c9129ba8ff7b882e296243a55d0e4493c5bc3?"
                                className="my-auto w-6 aspect-square"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex flex-col items-center px-16 pt-2 w-full text-base font-medium bg-white border-b border-solid border-b-[color:var(--Grey-300,#D0D5DD)] max-md:px-5 max-md:max-w-full">
                <div className="flex gap-5 justify-between w-full max-w-[1226px] max-md:flex-wrap max-md:max-w-full">
                    <div className="flex gap-5 justify-between items-start tracking-normal text-gray-500 leading-[140%] max-md:flex-wrap max-md:max-w-full">
                        <div className="flex gap-2 justify-center px-4 py-3 rounded-md hover:text-blue-900">
                            <Link className="flex gap-2" to={OurRoutes.homepage} >
                                <SlHome />
                                Home
                            </Link>
                        </div>
                        <div className="flex gap-2 justify-center px-4 py-3 rounded-md hover:text-blue-900">
                            <Link className="flex gap-2" to={OurRoutes.grouppage} >
                                <RiGroupLine />
                                Groups
                            </Link>
                        </div>
                        <div className="flex gap-2 justify-center px-4 py-3 rounded-md hover:text-blue-900">
                        <Link className="flex gap-2" to={OurRoutes.postpage}  >
                                <RiPassportLine />
                                Posts
                            </Link>

                        </div>
                        <div className="flex gap-2 justify-center px-4 py-3 rounded-md hover:text-blue-900">
                            <Link className="flex gap-2" to={OurRoutes.chatpage} >
                                <CiChat1 />
                                Chats
                            </Link>

                        </div>
                    </div>
                    <div className="flex gap-2 self-start text-center ">
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{
                                    ml: 2
                                    // '&:hover': {
                                    //     backgroundColor: 'mediumblue' 
                                    //   },
                                }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                            <Avatar  src={user.profilePicture ? user.profilePicture : null} sx={{ width: 50, height: 50 }} />
                            </IconButton>
                        </Tooltip>
                        {/* <div className="justify-center self-start px-5 py-5 text-xs font-medium leading-4 text-center text-white whitespace-nowrap bg-blue-600 aspect-[1.35] rounded-[200px]">
              SA
            </div> */}
                        {user && user.firstName && user.lastName && (
        <div className="grow my-auto tracking-normal text-gray-900 leading-[140%]">
          {`${user.firstName} ${user.lastName}`}
        </div>
      )}
                    </div>
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleViewProfileClick}>
                        <ListItemIcon>
                            <PersonIcon color="blue" fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    {/* <Divider /> */}
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default OnboardingHeader;
