import React from 'react';
import { withRouter } from "react-router-dom";

import SignInForm from './SignInForm';
import Wrapper from './Wrapper';

const Login = props => {

    return (
        <Wrapper>
            <SignInForm {...props} />
        </Wrapper>
    )
}

export default withRouter(Login);
