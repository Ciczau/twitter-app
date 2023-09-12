import BodyContent from 'components/BodyContent';
import LoginRegisterPage from 'containers/LoginRegisterPage';

const LoginRegister = ({ children }) => {
    return (
        <div>
            <BodyContent auth={true}>
                <LoginRegisterPage>{children}</LoginRegisterPage>
            </BodyContent>
        </div>
    );
};

export default LoginRegister;
