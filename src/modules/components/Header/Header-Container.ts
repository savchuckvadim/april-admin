// import React from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/store"
import { UserType } from "../../types/types"
import Header from "./Header"



const mapStateToProps = (state: AppStateType) => {
    return {
        user: state.auth.authUser,
        // theme: state.theme
    }
}

export type HeaderPropsType = {
    user: UserType | null
    // theme: ThemeStateType
}
const HeaderContainer = connect(mapStateToProps, null)(Header)
export default HeaderContainer