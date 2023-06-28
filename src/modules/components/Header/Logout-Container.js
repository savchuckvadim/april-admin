import { connect } from "react-redux"
import { logout } from "../../redux/reducers/auth/auth-reducer.ts"
import Logout from "./Logout"


const LogoutContainer = connect(null, {
    logout: logout
})(Logout)

export default LogoutContainer