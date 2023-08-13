import { useRouter } from 'next/navigation';

import { font } from 'components/BodyContent';

import * as S from './index.styles';

const LoginRegisterPage = ({ child }) => {
    const router = useRouter();

    const handleToggle = (type: string) => {
        router.push(`/x/${type}`);
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
