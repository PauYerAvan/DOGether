import './Select.sass'

export function Select({className='', type = '', name = '', options = [], placeholder = 'Selecciona una opción', required = false, label }) {
    return <>
        {label && <label htmlFor={name}>{label}</label>}
        
        <select className={className} type={type} name={name} required={required}>
            <option value="">{placeholder}</option>
            {options.map(option => <option key={option} defaultValue={option}>{option}</option>)}
        </select>
    </>
}

