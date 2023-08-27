import Tweet, { TweetType } from 'components/Tweet';
import * as S from './index.styles';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/router';

const PostSection = ({ user, child, type, photo, handleModal }) => {
    const router = useRouter();

    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    return (
        <S.Wrapper>
            {type === 'photo' && (
                <>
                    <S.IconWrapper>
                        <S.CloseIcon size="100%" onClick={handleModal} />
                    </S.IconWrapper>
                    <S.PhotoWrapper>
                        <S.Photo src={photo} />
                    </S.PhotoWrapper>
                </>
            )}
            {(width > 767 || type === 'normal') && (
                <S.Post isPhotoMode={type === 'photo' ? true : false}>
                    {type === 'normal' && (
                        <S.Header>
                            <S.LeftArrowIcon
                                size="100%"
                                onClick={() => router.back()}
                            />
                            <S.HeaderText>Tweet</S.HeaderText>
                        </S.Header>
                    )}
                    {child}
                </S.Post>
            )}
        </S.Wrapper>
    );
};

export default PostSection;
