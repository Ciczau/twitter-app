import * as S from './index.styles';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TbCameraPlus } from 'react-icons/tb';
const Settings = ({ email }) => {
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const router = useRouter();
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
                <S.Background onClick={() => router.push(`/${email}`)} />
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
                        <S.Button>Save</S.Button>
                    </div>
                    <input id="avatar" type="file" hidden />
                    <S.AvatarWrapper>
                        <S.IconWrapper htmlFor="avatar">
                            <TbCameraPlus />
                        </S.IconWrapper>
                    </S.AvatarWrapper>

                    <div style={{ width: '100%', display: 'flex' }}>
                        <S.Input
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <S.Label htmlFor="name">Name</S.Label>
                    </div>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <S.Input
                            id="bio"
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <S.Label htmlFor="bio">Bio</S.Label>
                    </div>
                </S.Wrapper>
            </div>
        </>
    );
};

export default Settings;
