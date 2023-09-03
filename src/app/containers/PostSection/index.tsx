import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import * as S from './index.styles';

const PostSection = ({ user, children, type, photo, handleModal }) => {
    const router = useRouter();

    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    return (
        <S.Wrapper>
            {type === 'photo' && (
                <>
                    <S.CloseIcon size="100%" onClick={handleModal} />

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
                    {children}
                </S.Post>
            )}
        </S.Wrapper>
    );
};

export default PostSection;
