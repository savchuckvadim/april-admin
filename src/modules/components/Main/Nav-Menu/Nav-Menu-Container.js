import { connect } from "react-redux"
import NavMenu from "./Nav-Menu"

const mapStateToProps = (state) => {
    let navMenu = state.navMenu
    return {
        items: navMenu,

    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)
