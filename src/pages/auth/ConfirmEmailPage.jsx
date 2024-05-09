import * as React from "react";
import { Button } from "../../components/Button";


function ConfirmEmail() {
  
  return (
    <div className="flex justify-center items-center px-16 py-12 text-sm leading-5 bg-white max-md:px-5">
      <div className="flex flex-col justify-center items-center p-12 mt-36 max-w-full bg-white rounded-3xl border border-solid shadow-sm border-[color:var(--Grayscale-Label-BG,#EAEBEC)] w-[479px] max-md:px-5 max-md:mt-10">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a871f5e68a7d889fad1ca7e93bc0c56dd25f18386dc6ae290507474e113b91f9?"
          className="w-16 aspect-square"
        />
        <div className="mt-10 text-2xl font-bold whitespace-nowrap text-blue-950">
          Check your mail
        </div>
        <div className="mt-10 leading-5 text-center text-gray-900">
          We sent a password reset link to your email. Please click the link to
          reset your password.
        </div>
        <div className="mt-6 leading-5 text-center text-blue-700 whitespace-nowrap">
          Didn't received an email?{" "}
          <a href="#" className="font-semibold text-blue-700">Click to Resend</a>
        </div>
        <Button type="submit" text="Back to Login" className="text-white font-['Inter'] justify-center items-center self-stretch max-w-full px-16 py-3 mt-8 text-base font-semibold tracking-normal leading-6 whitespace-nowrap bg-blue-700 rounded-md" />
      </div>
    </div>
  );
}


export default ConfirmEmail;