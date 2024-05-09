import * as React from "react";
import Assets from "../../../commons/Assets";


const RealTimeChatDefaultView = () => (
        <div className="flex overflow-hidden relative flex-col justify-end items-center px-16 pt-12 pb-4 w-full min-h-[640px] 
        max-md:px-5 max-md:max-w-full">
        <img
                  loading="lazy"
                  srcSet={Assets.hands}
                  className="object-cover absolute inset-0 size-full"   
        />
        </div>             
);
export default RealTimeChatDefaultView;