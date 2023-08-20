import LoginRegisterForm from 'components/LoginRegisterForm';

import Home from '.';

const Register = () => {
    return <Home child={<LoginRegisterForm type="register" />} />;
};

export default Register;
