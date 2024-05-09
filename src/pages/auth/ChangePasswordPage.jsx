import * as React from "react";
import { Button } from "../../components/Button";
import OnboardingHeader from "../../components/headers/OnboardingHeader";
import { useState } from "react";
import PasswordFormField from '../../components/formFields/PasswordFormField'
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth"
import { Link } from "react-router-dom";
import SweetAlert from "../../commons/SweetAlert";


function ChangePasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const axios = useAxiosWithAuth();

    const closeChangePassword = () => { };
    const handleToggle = () => {
        setVisible(!visible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await axios.patch("/user/password/change", {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
        })
            .then((response) => {
                setLoading(false);
                if (response != null) {
                    if (response.data.statusCode === 200) {
                        SweetAlert(response.data.message, "success");
                        closeChangePassword();
                    } else {
                        SweetAlert(response.data.message, "error");
                    }
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error:", error);
                SweetAlert("An error occurred. Please try again later.", "error");
            });
    };
    return (
        <div className="flex flex-col pb-12 bg-slate-50">
            <OnboardingHeader />

            <div className="flex overflow-hidden relative flex-col justify-center self-center mt-10 max-w-full text-3xl font-bold tracking-wide leading-10 text-white whitespace-nowrap min-h-[61px] w-[880px]">
                <img
                    loading="lazy"
                    srcSet="..."
                    className="object-cover absolute inset-0 size-full"
                />
                <div className="w-[880px] h-[61px] bg-blue-800 rounded-2xl relative justify-center items-center py-3 px-5 pr-16 pl-20 text-center rounded-2xl max-md:px-5 max-md:max-w-full">
                    Account
                </div>
            </div>
            <div className="self-center mt-8 max-w-full w-[731px]">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                    <div className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col p-4 w-full text-sm leading-5 bg-white max-md:mt-10">
                            <div className="text-gray-900">
                                <Link to={"/account/profile"}>Edit Profile</Link></div>
                            <div className="mt-6 text-blue-700 whitespace-nowrap">
                                <Link to={"/auth/change-password-page"}>Change Password</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[78%] max-md:ml-0 max-md:w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col px-10 font-['Inter'] pt-4 leading-5 text-gray-900 bg-white border border-solid border-[color:var(--Grey-300,#D0D5DD)] max-w-[478px]">
                                <PasswordFormField
                                    id="old-password"
                                    title="Old Password"
                                    placeholder="Type in old password"
                                    visible={visible}
                                    onToggle={handleToggle}
                                    onValueChanged={(e) => setOldPassword(e)}
                                />
                                <PasswordFormField
                                    id="password"
                                    title="New Password"
                                    placeholder="Type in new password"
                                    visible={visible}
                                    onToggle={handleToggle}
                                    onValueChanged={(e) => setNewPassword(e)}
                                />
                                <PasswordFormField
                                    id="password"
                                    title="Confirm New Password"
                                    placeholder="Confirm password"
                                    visible={visible}
                                    onToggle={handleToggle}
                                    onValueChanged={(e) => setConfirmPassword(e)}
                                />
                                <Button type="submit" text="Save change" className="text-white text-base font-semibold font-['Inter'] leading-snug tracking-tight justify-center items-center px-4 py-3 text-sm font-semibold mt-8 leading-5 text-white whitespace-nowrap bg-blue-700 rounded-md max-w-[398px] max-h-[44px]" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ChangePasswordPage;