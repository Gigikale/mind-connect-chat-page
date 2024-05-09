import * as React from "react";
import { useState } from "react";
import AuthFormField from "../../components/formFields/AuthFormField";
import PasswordFormField from "../../components/formFields/PasswordFormField";
import { Button } from "../../components/Button";
import OurRoutes from "../../commons/OurRoutes";
import SweetAlert from "../../commons/SweetAlert";
import axiosConfig from "../../services/api/axiosConfig"
import useAuth from "../../services/hooks/useAuth"
import { Link, useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import { AuthDesign } from "../../components/AuthDesign";




function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const { setToken, setEmailAddress, setFirstName, setLastName } = useAuth()

  const handleToggle = () => {
    setVisible(!visible)
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.post("/auth/login", {
        emailAddress: email,
        Password: password,
      });
      setIsLoading(false);
      console.log("response.data on login is:", response.data);
      if (response.data["statusCode"] === 200) {
        SweetAlert(response.data["message"], "success")
        setEmailAddress(response.data["data"]["emailAddress"])
        setFirstName(response.data["data"]["firstName"])
        setLastName(response.data["data"]["lastName"])
        setToken(response.data["data"]["token"])
        await wait(1000)
        navigate(OurRoutes.homepage)
      } else {
        SweetAlert(response.data["message"], 'error')
      }
    } catch (error) {
      setIsLoading(false)
      if (error?.code === "ERR_NETWORK") {
        SweetAlert("Network error. Please check your internet connection", "error")
      }
    }
  };
  return (
    <AuthDesign
      child={
        <div className="flex flex-col flex-1 px-5 max-md:max-w-full">
          <div className="text-3xl font-weight: 700 not-italic tracking-wide leading-6 text-gray-900 max-md:max-w-full">
            Hi, Welcome back
          </div>
          <div className="mt-2 h-2 bg-blue-700 rounded-md w-[80px] pl-20" />
          <AuthFormField
            id="mail"
            title="Email"
            placeholder="Enter your email address"
            onValueChanged={(value) => setEmail(value)}
          />
          <div className="mt-4">
            <PasswordFormField
              id="pword"
              title="Password"
              placeholder="Enter password"
              visible={visible}
              onToggle={handleToggle}
              onValueChanged={(e) => setPassword(e)}
            />
          </div>
          <div className="mt-3 text-sm leading-5 text-blue-700 whitespace-nowrap">
            <span className="text-gray-500">
              Forgot password?{" "}
            </span>
            <Link
              to={OurRoutes.forgotpasswordpage}
              className="font-semibold text-blue-700"
            >
              Click here
            </Link>
          </div>
          <Button text="Login" onClick={handleLogin} />
          <div className="flex gap-4 items-center mt-6 text-gray-500 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <div className="self-stretch my-auto h-px bg-zinc-100 w-[200px]" />
            <div className="self-stretch">or</div>
            <div className="self-stretch my-auto h-px bg-zinc-100 w-[200px]" />
          </div>
          <div className="flex justify-center items-center px-16 py-2.5 mt-6 text-base font-medium leading-6 whitespace-nowrap bg-white rounded-lg border border-solid shadow-sm border-[color:var(--Gray-300,#D0D5DD)] text-slate-700 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-3">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/97a67a569365068eea268030e578dec3bc515c0a31c99351b36f6edc00cc8b89?"
                className="w-6 aspect-square"
              />
              <div className="grow">Sign in with Google</div>
            </div>
          </div>
          <div className="self-center mt-6 text-sm leading-5 text-blue-700 whitespace-nowrap">
            <span className="text-gray-500">
              Don't have an account?{" "}
            </span>
            <Link
              to={OurRoutes.signup}
              className="font-semibold text-blue-700"
            >
              Create account
            </Link>
          </div>
        </div>
      }
    />
  );
}

export default LoginPage;