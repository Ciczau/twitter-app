import { useState } from 'react';
import * as S from './index.styles';
import LoginRegisterForm from 'components/LoginRegisterForm';
import { useRouter } from 'next/navigation';
import { font } from 'components/BodyContent';

const LoginRegisterPage = ({ child }) => {
    const [toggleForm, setToggleForm] = useState<boolean>(false);
    const [type, setType] = useState<string>('');

    const router = useRouter();
    const handleToggle = (type: string) => {
        setToggleForm(true);
        setType(type);
        router.push(`/x/${type}`);
    };

    const listenClose = () => {
        setToggleForm(false);
    };
    return (
        <div className={font.className}>
            {child}
            <S.Wrapper>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '60px' }}>LATEST WORLD NEWS</div>
                    <div style={{ fontSize: '35px' }}>Join twitter</div>
                </div>
                <S.ContentWrapper>
                    <S.RegisterButton onClick={() => handleToggle('register')}>
                        CREATE ACCOUNT
                    </S.RegisterButton>
                    <p>Already have an account?</p>
                    <S.LoginButton onClick={() => handleToggle('login')}>
                        LOGIN
                    </S.LoginButton>
                </S.ContentWrapper>
            </S.Wrapper>
        </div>
    );
};

export default LoginRegisterPage;
