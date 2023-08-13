import { useEffect, useState } from 'react';

import Tweets from 'components/Tweets';
import { User } from 'components/BodyContent';

import * as S from './index.styles';

const HomeSection = ({ user }) => {
    const [choice, setChoice] = useState<number>(0);
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        setUserData(user);
    }, [user]);
    return (
        <S.Wrapper>
            <S.Head>Home</S.Head>
            <S.SelectionWrapper>
                <S.Button
                    onClick={() => setChoice(0)}
                    active={choice === 0 ? true : false}
                >
                    For you
                </S.Button>
                <S.Button
                    onClick={() => setChoice(1)}
                    active={choice === 1 ? true : false}
                >
                    Following
                </S.Button>
            </S.SelectionWrapper>
            <Tweets nick={user?.nick} avatar={user?.avatar} type="home" />
        </S.Wrapper>
    );
};

export default HomeSection;
