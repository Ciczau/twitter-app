import LoginRegisterForm from 'components/LoginRegisterForm';

import Home from '.';

const Login = () => {
    return <Home child={<LoginRegisterForm type="login" />} />;
};

export default Login;
