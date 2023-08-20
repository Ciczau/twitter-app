import Tweet, { TweetType } from 'components/Tweet';
import * as S from './index.styles';
import { useEffect, useState } from 'react';

const PostSection = ({ user, child }) => {
    return <S.Wrapper>{child}</S.Wrapper>;
};

export default PostSection;
