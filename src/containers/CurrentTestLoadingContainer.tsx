import {connect} from "react-redux";
import {RootState} from "../redux/reducers";
import CurrentTest from "../components/CurrentTest";

export const CurrentTestContainer = connect(
    (state: RootState) => ({
        test: state.currentTest,
    }),
    {}
)(CurrentTest);