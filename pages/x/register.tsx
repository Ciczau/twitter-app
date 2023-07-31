import LoginRegisterForm from 'components/LoginRegisterForm';
import type { NextPage } from 'next';
import Home from '.';
const Register = () => {
    return <Home child={<LoginRegisterForm type="register" />} />;
};

export default Register;
