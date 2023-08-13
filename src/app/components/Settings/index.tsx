import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TbCameraPlus } from 'react-icons/tb';

import * as S from './index.styles';

const Settings = ({ nick, name, bio, avatar }) => {
    const [userName, setUserName] = useState<string>('');
    const [userBio, setUserBio] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<string>('');
    const [userAvatarFile, setUserAvatarFile] = useState();
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
        console.log(avatar);
        const res = await axios.post(
            'http://localhost:5000/user/edit',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        router.push(`/${nick}`);
    };
    useEffect(() => {
        setUserName(name);
        setUserBio(bio);
        setUserAvatar(avatar);
    }, [name, bio, avatar]);

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    display: 'flex',
                    width: '100vw',
                    height: '100vh',
                    top: '20vh',
                    left: 0,
                    zIndex: '9999',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <S.Background onClick={() => router.push(`/${nick}`)} />
                <S.Wrapper>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '15px',
                        }}
                    >
                        <IoMdClose
                            color="white"
                            size="4%"
                            onClick={() => router.back()}
                        />
                        <div>Edit profile</div>
                        <S.Button onClick={handleSave}>Save</S.Button>
                    </div>
                    <input
                        id="avatar"
                        type="file"
                        hidden
                        onChange={handleImage}
                    />
                    <S.AvatarWrapper src={userAvatar}>
                        <S.IconWrapper htmlFor="avatar">
                            <TbCameraPlus />
                        </S.IconWrapper>
                    </S.AvatarWrapper>

                    <div style={{ width: '100%', display: 'flex' }}>
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
                    </div>
                    <div style={{ width: '100%', display: 'flex' }}>
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
                    </div>
                </S.Wrapper>
            </div>
        </>
    );
};

export default Settings;
