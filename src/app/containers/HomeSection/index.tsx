import { useEffect, useState, useContext } from 'react';

import Tweets from 'components/Tweets';
import SideBar from 'components/SideBar';
import { UserContext } from 'components/BodyContent';

import * as S from './index.styles';

const HomeSection = () => {
    const [activeTab, setActiveTab] = useState<'popular' | 'following'>(
        'popular'
    );
    const [width, setWidth] = useState<number>(window.innerWidth);

    const userData = useContext(UserContext);

    useEffect(() => {
        const handleWidth = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWidth);
        return () => {
            window.removeEventListener('resize', handleWidth);
        };
    }, []);
    return (
        <S.Wrapper>
            {width < 768 ? (
                <S.Head>
                    <S.TwitterIconWrapper>
                        <S.TwitterIcon size="100%" />
                    </S.TwitterIconWrapper>
                    <SideBar />
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
                avatar={userData?.avatar}
                type="home"
                activeTab={activeTab}
                photoMode={false}
            />
        </S.Wrapper>
    );
};

export default HomeSection;
