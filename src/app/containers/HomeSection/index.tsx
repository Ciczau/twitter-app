import { useEffect, useState } from 'react';

import Tweets from 'components/Tweets';
import { User } from 'components/BodyContent';

import * as S from './index.styles';

const HomeSection = ({ user }) => {
    const [activeTab, setActiveTab] = useState<'popular' | 'following'>(
        'popular'
    );
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        setUserData(user);
    }, [user]);
    return (
        <S.Wrapper>
            <S.Head>Home</S.Head>
            <S.SelectionWrapper>
                <S.Button
                    onClick={() => setActiveTab('popular')}
                    active={activeTab === 'popular' ? true : false}
                >
                    For you
                </S.Button>
                <S.Button
                    onClick={() => setActiveTab('following')}
                    active={activeTab === 'following' ? true : false}
                >
                    Following
                </S.Button>
            </S.SelectionWrapper>
            <Tweets
                nick={userData?.nick}
                avatar={userData?.avatarId}
                profile={null}
                type="home"
                tweet={null}
                photoMode={false}
                user={user}
            />
        </S.Wrapper>
    );
};

export default HomeSection;
