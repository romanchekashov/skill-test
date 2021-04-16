import {connect} from "react-redux";
import {RootState} from "../redux/reducers";
import CurrentTestLoading from "../components/CurrentTest/CurrentTestLoading";
import {RouteComponentProps} from "react-router-dom";
import {loadTestById} from "../redux/actions/CurrentTestActions";

type RouterParams = {
    testId: string
}

export const CurrentTestLoadingContainer = connect(
    (state: RootState, ownProps: RouteComponentProps<RouterParams>) => ({
        testId: parseInt(ownProps.match.params.testId),
        currentTest: state.currentTest,
        user: state.user?.user,
    }),
    {loadTestById}
)(CurrentTestLoading);