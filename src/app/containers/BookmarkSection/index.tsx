import { useEffect, useState } from 'react';
import * as S from './index.styles';
import { User } from 'components/BodyContent';
import Tweets from 'components/Tweets';

const BookmarkSection = ({ user }) => {
    const [userData, setUserData] = useState<User>();
    const [emptyTweetList, setEmptyTweetList] = useState<boolean>(true);
    const handleEmpty = (data) => {
        setEmptyTweetList(data);
    };

    useEffect(() => {
        setUserData(user);
    }, [user]);
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
                        Don’t let the good ones fly away! Bookmark posts to
                        easily find them again in the future.
                    </div>
                </S.WarningWrapper>
            )}
            <Tweets
                nick={userData?.nick}
                avatar={userData?.avatar}
                profile={null}
                type="bookmarks"
                photoMode={false}
                user={user}
                isEmpty={handleEmpty}
            />
        </S.Wrapper>
    );
};

export default BookmarkSection;
