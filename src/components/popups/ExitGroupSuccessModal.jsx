import * as React from "react";
import { Button, GrayButton } from "../Button";
import { Link } from "react-router-dom";

function ExitGroupSuccessModal () {
  return (
    <div className="flex flex-col justify-center p-12 text-sm bg-white rounded-3xl max-w-[441px]">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6beca7146421b45a931f0c00addbf3dc469677b16315f26632d85bfe435d4eb5?"
        className="self-center w-16 aspect-square"
      />
      <div className="self-center mt-8 text-2xl font-bold leading-8 whitespace-nowrap text-blue-950">
        Left group
      </div>
      <div className="mt-6 leading-5 text-center text-gray-900">
        You have successfully exited the meditation group and can no longer
        interact with group posts.{" "}
      </div>
      <div className="flex gap-5 justify-between px-px mt-8 whitespace-nowrap leading-[143%]">
        <Link>
            <GrayButton type="button" text="Done" className="justify-center px-4 py-3 text-gray-900 bg-gray-100 rounded-md aspect-[1.52]" />  
        </Link>
        <Link>
            <Button type="button" text="Re-join group" className="justify-center px-6 py-3 text-white bg-blue-700 rounded-md" /> 
        </Link>
      </div>
    </div>
  );
}

export default ExitGroupSuccessModal;