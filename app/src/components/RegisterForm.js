import './RegisterForm.sass'
import { registerUser } from '../logic'
import { Input, Button, Link} from '.'

export function RegisterForm({ onLogin, onRegistered }) {
    
    const register = async event => {

        try {
            const { target: { name: { value: name }, email: { value: email }, password: { value: password } } } = event

            await registerUser(name, email, password)
            onRegistered()

        } catch (error) {
            alert(error.message)
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        register(event)
    }

    const goToLogin = event => {
        event.preventDefault()
        onLogin(event)
    }

    return <div>
        <form className="register-form" onSubmit={onSubmit}>
            <h1 className="register-form__name">DOGether</h1> 
            <Input className="input" type="text" name="name" placeholder="Nombre" required={true} />
            <Input className="input" type="email" name="email" placeholder="email" required={true}/>
            <Input className="input" type="password" name="password" placeholder="contraseña" required={true} />
            <Button className="button" type="submit">Registrarse</Button>
            <Link className="link" href="" onClick={goToLogin}>Iniciar sesión</Link>
        </form>
    </div>
}

