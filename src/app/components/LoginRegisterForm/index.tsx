import { useEffect, useState } from 'react';
import * as S from './index.styles';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const LoginRegisterForm = ({ type }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [typeProp, setTypeProp] = useState<string>('');
    const [cookie, setCookie] = useCookies();
    const [success, setSuccess] = useState<boolean>(false);
    const [validEmail, setValidEmail] = useState<boolean>(true);
    const [validPassword, setValidPassword] = useState<boolean>(true);
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

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleRepeatPasswordChange = (e) => {
        setPasswordCheck(e.target.value);
    };

    const handleRegistration = async () => {
        console.log(email);
        setValidEmail(true);
        setValidPassword(true);
        try {
            const res = await axios.post(`http://localhost:5000/user/${type}`, {
                email: email,
                password: password,
                repeatPassword: passwordCheck,
            });
            console.log(res.status);
            if (res.status === 200) {
                if (type === 'login') {
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
            }
        } catch (err) {
            if (err.request.status === 403) {
                setValidPassword(false);
            }
            if (err.request.status === 409) {
                setValidEmail(false);
            }
            if (err.request.status === 401) {
                setValidPassword(false);
            }
            if (err.request.status === 404) {
                setValidEmail(false);
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
    useEffect(() => {
        setTypeProp(type);
        console.log(type);
    }, []);
    useEffect(() => {
        console.log(validPassword);
    }, [validPassword]);

    return (
        <S.Wrapper initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <S.FormWindow>
                <AiOutlineClose
                    color="white"
                    onClick={() => router.push('/x')}
                />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ color: 'white', fontSize: '30px' }}>
                        {HeadText}
                    </div>
                    <S.Input
                        placeholder="Email"
                        onChange={handleEmailChange}
                        valid={validEmail}
                    />
                    <S.Input
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        valid={validPassword}
                    />
                    {type === 'register' && (
                        <S.Input
                            placeholder="Repeat password"
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

                    <div
                        style={{
                            color: 'white',
                            display: 'flex',
                            fontSize: '20px',
                            cursor: 'pointer',
                        }}
                        onClick={handleRedirect}
                    >
                        <div>{BottomText} </div>
                        <div
                            style={{
                                marginLeft: '5px',
                                color: '#128dd4',
                            }}
                        >
                            {ButtonText}
                        </div>
                    </div>
                </div>
            </S.FormWindow>
        </S.Wrapper>
    );
};

export default LoginRegisterForm;
