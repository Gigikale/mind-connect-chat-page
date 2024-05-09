import * as React from "react";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
// import {AuthLinkButton, Button} from "../../components/Buttons";
import OurRoutes from "../../commons/OurRoutes";
import PasswordFormField from "../../components/formFields/PasswordFormField";
import Title from "../../commons/Title"
import { useLocation, useNavigate } from "react-router-dom";
import axiosConfig from "../../services/api/axiosConfig";
import SweetPopup from "../../commons/SweetPopup";
import SweetAlert from "../../commons/SweetAlert";


function ResetPasswordPage() {
    const [password, setPassword] = useState("")
    const [ token, setToken ] = useState("")
    const [visible, setVisible] = useState(true)
    const [ loading, setLoading ] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmVisible, setConfirmVisible] = useState(true)
    const params = useLocation()
    const navigate = useNavigate()

    const handleToggle = () => {
        setVisible(!visible)
    }
    const handleConfirmToggle = () => {
        setConfirmVisible(!confirmVisible)
    }

    useEffect(() => {
        const token = params.search.substring(7)
        setToken(token)
    }, [ ])

    const handleSubmit = async () => {
        setLoading(true)
        await axiosConfig.post(`/auth/reset-password?token=${token}`, {
            newPassword: password,
            confirmPassword: confirmPassword
        }).then((response) => {
            setLoading(false)
            if (response.data["statusCode"] === 200) {
                SweetAlert(response.data["message"], 'success')
                setTimeout(() => navigate(OurRoutes.login), 1000);
            } else {
                SweetAlert(response.data["message"], 'error')
            }
        }).catch((error) => {
            setLoading(false)
            if(error?.code === "ERR_NETWORK") {
                SweetAlert("Network error. Please check your internet connection", "error")
            }
        })
    }

    Title("MindConnect - Reset Your Password")

    return (
        <div className="flex justify-center items-center px-16 py-12 text-base leading-6 bg-white text-sky-950 max-md:px-5">
             <SweetPopup open={loading} />
            <div className="flex flex-col justify-end p-12 mt-36 max-w-full bg-white rounded-3xl border border-solid shadow-sm border-[color:var(--Grayscale-Label-BG,#EAEBEC)] w-[479px] max-md:px-5 max-md:mt-10">
                <div className="self-center text-2xl font-bold leading-6 whitespace-nowrap">
                    Reset Password
                </div>
               
                <PasswordFormField
                            id={"new-password"}
                            title={"Enter New Password"}
                            visible={visible}
                            value={ password }
                            onValueChanged={e => setPassword(e)}
                            onToggle={handleToggle}
                        />
               
                 <PasswordFormField
                            id={"confirm-password"}
                            title={"Confirm New Password"}
                            visible={confirmVisible}
                            value={ confirmPassword }
                            onValueChanged={e => setConfirmPassword(e)}
                            onToggle={handleConfirmToggle}
                        />
                 <Button text={"Reset Password"} onClick={handleSubmit}/>
            </div>
        </div>
    );
}

export default ResetPasswordPage;


