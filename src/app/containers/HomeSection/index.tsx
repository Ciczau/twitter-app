import { useEffect, useState } from 'react';

import Tweets from 'components/Tweets';
import { User } from 'components/BodyContent';

import * as S from './index.styles';
import SideBar from 'components/SideBar';

const HomeSection = ({ user }) => {
    const [activeTab, setActiveTab] = useState<'popular' | 'following'>(
        'popular'
    );
    const [userData, setUserData] = useState<User>();
    const [width, setWidth] = useState<number>(window.innerWidth);
    useEffect(() => {
        const handleWidth = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWidth);
        return () => {
            window.removeEventListener('resize', handleWidth);
        };
    }, []);
    useEffect(() => {
        setUserData(user);
    }, [user]);
    return (
        <S.Wrapper>
            {width < 768 ? (
                <S.Head>
                    <S.TwitterIconWrapper>
                        <S.TwitterIcon size="100%" />
                    </S.TwitterIconWrapper>
                    <SideBar user={userData} />
                </S.Head>
            ) : (
                <S.Head>Home</S.Head>
            )}
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
                avatar={userData?.avatar}
                type="home"
                activeTab={activeTab}
                photoMode={false}
                user={user}
            />
        </S.Wrapper>
    );
};

export default HomeSection;
