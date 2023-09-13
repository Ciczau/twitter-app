import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import { useForm } from 'react-hook-form';
import Loader from 'components/Loader';
import { LoginRegisterRequest } from 'api/users';

import * as S from './index.styles';

const LoginRegisterForm = ({ type }) => {
    const [_, setCookie] = useCookies();
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<{
        errorCode: number;
        message: string;
    }>();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        formState,
        watch,
    } = useForm();

    const password = watch('password', '');
    const repassword = watch('repassword', '');
    const router = useRouter();

    const HeadText = type === 'login' ? 'Login on twitter' : 'Join twitter';
    const BottomText =
        type === 'login'
            ? 'Want to create an account?'
            : 'Already have an account?';
    const ButtonText = type === 'login' ? 'Register' : 'Login';

    const handleFormSubmit = async (data) => {
        try {
            const res = await LoginRegisterRequest(type, data);
            if (res.status === 200) {
                const expire = new Date();
                expire.setTime(expire.getTime() + 60 * 60 * 24 * 1000 * 365);
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
            setError(err.response.data);
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
                {success ? (
                    <Loader />
                ) : (
                    <>
                        <S.CloseIcon onClick={() => router.push('/x')} />
                        <S.FormWrapper
                            onSubmit={handleSubmit(handleFormSubmit)}
                        >
                            <p>{HeadText}</p>
                            <S.FormLabel>
                                {type === 'register' && (
                                    <>
                                        <S.Input
                                            placeholder="Email"
                                            {...register('email', {
                                                required: 'Required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Wrong email',
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: 'Wrong email',
                                                },
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Wrong email',
                                                },
                                                onChange: () =>
                                                    setError({
                                                        errorCode: 0,
                                                        message: '',
                                                    }),
                                            })}
                                            valid={
                                                error?.errorCode !== 2 &&
                                                !errors.email
                                            }
                                        />
                                        {errors.email ? (
                                            <div>
                                                {(errors.email as any).message}
                                            </div>
                                        ) : (
                                            <>
                                                {error?.errorCode === 2 && (
                                                    <div>{error.message}</div>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </S.FormLabel>
                            <S.FormLabel>
                                <S.Input
                                    placeholder="Nick"
                                    {...register('nick', {
                                        required: 'Required',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'Your nickname should be at least 6 characters long',
                                        },
                                        maxLength: {
                                            value: 20,
                                            message:
                                                'Your nickname should be maximum 30 characters long',
                                        },
                                        onChange: () =>
                                            setError({
                                                errorCode: 0,
                                                message: '',
                                            }),
                                    })}
                                    valid={
                                        error?.errorCode !== 3 &&
                                        (type === 'login' || !errors.nick)
                                    }
                                />
                                {errors.nick ? (
                                    <div>{(errors.nick as any).message}</div>
                                ) : (
                                    <>
                                        {(error?.errorCode === 4 ||
                                            error?.errorCode === 3) && (
                                            <div>{error.message}</div>
                                        )}
                                    </>
                                )}
                            </S.FormLabel>
                            <S.FormLabel>
                                <S.Input
                                    placeholder="Password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Required',
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Your password should be at least 8 characters long',
                                        },
                                        maxLength: {
                                            value: 30,
                                            message:
                                                'Your password should be maximum 30 characters long',
                                        },
                                        onChange: () =>
                                            setError({
                                                errorCode: 0,
                                                message: '',
                                            }),
                                    })}
                                    valid={
                                        type === 'login' ||
                                        !errors.password ||
                                        (password !== '' &&
                                            password === repassword)
                                    }
                                />
                                {errors.password ? (
                                    <div>
                                        {(errors.password as any).message}
                                    </div>
                                ) : (
                                    <>
                                        {error?.errorCode === 5 && (
                                            <div>{error.message}</div>
                                        )}
                                    </>
                                )}
                            </S.FormLabel>
                            <S.FormLabel>
                                {type === 'register' && (
                                    <>
                                        <S.Input
                                            placeholder="Repeat password"
                                            type="password"
                                            {...register('repassword', {
                                                required: 'Required',
                                                minLength: 8,
                                                maxLength: 30,
                                            })}
                                            valid={
                                                !errors.repassword ||
                                                password === repassword
                                            }
                                        />
                                        {isSubmitted &&
                                            (password !== repassword ||
                                                error?.errorCode === 1) && (
                                                <div>
                                                    Passwords don&quot;t match
                                                </div>
                                            )}
                                    </>
                                )}
                            </S.FormLabel>
                            <S.SubmitButton
                                type="submit"
                                value={type.toUpperCase()}
                            />
                        </S.FormWrapper>
                    </>
                )}
                <S.BottomTextWrapper onClick={handleRedirect} success={success}>
                    <div>{BottomText} </div>
                    <button>{ButtonText}</button>
                </S.BottomTextWrapper>
            </S.FormWindow>
        </S.Wrapper>
    );
};

export default LoginRegisterForm;
