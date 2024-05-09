import * as React from "react";
import { Button, AuthLinkButton } from "../../components/Button";
import { Link } from "react-router-dom";
import OurRoutes from "../../commons/OurRoutes";
import Title from "../../commons/Title"
import { useState} from "react";
import axiosConfig from "../../services/api/axiosConfig";
import SweetAlert from "../../commons/SweetAlert";
import SweetPopup from "../../commons/SweetPopup";
import EmailSent from "../../components/popups/EmailSent";
import AuthFormField from "../../components/formFields/AuthFormField";
import Loader from "../../commons/Loader";


function ForgotPassword() {
    Title("MindConnect - Forgot Password?")

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [isLoadingElement, setLoadingElement] = useState(true)

    const handleSubmit = async () => {
        setLoading(true)
        await axiosConfig.get(`/auth/check-email-for-password-reset?emailAddress=${email}`)
            .then((response) => {
                setLoading(false)
                if (response.data["statusCode"] === 200) {
                    setLoading(true)
                    setLoadingElement(false)
                } else {
                    SweetAlert(response.data["message"], 'error')
                }
            }).catch((error) => {
                setLoading(false)
                if (error?.code === "ERR_NETWORK") {
                    SweetAlert("Network error. Please check your internet connection", "error")
                }
            })
    }

    return (
        <div className="flex justify-center items-center px-16 py-12 text-base leading-6 bg-white max-md:px-5">
            <SweetPopup
                open={loading}
                loaderElement={
                    isLoadingElement ? <Loader /> : <EmailSent email={email} type="RESET_PASSWORD" />
                }
            />
            <div className="flex flex-col justify-end p-12 mt-36 max-w-full bg-white rounded-3xl shadow-lg w-[479px] max-md:px-5 max-md:mt-10">

                <div className="self-center text-2xl font-bold leading-6 whitespace-nowrap text-sky-950">
                    Forgot Password
                </div>
                <div className="mt-10 text-sm leading-5 text-gray-900">
                    Enter the email associated with your account and we will send an email
                    with instructions to reset your password
                </div>
                {/* <p className="mt-4 tracking-normal text-sky-950">Email</p> */}

                {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5bcd41277efd2447f0e09a62e681b87572309ae7b4e5c0eb584c8294d9ad8e21?"
                        className="w-5 aspect-square"
                    /> */}
                <AuthFormField
                    title="Email"
                    id={"email"}
                    type={"email"}
                    placeholder="Enter your email"
                    className="flex-auto focus:outline-none"
                    onValueChanged={value => setEmail(value)}
                />

                <Button text={"Reset Password"} onClick={handleSubmit} />
                <div className="self-center mt-10 mb-12 font-medium tracking-normal text-blue-700 whitespace-nowrap">
                    <Link to={OurRoutes.login}>Back to Login</Link>
                </div>
            </div>
        </div>
    );
}


export default ForgotPassword;