import './Icon.sass'

export function Icon({className='', children = ''}) {

    return <>
            <figure className={`icon ${className}`}>{children}</figure>
    </>
}

