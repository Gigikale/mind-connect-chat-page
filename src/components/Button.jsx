import { Link } from "react-router-dom"

export function Button({text = '', onClick, isWhite = true, type = ''}) {
    const style = {
        color: isWhite ? "#fff" : "#2e2e2e",
        fontFamily: 'Inter',
        fontSize: !isWhite ? "16px" : null
    }
    return (
        <>
            <button
                type={ type }
                className="text-center text-medium font-sm whitespace-nowrap 
                    justify-center items-center bg-blue-700 max-w-full mt-8 mb-12 px-4 py-3 rounded-md max-md:px-5"
                style={style}
                onClick={onClick}
            >{ text } </button>
        </>
    )
}

export function AuthLinkButton({title = '', path = '', isPurple = false}) {
    return (
        <>
            <Link
                to={path}
                className={`
                    text-black text-center text-lg font-medium whitespace-nowrap
                    justify-center items-center max-w-full mt-20 mb-16 px-16 py-3.5
                    rounded-md border-2 border-solid ${isPurple ? "border-blue-700" : "border-sky-950"}
                    max-md:my-10 max-md:px-5
                `}
                style={{fontFamily: 'Inter'}}
            > { title } </Link>
        </>
    )
}

export function GrayButton({text = '', onClick, isWhite = false, type = ''}) {
    const style = {
        color: isWhite ? "#fff" : "#2e2e2e",
        fontFamily: 'Inter',
        fontSize: !isWhite ? "16px" : null
    }
    return (
        <>
            <button
                type={ type }
                className="text-center text-medium font-sm whitespace-nowrap 
                    justify-center items-center max-w-full bg-gray-100 mt-8 mb-12 px-4 py-3 rounded-md max-md:px-5"
                style={style}
                onClick={onClick}
            >{ text } </button>
        </>
    )
 
}
