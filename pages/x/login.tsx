import LoginRegisterForm from 'components/LoginRegisterForm';
import type { NextPage } from 'next';
import Home from '.';
const Login = () => {
    return <Home child={<LoginRegisterForm type="login" />} />;
};

export default Login;
