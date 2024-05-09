import * as React from "react";


function DescriptionFormField ({
     placeHolder = 'Add note',
     id = 'note',
     onValueChanged = (e) => {}
}) {
    return (
        <textarea
            id= { id }
            className='my-[20px] font-inter flex-col top-9 min-w-full left-0
                resize-none border-[#5A5959] bg-white mt-1 z-10 px-4 py-4'
            style={{ border: "#5a5959 solid 1px", height: "420px", fontSize: "16px", fontWeight: "600"}}
            placeholder= { placeHolder }
              onChange={e => {
                onValueChanged(e.target.value)
            }}
        />
    );
}

export default DescriptionFormField;