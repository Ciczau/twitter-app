import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import Tweets from 'components/Tweets';
import { User } from 'types/user';
import instance from 'api/instance';
import { UserContext } from 'components/BodyContent';

import * as S from './index.styles';
import { CheckIfFollowingRequest, HandleFollowRequest } from 'api/users';

export default function ProfileSection({
    profile,
    type,
    profileQuery = '',
    children,
}) {
    const router = useRouter();
    const pathname = router.pathname;
    const [activeTab, setActiveTab] = useState<'tweets' | 'replies' | 'likes'>(
        pathname === '/[profile]'
            ? 'tweets'
            : pathname === '/[profile]/replies'
            ? 'replies'
            : 'likes'
    );
    const clientData = useContext(UserContext);
    const [userData, setUserData] = useState<User>({} as User);
    const [isFollowing, setFollowing] = useState<boolean>(false);

    const handleChoice = (
        activeTab: 'tweets' | 'replies' | 'likes',
        url: string
    ) => {
        setActiveTab(activeTab);
        router.replace(`/${profile.nick}/${url}`);
    };

    const checkIfFollowing = async () => {
        const check = await CheckIfFollowingRequest(
            clientData.nick,
            userData?.nick
        );
        setFollowing(check);
    };

    const handleFollow = async () => {
        const type = isFollowing ? 'delete' : 'add';
        try {
            await HandleFollowRequest(clientData.nick, userData.nick, type);
            setFollowing(!isFollowing);
        } catch (err) {}
    };

    useEffect(() => {
        setUserData(profile);
        checkIfFollowing();
    }, [profile, userData, clientData, profileQuery]);

    return (
        <>
            {children}
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
                            <S.Avatar src={userData?.avatar} />
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
                            profile={userData?.nick}
                            avatar={userData?.avatar}
                            type={type}
                            photoMode={false}
                            profileQuery={profileQuery}
                        />
                    </>
                ) : (
                    <>
                        <S.LeftArrowIcon
                            size="100%"
                            onClick={() => router.back()}
                        />
                        <S.Warning>This user doesn{"'"}t exists!</S.Warning>{' '}
                    </>
                )}
            </S.Wrapper>
        </>
    );
}
