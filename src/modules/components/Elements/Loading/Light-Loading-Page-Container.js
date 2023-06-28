import { connect } from "react-redux"
import LoadingPage from "./Loading-Page"


const mapStateToProps = (state) => {
    // let theme = state.theme
    let style = {
        // backgroundColor: theme.beige,
        // logo: theme.greyLogo
    }
    return {
        style: style,
        isComponent: false

    }
}

export const LightLoadingPageContainer = connect(mapStateToProps)(LoadingPage)