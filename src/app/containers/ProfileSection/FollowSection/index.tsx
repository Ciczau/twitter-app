import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { User } from 'types/user';
import {
    HeaderInfoWrapper,
    HeaderTweetCount,
    HeaderUserName,
    LeftArrowIcon,
} from '../index.styles';
import Users from 'components/Users';

import * as S from './index.styles';

const FollowSection = ({ user }) => {
    const router = useRouter();
    const pathname = router.pathname;

    const [userData, setUserData] = useState<User>();
    const [activeTab, setActiveTab] = useState<'followers' | 'following'>(
        pathname === '/[profile]/followers' ? 'followers' : 'following'
    );

    useEffect(() => {
        setUserData(user);
    }, [user]);

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
            <Users user={userData} activeTab={activeTab} type="followers" />
        </S.Wrapper>
    );
};

export default FollowSection;
