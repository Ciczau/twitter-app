import { useContext, useState } from 'react';

import Tweets from 'components/Tweets';
import { UserContext } from 'components/BodyContent';

import * as S from './index.styles';

const BookmarkSection = () => {
    const [emptyTweetList, setEmptyTweetList] = useState<boolean>(true);
    const handleEmpty = (data: boolean) => {
        setEmptyTweetList(data);
    };

    const userData = useContext(UserContext);

    return (
        <S.Wrapper>
            <S.Header>
                <S.Title>Bookmarks</S.Title>
                <S.UserNick>@{userData?.nick} </S.UserNick>
            </S.Header>
            {emptyTweetList && (
                <S.WarningWrapper>
                    <p>Save posts for later</p>
                    <div>
                        Don{`’`}t let the good ones fly away! Bookmark posts to
                        easily find them again in the future.
                    </div>
                </S.WarningWrapper>
            )}
            <Tweets
                avatar={userData?.avatar}
                type="bookmarks"
                photoMode={false}
                isEmpty={handleEmpty}
            />
        </S.Wrapper>
    );
};

export default BookmarkSection;
