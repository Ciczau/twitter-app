import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TbCameraPlus } from 'react-icons/tb';
import { useCookies } from 'react-cookie';

import instance from 'api/instance';
import { useForm } from 'react-hook-form';
import { UserContext } from 'components/BodyContent';

import * as S from './index.styles';
import { EditProfileRequest } from 'api/users';

const Settings = () => {
    const [userAvatarFile, setUserAvatarFile] = useState<File>();
    const [userAvatar, setUserAvatar] = useState<string>('');
    const [cookie] = useCookies(['refreshToken']);

    const user = useContext(UserContext);
    console.log(user);
    const { register, handleSubmit, watch } = useForm();

    const userName = watch('name', user.name);
    const userBio = watch('bio', user.bio);
    console.log(user.name);
    const router = useRouter();

    const handleImage = async (e) => {
        setUserAvatarFile(e.target.files[0]);
        setUserAvatar(URL.createObjectURL(e.target.files[0]));
    };
    const handleSave = async (data) => {
        const formData = new FormData();
        if (userAvatarFile) {
            formData.append('file', userAvatarFile);
        }
        formData.append('name', data.name);
        formData.append('nick', user.nick);
        formData.append('bio', data.bio);
        formData.append('refreshToken', cookie.refreshToken);

        await EditProfileRequest(formData);
        router.push(`/${user?.nick}`);
    };
    useEffect(() => {
        setUserAvatar(user.avatar);
    }, [user]);

    return (
        <S.Wrapper>
            <S.Background onClick={() => router.push(`/${user.nick}`)} />
            <S.SettingsWrapper onSubmit={handleSubmit(handleSave)}>
                <S.Header>
                    <S.CloseIcon onClick={() => router.back()} />
                    <div>Edit profile</div>
                    <S.Button type="submit" value="Save" />
                </S.Header>
                <input
                    id="avatar"
                    type="file"
                    hidden
                    {...(register('avatar'),
                    {
                        onChange: (e) => handleImage(e),
                    })}
                />
                <S.AvatarWrapper src={userAvatar}>
                    <S.IconWrapper htmlFor="avatar">
                        <TbCameraPlus />
                    </S.IconWrapper>
                </S.AvatarWrapper>

                <S.InputWrapper>
                    <S.Input id="name" value={userName} {...register('name')} />
                    <S.Label
                        htmlFor="name"
                        isEmpty={userName === '' ? true : false}
                    >
                        Name
                    </S.Label>
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.Input id="bio" value={userBio} {...register('bio')} />
                    <S.Label
                        htmlFor="bio"
                        isEmpty={userBio === '' ? true : false}
                    >
                        Bio
                    </S.Label>
                </S.InputWrapper>
            </S.SettingsWrapper>
        </S.Wrapper>
    );
};

export default Settings;
