import { Navigate } from "react-router-dom"


const LoginRedirect = () => {

    return (
        <Navigate replace to='../contacts'/>
    )
}

export default LoginRedirect