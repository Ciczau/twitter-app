import { useEffect, useState } from 'react';
import * as S from './index.styles';
import instance from 'api/instance';
import { User } from 'components/BodyContent';
import Tweet, { TweetType } from 'components/Tweet';
import { RepostIcon } from 'components/Tweet/index.styles';
import Tweets from 'components/Tweets';

interface Notification {
    nick: string;
    type: string;
    date: string;
    content: TweetType | null;
    user: User | null;
}

const NotificationSection = ({ user }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const getNotifications = async () => {
        try {
            const res = await instance({
                url: '/notifications/get',
                method: 'POST',
                data: { nick: user.nick },
            });
            setNotifications(res.data.nots);
        } catch (err) {}
    };

    useEffect(() => {
        getNotifications();
    }, [user]);
    return (
        <S.Wrapper>
            <S.Header>
                <S.Title>Notifications</S.Title>
            </S.Header>
            <S.NotificationsWrapper>
                {notifications?.map((not, index) => {
                    const date = new Date(not.date);
                    const monthNames = [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                    ];
                    const month = monthNames[date.getUTCMonth()];
                    const day = date.getUTCDate();
                    const year = date.getUTCFullYear();
                    console.log(not);
                    return (
                        <S.Notification type={not.type}>
                            {not.type === 'retweet' ? (
                                <Tweets
                                    nick={not.user?.nick}
                                    profile={null}
                                    type="notificationTweet"
                                    avatar={not.user?.avatarId}
                                    tweet={not.content}
                                    photoMode={true}
                                    user={user}
                                />
                            ) : (
                                <>
                                    <S.NotificationIconWrapper>
                                        {not.type === 'login' && (
                                            <S.LoginIcon size="100%" />
                                        )}
                                        {not.type === 'like' && (
                                            <S.LikeIcon size="100%" />
                                        )}
                                        {not.type === 'repost' && (
                                            <S.RepostIcon size="100%" />
                                        )}
                                        {not.type === 'follow' && (
                                            <S.UserIcon size="100%" />
                                        )}
                                    </S.NotificationIconWrapper>
                                    <S.NotificationContent>
                                        {not.type === 'login' && (
                                            <div>
                                                There was a login to your
                                                account @{not.nick} from a new
                                                device on {day} {month} {year}.
                                                Review it now.
                                            </div>
                                        )}
                                        {(not.type === 'like' ||
                                            not.type === 'repost' ||
                                            not.type === 'follow') && (
                                            <>
                                                <S.Avatar
                                                    src={`https://res.cloudinary.com/df4tupotg/image/upload/${not.user?.avatarId}`}
                                                />
                                                <div>
                                                    <b>{not.user?.nick}</b>{' '}
                                                    {not.type === 'like' &&
                                                        'liked'}
                                                    {not.type === 'repost' &&
                                                        'reposted'}
                                                    {not.type === 'follow' &&
                                                        'followed'}{' '}
                                                    {not.type === 'follow' &&
                                                        'you'}{' '}
                                                    {(not.type === 'like' ||
                                                        not.type ===
                                                            'repost') &&
                                                        'your tweet'}
                                                </div>
                                                <div>{not.content?.text}</div>
                                            </>
                                        )}
                                    </S.NotificationContent>
                                </>
                            )}
                        </S.Notification>
                    );
                })}
            </S.NotificationsWrapper>
        </S.Wrapper>
    );
};

export default NotificationSection;
