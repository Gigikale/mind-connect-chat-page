import { Link } from "react-router-dom";
import SweetAlert from "../../commons/SweetAlert";
import axiosConfig from "../../services/api/axiosConfig";
import OurRoutes from "../../commons/OurRoutes";
import Loader from "../../commons/Loader";
import { useState } from "react";


const EmailSent = ({ email = "", type = "SIGNUP" }) => {
  const [loading, setLoading] = useState(false);


  const handleResend = async () => {
    setLoading(true);

    await axiosConfig.get(`/auth/resend-link?emailAddress=${email}&type=${type}`)
      .then((response) => {
        if (response.data["statusCode"] === 200) {
          SweetAlert(response.data["message"], "success")
          return
        } else {
          SweetAlert(response.data["message"], "error")
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-zinc-800 text-center text-base font-medium tracking-normal">
        <span className="font-medium text-neutral-400">
          An email has been sent to{" "}
        </span>
        <span className="font-semibold text-zinc-800">{email}</span>
        <span className="font-medium text-neutral-400">
          . Follow the steps in the email to get verified.
        </span>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/79b86c362bd9e83a06db08433a4a9d4ac58c0b6f79d2ba429a64efccf9a552f3?"
        className="w-14 aspect-square"
        alt="envelope"
      />
      <div className="text-neutral-400 text-center text-base font-medium tracking-normal mt-6">
        Didn't see the email? Check your spam folder or request a resend.
      </div>
      <button
        onClick={handleResend}
        className="text-center text-medium font-sm whitespace-nowrap text-white
                justify-center items-center bg-blue-700 max-w-full mt-8 mb-12 px-4 py-3 rounded-md max-md:px-5"
      >
        Resend email
      </button>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <Loader />
        </div>
      )}
      <Link
        to={OurRoutes.login}
        className="text-sky-950 text-center text-base font-medium
                underline self-center whitespace-nowrap mt-4"
      >
        Back to Login
      </Link>
    </div>
  );
}
export default EmailSent
