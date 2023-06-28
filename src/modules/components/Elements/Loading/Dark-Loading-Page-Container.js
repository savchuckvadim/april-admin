import { connect } from "react-redux"
import LoadingPage from "./Loading-Page"


const mapStateToProps = (state) => {
    let theme = state.theme
    let style = {
        backgroundColor: theme.black,
        logo: theme.logo,
        
    }
    return {
        style: style,
        type: 'dark'
    }
}

export const DarkLoadingPageContainer = connect(mapStateToProps)(LoadingPage)