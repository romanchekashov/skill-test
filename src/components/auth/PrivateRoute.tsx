import React from 'react';
import {Route} from "react-router-dom";
import {_isUserLogged} from "../../utils/utils";

const PrivateRoute: React.FC<any> = ({...props}) => _isUserLogged() ? <Route {...props} /> : null

export default PrivateRoute;