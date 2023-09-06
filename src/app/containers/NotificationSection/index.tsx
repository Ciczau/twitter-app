import { useEffect, useState } from 'react';

import instance from 'api/instance';
import { User } from 'components/BodyContent';
import { TweetType } from 'components/Tweet';
import Tweets from 'components/Tweets';

import * as S from './index.styles';
import SideBar from 'components/SideBar';

interface Notification {
    nick: string;
    type: string;
    date: string;
    content: TweetType | null;
    user: User | null;
}

const NotificationSection = ({ user }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
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
    const renderNotifications = () => {
        return (
            <>
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

                    return (
                        <S.Notification type={not.type} key={index}>
                            {not.type === 'retweet' ? (
                                <Tweets
                                    nick={not.user?.nick}
                                    type="notificationTweet"
                                    avatar={not.user?.avatar}
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
                                                    src={not.user?.avatar}
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
            </>
        );
    };
    useEffect(() => {
        getNotifications();
    }, [user]);
    return (
        <S.Wrapper>
            <S.Header>
                {width < 767 && <SideBar user={user} />}
                <S.Title>Notifications</S.Title>
            </S.Header>
            <S.NotificationsWrapper>
                {renderNotifications()}
            </S.NotificationsWrapper>
        </S.Wrapper>
    );
};

export default NotificationSection;
