import './Input.sass'


export function Input({ className='', type='text', name= '', placeholder = 'Escribe aquí', required = false, defaultValue = null, label, disabled }) {

    return <div >
        {label && <label htmlFor={name}>{label}</label>}
        <input className={className} type={type} name={name} placeholder={placeholder} required={required} defaultValue={defaultValue} disabled={disabled}/>
    </div>

}


