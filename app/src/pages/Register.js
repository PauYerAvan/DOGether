import './Register.sass'
import { RegisterForm } from '../components'

export const Register = ({onLogin, onRegistered }) => {


    const goToLogin = event => {
        onLogin(event)
        onRegistered(event)
    }

    return <div className="register">
            <RegisterForm onLogin={goToLogin} onRegistered={goToLogin}/>
    </div>

}