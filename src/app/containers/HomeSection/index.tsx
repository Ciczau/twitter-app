import { useState } from 'react';
import * as S from './index.styles';

const HomeSection = () => {
    const [choice, setChoice] = useState<number>(0);
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
        </S.Wrapper>
    );
};

export default HomeSection;
