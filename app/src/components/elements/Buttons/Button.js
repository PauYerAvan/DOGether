import './Button.sass'

export function Button({type="button", children="Enviar", onClick, className=''}) {


    return <>
        <button onClick={onClick} className={className} type={type}>{children}</button>
    </>
}

