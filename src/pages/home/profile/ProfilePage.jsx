import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { Link } from "react-router-dom";
import image from "../../../assets/profilepage.jpg"
import OnboardingHeader from "../../../components/headers/OnboardingHeader";
import useAxiosWithAuth from "../../../services/hooks/useAxiosWithAuth";
import SweetAlert from "../../../commons/SweetAlert";
import { useCallback } from "react";
import useAuth from "../../../services/hooks/useAuth";


const ProfileInput = ({ text = "", title = "", readOnly = "", onChange }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="">
            <label className="py-1 text-gray-500">{title}</label>
            <input
                type="text"
                value={text}
                className="w-full p-3 border rounded"
                readOnly={readOnly}
                onChange={handleChange}


            />
        </div>
    );
};



const ProfilePage = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        country: "",
        state: "",
        emailAddress: "",
        profilePicture: null,
        gender: "",
        mentalCondition: "",
    });

    const axios = useAxiosWithAuth();
    const { updateUser } = useAuth();

    const onLoad = async() => {
        await axios.get("/user/profile").then((response) => {
            console.log('response.data', response.data)
            if (response != null) {
                if (response.data["statusCode"] === 200) {

                    const userData = response.data["data"];
                    updateUser({
                        firstName: userData["firstName"],
                        lastName: userData["lastName"],
                      });

                    setProfile({
                        firstName: response.data["data"]["firstName"],
                        lastName: response.data["data"]["lastName"],
                        country: response.data["data"]["country"],
                        state: response.data["data"]["state"],
                        emailAddress: response.data["data"]["emailAddress"],
                        profilePicture: response.data["data"]["profilePicture"],
                        gender: response.data["data"]["gender"],
                        mentalCondition: response.data["data"]["mentalCondition"],
                    });
                   
                } else {
                    SweetAlert(response.data["message"], "error");
                }
            }
        });
    }

    useEffect(() => {
        onLoad();
    }, []);

    // useEffect(() => {
    //     onLoad();
    // }, [profile]);
   

    const handleSaveClick = async () => {
        try {
            const response = await axios.patch("/user/edit_profile", {

                firstName: profile.firstName,
                lastName: profile.lastName,
                country: profile.country,
                state: profile.state,
                gender: profile.gender,
                mentalCondition: profile.mentalCondition,
                profilePictureUrl: profile.profilePicture
            });
            console.log(response)

            if (response.data.statusCode === 200) {
                SweetAlert(response.data.message, "success");
                window.location.reload();
            } else {
                SweetAlert(response.data.message, "error");
            }
        } catch (error) {
            console.error("Error:", error.response.data);
            SweetAlert(error.response.data.message, "error");
            
        }
        
    };
   

    const handleInputChange = (field, value) => {
        setProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfile((prevProfile) => ({ ...prevProfile, profilePicture: file }));
        handleProfileUpload (file);
    };

    const handleProfileUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post("/user/profile/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response)
            if (response.data.statusCode === 200) {
                setProfile({profilePicture: response.data.data})
                SweetAlert(response.data.message, "success");
            } else {
                SweetAlert(response.data.message, "error");
            }
        } catch (error) {
            console.error("Error:", error.response.data);
            SweetAlert(error.response.data.message, "error");
        }
    };

    return (
 <div className="flex flex-col pb-8 bg-slate-50">
            <OnboardingHeader />
            <div className="flex overflow-hidden relative flex-col justify-center self-center mt-10 max-w-full text-3xl font-bold tracking-wide leading-10 text-white whitespace-nowrap min-h-[61px] w-[880px]">
                <img
                    loading="lazy"
                    srcSet="..."
                    className="object-cover absolute inset-0 size-full"
                />
                <div className="w-[880px] h-[61px] bg-blue-800 rounded-2xl relative justify-center items-center py-3 px-5 pr-16 pl-20 text-center max-md:px-5 max-md:max-w-full">
                    Account
                </div>
            </div>
            <div className="self-center mt-8 max-w-full w-[739px]">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                    <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col justify-center p-4 w-full text-sm leading-5 bg-white max-md:mt-10">
                            <div className="text-blue-700"><Link>Edit Profile</Link></div>
                            <div className="mt-6 text-gray-900 whitespace-nowrap">
                                <Link to={"/auth/change-password-page"}>Change Password</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[78%] max-md:ml-0 max-md:w-full">
                        <div className="flex grow gap-5 justify-between max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                            <div className="my-auto w-px bg-gray-300 h-[643px]" />
                            <div className="flex flex-col flex-1 px-5 max-md:max-w-full">
                                <div className="self-start text-2xl font-semibold leading-8 text-gray-900">
                                    Edit Profile
                                </div>
                                <div className="self-start mt-1 text-sm leading-5 text-gray-400 whitespace-nowrap">
                                    Only you can view and edit your profile
                                </div>
                                <div className="flex relative flex-col justify-end items-end self-center pt-12 pb-1 pl-16 pr-2 mt-4 max-w-full aspect-[1.14] w-[220px] h-[193px] max-md:pl-5">
                                    <img
                                        loading="lazy"
                                        className="w-full h-full object-cover absolute inset-0 size-full z-0 aspect-square fill-blue-700 max-md:mt-10"
                                        src={profile.profilePicture !==null ? profile.profilePicture : image}
                                    />
                                    <input
                                        type="file"
                                        id="fileInput"
                                        // style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    />
                                    <label htmlFor="fileInput" className="z-20">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/265e6381bb8a448ba7ac8ea2cc4eb3c75973d7caddba2906fb99812ac8c1c5a5?"
                                            className="mt-28 w-6 aspect-square fill-blue-700 max-md:mt-10 pr-10"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </label>

                                </div>
                                <div className="flex flex-col px-10 py-8 mt-4 text-sm leading-5 text-gray-900 bg-white border border-solid border-[color:var(--Grey-300,#D0D5DD)] max-md:px-5 max-md:max-w-full gap-2">
                                    <ProfileInput text={profile.firstName} title="First Name" onChange={(value) => handleInputChange("firstName", value)} />
                                    <ProfileInput text={profile.lastName} title="Last Name" onChange={(value) => handleInputChange("lastName", value)} />
                                    <ProfileInput text={profile.country} title="Country" onChange={(value) => handleInputChange("country", value)} />
                                    <ProfileInput text={profile.state} title="State" onChange={(value) => handleInputChange("state", value)} />
                                    <ProfileInput text={profile.emailAddress} title="Email Address" readOnly />
                                    {/* <ProfileInput text={profile.username} title="User Name" onChange={(value) => handleInputChange("username", value)} /> */}
                                    <ProfileInput text={profile.gender} title="Gender" onChange={(value) => handleInputChange("gender", value)} />
                                    <ProfileInput text={profile.mentalCondition} title="Mental Condition" onChange={(value) => handleInputChange("mentalCondition", value)} />

                                    <Button
                                        type="button"
                                        text="Save"
                                        className="text-white text-base font-semibold font-['Inter'] leading-snug tracking-tight justify-center items-center px-4 py-3 mt-8 mr-10 whitespace-nowrap bg-blue-700 rounded-md max-w-[398px] max-h-[44px]"
                                        onClick={handleSaveClick}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProfilePage;