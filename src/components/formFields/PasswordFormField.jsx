import { CiLock, CiUnlock } from "react-icons/ci";

function PasswordFormField({title = '', visible = false, placeholder= '', id = 'password', onValueChanged, onToggle, value}) {
    return (
        <>
            <p className="text-sm font-medium leading-5 text-neutral-800 mt-5"
               style={{fontFamily: 'Inter'}}
            > { title } </p>
            <div style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
                <input
                    type={visible ? "text" : "password"}
                    id={ id }
                    value={ value }
                    placeholder={ placeholder }
                    onChange={e => onValueChanged(e.target.value)}
                    style={{ padding: '1rem', width: "100%" }}
                    className="justify-center items-start py-3 pr-16 pl-4 mt-2 text-gray-400 whitespace-nowrap bg-white rounded-md border border-solid border-[color:var(--Gray-400,#BDBDBD)] max-md:pr-5 h-12 w-600"
                />
                <div style={{ marginLeft: '-2rem', cursor: 'pointer' }} onClick={onToggle}>
                    {visible ? <CiUnlock />:<CiLock />  }
                </div>
            </div>
        </>
    )
}

export default PasswordFormField;