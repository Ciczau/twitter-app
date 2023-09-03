import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import instance from 'api/instance';

import * as S from './index.styles';

const LoginRegisterForm = ({ type }) => {
    const [email, setEmail] = useState<string>('');
    const [nick, setNick] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [_, setCookie] = useCookies();
    const [success, setSuccess] = useState<boolean>(false);
    const [validEmail, setValidEmail] = useState<boolean>(true);
    const [validPassword, setValidPassword] = useState<boolean>(true);
    const [validNick, setValidNick] = useState<boolean>(true);

    const router = useRouter();

    const HeadText = type === 'login' ? 'Login on twitter' : 'Join twitter';
    const BottomText =
        type === 'login'
            ? 'Want to create an account?'
            : 'Already have an account?';
    const ButtonText = type === 'login' ? 'Register' : 'Login';

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleNickChange = (e) => {
        setNick(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleRepeatPasswordChange = (e) => {
        setPasswordCheck(e.target.value);
    };

    const handleRegistration = async () => {
        setValidEmail(true);
        setValidPassword(true);
        try {
            const res = await instance({
                url: `/user/${type}`,
                method: 'POST',
                data: {
                    email: email,
                    nick: nick,
                    password: password,
                    repeatPassword: passwordCheck,
                },
            });
            if (res.status === 200) {
                const expire = new Date();
                expire.setTime(expire.getTime() + 60 * 60 * 24 * 1000);
                setCookie('refreshToken', res.data.refreshToken, {
                    path: '/',
                    expires: expire,
                });
                setSuccess(true);
                setTimeout(() => {
                    router.push('/home');
                }, 700);
            }
        } catch (err) {
            if (err.request.status === 403) {
                setValidPassword(false);
            }
            if (err.request.status === 409) {
                if (err.response.data.mail) {
                    setValidEmail(false);
                }
                if (err.response.data.nick) {
                    setValidNick(false);
                }
            }
            if (err.request.status === 401) {
                setValidPassword(false);
            }
            if (err.request.status === 404) {
                setValidEmail(false);
            }
            if (err.request.status === 408) {
                setValidNick(false);
            }
        }
    };

    const handleRedirect = () => {
        if (type === 'login') {
            router.push('/x/register');
        } else {
            router.push('/x/login');
        }
    };

    return (
        <S.Wrapper initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <S.FormWindow>
                <S.CloseIcon onClick={() => router.push('/x')} />
                <S.FormWrapper>
                    <p>{HeadText}</p>
                    {type === 'register' && (
                        <S.Input
                            placeholder="Email"
                            onChange={handleEmailChange}
                            valid={validEmail}
                        />
                    )}
                    <S.Input
                        placeholder="Nick"
                        onChange={handleNickChange}
                        valid={validNick}
                    />
                    <S.Input
                        placeholder="Password"
                        type="password"
                        onChange={handlePasswordChange}
                        valid={validPassword}
                    />
                    {type === 'register' && (
                        <S.Input
                            placeholder="Repeat password"
                            type="password"
                            onChange={handleRepeatPasswordChange}
                            valid={validPassword}
                        />
                    )}
                    <S.SubmitButton
                        onClick={handleRegistration}
                        success={success}
                    >
                        {success ? (
                            <>
                                {type === 'login' ? (
                                    <div>Logged in!</div>
                                ) : (
                                    <div>Registered!</div>
                                )}
                            </>
                        ) : (
                            <>{type.toUpperCase()}</>
                        )}
                    </S.SubmitButton>

                    <S.BottomTextWrapper onClick={handleRedirect}>
                        <div>{BottomText} </div>
                        <button>{ButtonText}</button>
                    </S.BottomTextWrapper>
                </S.FormWrapper>
            </S.FormWindow>
        </S.Wrapper>
    );
};

export default LoginRegisterForm;
