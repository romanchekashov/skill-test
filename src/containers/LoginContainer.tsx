import {connect} from "react-redux";
import {RootState} from "../redux/reducers";
import Login from "../components/auth/Login";
import {userLogInSuccess} from "../redux/actions/UserActions";

export const LoginContainer = connect(
    (state: RootState) => ({
        user: state.user,
    }),
    {
        userLogInSuccess
    }
)(Login);