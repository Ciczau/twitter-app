import { useState, useEffect } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useRouter } from 'next/router';
import axios from 'axios';

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
    const [clientData, setClientData] = useState<User>();
    const [userData, setUserData] = useState<User>();
    const [isFollowing, setFollowing] = useState<boolean>(false);

    const handleChoice = (choice: number, url: string) => {
        setChoice(choice);
        router.replace(`/${profile.nick}${url}`);
    };

    const checkIfFollowing = async () => {
        const res = await axios.post('http://localhost:5000/follow/check', {
            follower: clientData?.nick,
            following: userData?.nick,
        });
        console.log(res.data.result);
        setFollowing(res.data.result);
    };

    const followUser = async (type: string) => {
        try {
            const res = await axios.post(
                `http://localhost:5000/follow/${type}`,
                {
                    user: clientData?.nick,
                    userToFollow: userData?.nick,
                }
            );
            if (res.status === 200) {
                setFollowing(!isFollowing);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setUserData(profile);
    }, [profile]);
    useEffect(() => {
        setClientData(user);
    }, [user]);
    useEffect(() => {
        checkIfFollowing();
    }, [userData, clientData]);
    useEffect(() => {
        console.log(isFollowing);
    }, [isFollowing]);
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
                            {userData?.name}
                        </div>
                        {userData?.nick !== '' && (
                            <div style={{ fontSize: '13px', color: 'gray' }}>
                                {userData?.tweets} Tweet
                                {userData?.tweets !== 1 && <>s</>}
                            </div>
                        )}
                    </div>
                </S.Header>
                <S.ProfileHeader />
                <S.AvatarBar>
                    <S.Avatar src={userData?.avatarId} />
                    {userData?.nick !== '' && (
                        <>
                            {userData?.nick === clientData?.nick ? (
                                <S.SetUpProfileButton
                                    onClick={() =>
                                        router.push('/profile/settings')
                                    }
                                >
                                    Edit profile
                                </S.SetUpProfileButton>
                            ) : (
                                <S.FollowButton
                                    isFollowing={isFollowing}
                                    onClick={async () =>
                                        followUser(
                                            isFollowing ? 'delete' : 'add'
                                        )
                                    }
                                >
                                    Follow{isFollowing && <>ing</>}
                                </S.FollowButton>
                            )}
                        </>
                    )}
                </S.AvatarBar>
                <S.Description>
                    <div style={{ lineHeight: '19px', marginBottom: '15px' }}>
                        <div style={{ color: 'white', fontWeight: 'bold' }}>
                            {userData?.name}
                        </div>
                        <div>@{userData?.nick}</div>
                    </div>
                    {userData?.nick !== '' && (
                        <>
                            <div style={{ color: 'white' }}>
                                {userData?.bio}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <S.LinkWrapper
                                    href={`/${userData?.nick}/following`}
                                >
                                    <b style={{ color: 'white' }}>
                                        {userData?.following}
                                    </b>{' '}
                                    Following
                                </S.LinkWrapper>
                                <S.LinkWrapper
                                    href={`/${userData?.nick}/followers`}
                                >
                                    <b style={{ color: 'white' }}>
                                        &nbsp;
                                        {userData?.followers}
                                    </b>{' '}
                                    Follower
                                    {userData?.followers !== 1 && <>s</>}
                                </S.LinkWrapper>
                            </div>
                        </>
                    )}
                </S.Description>
                {userData?.nick !== '' ? (
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
                            nick={userData?.nick}
                            avatar={userData?.avatarId}
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
