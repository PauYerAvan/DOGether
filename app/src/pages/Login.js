import { LoginForm, Logo } from '../components'


export const Login = ({ onRegister, onLoggedIn }) => {

    const goToRegister = event => {
        onRegister(event)
    }

    const goToHome = event => {
        onLoggedIn(event)
    }

    return <div className="login">
        <LoginForm onRegister={goToRegister} onLoggedIn={goToHome} />
        </div>

}