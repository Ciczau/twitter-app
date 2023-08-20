import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { User } from 'components/BodyContent';
import {
    HeaderInfoWrapper,
    HeaderTweetCount,
    HeaderUserName,
    LeftArrowIcon,
} from '../index.styles';
import instance from 'api/instance';

import * as S from './index.styles';

const FollowSection = ({ user }) => {
    const router = useRouter();
    const pathname = router.pathname;
    const [userData, setUserData] = useState<User>();
    const [users, setUsers] = useState<User[]>();
    const [activeTab, setActiveTab] = useState<'followers' | 'following'>(
        pathname === '/[profile]/followers' ? 'followers' : 'following'
    );

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const getUsers = async () => {
        try {
            const res = await instance({
                url: `/follow/${activeTab}`,
                method: 'POST',
                data: { user: userData?.nick },
            });
            if (res.status === 200) {
                const userList = res.data.list;
                const followerList = await instance({
                    url: '/users',
                    method: 'POST',
                    data: { list: userList },
                });
                setUsers(followerList.data.users);
            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getUsers();
    }, [userData]);
    return (
        <S.Wrapper>
            <S.Header>
                <LeftArrowIcon
                    size="100%"
                    onClick={() => router.push('/home')}
                />
                <HeaderInfoWrapper>
                    <HeaderUserName>{userData?.name}</HeaderUserName>
                    {userData?.nick !== '' && (
                        <HeaderTweetCount>@{userData?.nick}</HeaderTweetCount>
                    )}
                </HeaderInfoWrapper>
            </S.Header>
            <S.Menu>
                <S.MenuItem
                    active={activeTab === 'followers' ? true : false}
                    onClick={() => {
                        setActiveTab('followers');
                        router.push(`/${userData?.nick}/followers`);
                    }}
                >
                    Followers
                </S.MenuItem>
                <S.MenuItem
                    active={activeTab === 'following' ? true : false}
                    onClick={() => {
                        setActiveTab('following');
                        router.push(`/${userData?.nick}/following`);
                    }}
                >
                    Following
                </S.MenuItem>
            </S.Menu>
            <S.UsersWrapper>
                {users?.map((user, index) => {
                    return (
                        <S.User key={index}>
                            <S.Avatar
                                src={`https://res.cloudinary.com/df4tupotg/image/upload/${user.avatarId}`}
                            />
                            <S.UserDescription
                                onClick={() => router.push(`/${user.nick}`)}
                            >
                                <S.UserName>{user.name}</S.UserName>
                                <div>@{user.nick}</div>
                                <S.UserBio>{user.bio}</S.UserBio>
                            </S.UserDescription>
                            <S.FollowButton>Follow</S.FollowButton>
                        </S.User>
                    );
                })}
            </S.UsersWrapper>
        </S.Wrapper>
    );
};

export default FollowSection;
