import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";

function SuccessfulModal() {
    return (
        <div className="flex flex-col justify-center items-center p-12 bg-white rounded-3xl leading-[140%] max-w-[479px]">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6beca7146421b45a931f0c00addbf3dc469677b16315f26632d85bfe435d4eb5?"
                className="w-16 aspect-square"
            />
            <h3 className="mt-8 text-2xl font-bold text-blue-950">Successful</h3>
            <p className="mt-6 leading-5 text-center text-gray-900">
                Your password has been changed successfully. Login to access your
                account
            </p>
            <Link>
                <Button text="Continue to Login" type="button" className="text-white text-base font-semibold font-['Inter'] leading-snug tracking-tight justify-center text-center items-center self-stretch max-w-full px-16 py-3 mt-8 text-base font-semibold tracking-normal leading-6 text-white whitespace-nowrap bg-blue-700 rounded-md w-[383px] h-[46px]"/> 
            </Link>
        </div>
    );
}


export default SuccessfulModal;