function AuthFormField({title = '', id = '',placeholder = '', onValueChanged, type = 'text'}) {
    return (
        <>
            <p 
                className="text-inter text-left text-sm font-medium self-stretch w-full mt-6 max-md:max-w-full max-md:mt-6"
                style={{fontFamily: 'inter'}}
            > { title } </p>
            <input 
                id={ id }
                type={ type }
                title={ title }
                placeholder={ placeholder }
                style={{ padding: '1rem' }} 
                className="border bg-white-200 flex shrink-0 max-w-full h-[50px] flex-col mt-1 
                rounded-md border-solid border-[color:var(--Gray-400,#BDBDBD)]"
                onChange={e => onValueChanged(e.target.value)}
            />
        </>
    );
}

export default AuthFormField;