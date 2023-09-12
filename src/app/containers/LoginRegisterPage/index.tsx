import { useRouter } from 'next/navigation';

import { font } from 'components/BodyContent';

import * as S from './index.styles';

const LoginRegisterPage = ({ children }) => {
    const router = useRouter();

    const handleToggle = (type: string) => {
        router.push(`/x/${type}`);
    };

    return (
        <div className={font.className}>
            {children}
            <S.Wrapper>
                <div>
                    <h1>LATEST WORLD NEWS</h1>
                    <h2>Join twitter</h2>
                </div>
                <S.ContentWrapper>
                    <S.RegisterButton onClick={() => handleToggle('register')}>
                        CREATE ACCOUNT
                    </S.RegisterButton>
                    <div>
                        <p>Already have an account?</p>
                        <S.LoginButton onClick={() => handleToggle('login')}>
                            LOGIN
                        </S.LoginButton>
                    </div>
                </S.ContentWrapper>
            </S.Wrapper>
        </div>
    );
};

export default LoginRegisterPage;
