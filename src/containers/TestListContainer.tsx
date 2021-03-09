import {connect} from "react-redux";
import TestList from "../components/TestList";
import {RootState} from "../redux/reducers";

export const TestListContainer = connect(
    (state: RootState, sad) => ({
        tests: state.tests,
    }),
    {}
)(TestList);