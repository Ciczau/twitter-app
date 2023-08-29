import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Tweets from 'components/Tweets';
import { User } from 'components/BodyContent';
import instance from 'api/instance';

import * as S from './index.styles';

const ProfileSection = ({ user, profile, type, child, profileQuery = '' }) => {
    const router = useRouter();
    const pathname = router.pathname;
    const [activeTab, setActiveTab] = useState<'tweets' | 'replies' | 'likes'>(
        pathname === '/[profile]'
            ? 'tweets'
            : pathname === '/[profile]/replies'
            ? 'replies'
            : 'likes'
    );
    const [clientData, setClientData] = useState<User>();
    const [userData, setUserData] = useState<User>();
    const [isFollowing, setFollowing] = useState<boolean>(false);

    const handleChoice = (
        activeTab: 'tweets' | 'replies' | 'likes',
        url: string
    ) => {
        setActiveTab(activeTab);
        router.replace(`/${profile.nick}/${url}`);
    };

    const checkIfFollowing = async () => {
        const res = await instance({
            url: '/follow/check',
            method: 'POST',
            data: { follower: clientData?.nick, following: userData?.nick },
        });
        setFollowing(res.data.result);
    };

    const handleFollow = async () => {
        const type = isFollowing ? 'delete' : 'add';
        try {
            const res = await instance({
                url: `/follow/${type}`,
                method: 'POST',
                data: { user: clientData?.nick, userToFollow: userData?.nick },
            });
            if (res.status === 200) {
                setFollowing(!isFollowing);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setUserData(profile);
        setClientData(user);
        checkIfFollowing();
        console.log(profileQuery);
    }, [profile, user, userData, clientData, profileQuery]);

    return (
        <>
            {child}
            <S.Wrapper>
                {userData ? (
                    <>
                        <S.Header>
                            <S.LeftArrowIcon
                                size="100%"
                                onClick={() => router.back()}
                            />
                            <S.HeaderInfoWrapper>
                                <S.HeaderUserName>
                                    {userData?.name}
                                </S.HeaderUserName>
                                {userData?.nick !== '' && (
                                    <S.HeaderTweetCount>
                                        {userData?.tweets} Tweet
                                        {userData?.tweets !== 1 && <>s</>}
                                    </S.HeaderTweetCount>
                                )}
                            </S.HeaderInfoWrapper>
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
                                            onClick={handleFollow}
                                        >
                                            Follow{isFollowing && <>ing</>}
                                        </S.FollowButton>
                                    )}
                                </>
                            )}
                        </S.AvatarBar>
                        <S.Description>
                            <S.NameWrapper>
                                <S.UserName>{userData?.name}</S.UserName>
                                <div>@{userData?.nick}</div>
                            </S.NameWrapper>
                            {userData?.nick !== '' && (
                                <>
                                    <S.UserBio>{userData?.bio}</S.UserBio>
                                    <div>
                                        <S.LinkWrapper
                                            href={`/${userData?.nick}/following`}
                                        >
                                            <b>{userData?.following}</b>{' '}
                                            Following
                                        </S.LinkWrapper>
                                        <S.LinkWrapper
                                            href={`/${userData?.nick}/followers`}
                                        >
                                            <b>
                                                &nbsp;
                                                {userData?.followers}
                                            </b>{' '}
                                            Follower
                                            {userData?.followers !== 1 && (
                                                <>s</>
                                            )}
                                        </S.LinkWrapper>
                                    </div>
                                </>
                            )}
                        </S.Description>

                        <S.NavBar>
                            <S.Button
                                active={activeTab === 'tweets' ? true : false}
                                onClick={() => handleChoice('tweets', '/')}
                            >
                                Tweets
                            </S.Button>
                            <S.Button
                                active={activeTab === 'replies' ? true : false}
                                onClick={() =>
                                    handleChoice('replies', '/replies')
                                }
                            >
                                Replies
                            </S.Button>
                            <S.Button
                                active={activeTab === 'likes' ? true : false}
                                onClick={() => handleChoice('likes', '/likes')}
                            >
                                Likes
                            </S.Button>
                        </S.NavBar>
                        <Tweets
                            nick={clientData?.nick}
                            profile={userData?.nick}
                            avatar={userData?.avatarId}
                            type={type}
                            tweet={null}
                            photoMode={false}
                            user={user}
                            profileQuery={profileQuery}
                        />
                    </>
                ) : (
                    <>
                        <S.LeftArrowIcon
                            size="100%"
                            onClick={() => router.back()}
                        />
                        <S.Warning>This user doesn't exists!</S.Warning>{' '}
                    </>
                )}
            </S.Wrapper>
        </>
    );
};

export default ProfileSection;
