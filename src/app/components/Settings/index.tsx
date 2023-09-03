import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TbCameraPlus } from 'react-icons/tb';
import { useCookies } from 'react-cookie';

import instance from 'api/instance';

import * as S from './index.styles';

const Settings = ({ nick, name, bio, avatar }) => {
    const [userName, setUserName] = useState<string>('');
    const [userBio, setUserBio] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<string>('');
    const [userAvatarFile, setUserAvatarFile] = useState();
    const [cookie] = useCookies(['refreshToken']);

    const router = useRouter();

    const handleImage = async (e) => {
        setUserAvatarFile(e.target.files[0]);
        setUserAvatar(URL.createObjectURL(e.target.files[0]));
    };
    const handleSave = async () => {
        const formData = new FormData();
        if (userAvatarFile) {
            formData.append('file', userAvatarFile);
        }
        formData.append('name', userName);
        formData.append('nick', nick);
        formData.append('bio', userBio);
        formData.append('refreshToken', cookie.refreshToken);

        await instance({
            url: '/user/edit',
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        router.push(`/${nick}`);
    };
    useEffect(() => {
        setUserName(name);
        setUserBio(bio);
        setUserAvatar(avatar);
    }, [name, bio, avatar]);

    return (
        <S.Wrapper>
            <S.Background onClick={() => router.push(`/${nick}`)} />
            <S.SettingsWrapper>
                <S.Header>
                    <S.CloseIcon onClick={() => router.back()} />
                    <div>Edit profile</div>
                    <S.Button onClick={handleSave}>Save</S.Button>
                </S.Header>
                <input id="avatar" type="file" hidden onChange={handleImage} />
                <S.AvatarWrapper src={userAvatar}>
                    <S.IconWrapper htmlFor="avatar">
                        <TbCameraPlus />
                    </S.IconWrapper>
                </S.AvatarWrapper>

                <S.InputWrapper>
                    <S.Input
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <S.Label
                        htmlFor="name"
                        isEmpty={userName === '' ? true : false}
                    >
                        Name
                    </S.Label>
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.Input
                        id="bio"
                        value={userBio}
                        onChange={(e) => setUserBio(e.target.value)}
                    />
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
