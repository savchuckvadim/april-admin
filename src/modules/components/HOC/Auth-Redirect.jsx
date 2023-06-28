import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { getAuthApp } from "../../redux/reducers/auth/auth-reducer.ts"
import AdminApp from "../Admin-App/AdminApp.jsx"
import StartPage from "../Start/Start-Page"

const mapStateToPropsRedirect = (state) => {

    return{
        isAuth: state.auth.isAuth
    }
}


 const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component{
       
        render(){
            if (!this.props.isAuth) return <Navigate replace to='/start' />
            return <Component {...this.props} />
        }
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}

export default withAuthRedirect