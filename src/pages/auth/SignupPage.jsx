import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthFormField from "../../components/formFields/AuthFormField";
import { Button } from "../../components/Button";
import PasswordFormField from "../../components/formFields/PasswordFormField";
import DropdownField from "../../components/formFields/DropdownFormField";
import OurRoutes from "../../commons/OurRoutes";
import SweetAlert from "../../commons/SweetAlert";
import axiosConfig from "../../services/api/axiosConfig";
import SweetPopup from "../../commons/SweetPopup";
import EmailSent from "../../components/popups/EmailSent";
import { AuthDesign } from "../../components/AuthDesign";
import Loader from "../../commons/Loader";
import Conditions from "../../components/popups/Conditions";

export default function SignupPage() {
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [condition, setCondition] = useState("");
  const [gender, setGender] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoadingElement, setLoadingElement] = useState(true)

  const genders = ["Male", "Female", "Prefer not to say", "Other"]

  const handleSubmit = async () => {
    setLoading(true)
    await axiosConfig.post("/auth/signup", {
      emailAddress: email,
      firstName: firstName,
      lastName: lastName,
      condition: condition,
      state: state,
      country: country,
      Password: password,
      repeatPassword: confirmPassword,
      gender: gender
    }).then((response) => {
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


  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleConfirmToggle = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  const handleOptionChange = (option) => {
    setSelectedOption(option)
  }


  return (
    <AuthDesign
      child={
        <div className="flex flex-col grow mt-16 max-md:mt-10 max-md:max-w-full">
          <SweetPopup
            open={loading}
            loaderElement={isLoadingElement ? <Loader /> : <EmailSent email={email} />}
          />
          <div className="self-start text-3xl font-bold tracking-wide leading-10 text-gray-900">
            Registration
          </div>
          <div className="mt-1 h-2 bg-blue-700 rounded-md w-[194px]" />
          <div className="flex gap-5 justify-between mt-14 whitespace-nowrap max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col flex-1">
              <AuthFormField
                id="fname"
                title="First Name"
                placeholder="Enter First Name"
                onValueChanged={(value) => setFirstName(value)}
              />
            </div>
            <div className="flex flex-col flex-1 whitespace-nowrap">

              <AuthFormField
                id="lastname"
                title="Last Name"
                placeholder="Enter Last Name"
                onValueChanged={(value) => setLastName(value)}
              />
            </div>
          </div>
          <div className="flex gap-5 justify-between">
            <div className="flex flex-col flex-1 whitespace-nowrap">
              <AuthFormField
                id="mail"
                title="Email"
                placeholder="Enter your email address"
                onValueChanged={(value) => setEmail(value)}
              />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 whitespace-nowrap mt-5 text-inter text-left text-sm
            font-medium self-stretch w-full mt-6 max-md:max-w-full max-md:mt-6">Mental Condition(Optional)</div>
              <Conditions className="mt-10" />
              {/* <AuthFormField
                id="condition"
                title="Mental Condition"
                placeholder="Enter your condition"
                onValueChanged={(value) => setCondition(value)} */}
              {/* /> */}
              {/* <DropdownField
                title="Mental Condition(Optional)"
                placeHolder="Please select"
                isCustom={true}
                isSearchable={false}
                onSelected={(item) => {}}
              /> */}
            </div>
          </div>
          <div className="flex gap-5 justify-between items-center">
            <div className="flex flex-col flex-1">
              <AuthFormField
                id="country"
                title="Country"
                placeholder="Enter your country"
                onValueChanged={(value) => setCountry(value)}
              />
            </div>
            <div className="flex flex-col flex-1">
              <AuthFormField
                id="state/province"
                title="State/Province of Residence"
                placeholder="Enter your state/province"
                onValueChanged={(value) => setState(value)}
              />
            </div>
          </div>
          <div className="flex gap-5 justify-between mt-5 whitespace-nowrap max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col flex-1">
              <PasswordFormField
                id="pword"
                title="Password"
                placeholder="Enter password"
                visible={visible}
                onToggle={handleToggle}
                onValueChanged={(e) => setPassword(e)}
              />
            </div>
            <div className="flex flex-col flex-1 whitespace-nowrap">
              <PasswordFormField
                id="cpword"
                title="Confirm Password"
                placeholder="Enter password"
                visible={visible}
                onToggle={handleConfirmToggle}
                onValueChanged={(e) => setConfirmPassword(e)}
              />
            </div>
          </div>
          <div className="self-start mt-4 text-sm font-medium leading-5 text-neutral-800 max-md:max-w-full">
            Gender
          </div>
          <div className="flex gap-5 justify-between self-start mt-1">
            {genders.map((value) => {
              return (
                <label>
                  <input
                    type="radio"
                    value={value}
                    checked={selectedOption === value}
                    onChange={() => handleOptionChange(value)}
                  />
                  <span style={{ marginLeft: "5px" }}>{value}</span>
                </label>
              );
            })}
          </div>
          <Button text="Create account" onClick={handleSubmit} />
          <div className="self-center mt-6 text-sm leading-5 text-blue-700 whitespace-nowrap">
            <span className="text-gray-500">Already have an account? </span>
            <Link to={OurRoutes.login} className="font-semibold text-blue-700">
              Sign in
            </Link>
          </div>
          <div className="self-center mt-6 text-sm leading-5 text-slate-500 max-md:max-w-full">
            <span className="text-gray-500">
              By creating an account you agree to our{" "}
            </span>
            <span className="text-blue-700">Privacy Policies</span>,{" "}
            <span className="text-slate-500">and</span>
            <span className="text-blue-700"> Terms.</span>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e68350710b89f6d9bf0967402820ffd59c96dbb493cf5a8ef8738eeb0015315b?"
            className="self-end mt-10 mr-16 w-4 aspect-[0.94] fill-indigo-400 fill-opacity-30 max-md:mr-2.5"
          />
        </div>
      }
    />
  );
}
