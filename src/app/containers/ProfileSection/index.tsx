import { useState, useEffect } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useRouter } from 'next/router';

import Tweets from 'components/Tweets';
import { User } from 'components/BodyContent';

import * as S from './index.styles';

const ProfileSection = ({ user, profile, type, child }) => {
    const router = useRouter();
    const pathname = router.pathname;
    const [choice, setChoice] = useState<number>(
        pathname === '/[profile]'
            ? 0
            : pathname === '/[profile]/replies'
            ? 1
            : 2
    );
    const [userData, setUserData] = useState<User>();

    const handleChoice = (choice: number, url: string) => {
        setChoice(choice);
        router.replace(`/${profile}${url}`);
    };
    useEffect(() => {
        setUserData(user);
    }, [user]);
    return (
        <>
            {child}
            <S.Wrapper>
                <S.Header>
                    <BsArrowLeftShort
                        size="100%"
                        style={{ width: '30px' }}
                        onClick={() => router.push('/home')}
                    />
                    <div style={{ marginLeft: '15px', lineHeight: '22px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            {profile}
                        </div>
                        {user.nick !== '' && (
                            <div style={{ fontSize: '13px', color: 'gray' }}>
                                0 Tweets
                            </div>
                        )}
                    </div>
                </S.Header>
                <S.ProfileHeader />
                <S.AvatarBar>
                    <S.Avatar src={userData?.avatar} />
                    {user.nick !== '' && (
                        <>
                            {userData?.nick === profile ? (
                                <S.SetUpProfileButton
                                    onClick={() =>
                                        router.push('/profile/settings')
                                    }
                                >
                                    Edit profile
                                </S.SetUpProfileButton>
                            ) : (
                                <S.FollowButton>Follow</S.FollowButton>
                            )}
                        </>
                    )}
                </S.AvatarBar>
                <S.Description>
                    <div style={{ lineHeight: '19px', marginBottom: '15px' }}>
                        <div style={{ color: 'white', fontWeight: 'bold' }}>
                            {userData?.name}
                        </div>
                        <div>@{profile}</div>
                    </div>
                    {user.nick !== '' && (
                        <>
                            <div style={{ color: 'white' }}>
                                {userData?.bio}
                            </div>
                            <div>0 Following 1 Follower</div>
                        </>
                    )}
                </S.Description>
                {user.nick !== '' ? (
                    <>
                        <S.NavBar>
                            <S.Button
                                active={choice === 0 ? true : false}
                                onClick={() => handleChoice(0, '/')}
                            >
                                Tweets
                            </S.Button>
                            <S.Button
                                active={choice === 1 ? true : false}
                                onClick={() => handleChoice(1, '/replies')}
                            >
                                Replies
                            </S.Button>
                            <S.Button
                                active={choice === 2 ? true : false}
                                onClick={() => handleChoice(2, '/likes')}
                            >
                                Likes
                            </S.Button>
                        </S.NavBar>
                        <Tweets
                            nick={profile}
                            avatar={user?.avatar}
                            type={type}
                        />
                    </>
                ) : (
                    <S.Warning>This user doesn't exists!</S.Warning>
                )}
            </S.Wrapper>
        </>
    );
};

export default ProfileSection;
