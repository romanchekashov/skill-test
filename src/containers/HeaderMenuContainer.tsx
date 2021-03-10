import {connect} from "react-redux";
import {RootState} from "../redux/reducers";
import HeaderMenu from "../components/HeaderMenu";
import {userLogOut} from "../redux/actions/UserActions";

export const HeaderMenuContainer = connect(
    (state: RootState) => ({
        user: state.user?.user,
    }),
    {
        userLogOut
    }
)(HeaderMenu);