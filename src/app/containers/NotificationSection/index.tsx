import { useContext, useEffect, useState } from 'react';

import { User } from 'types/user';
import { TweetType } from 'types/tweets';
import Tweets from 'components/Tweets';
import SideBar from 'components/SideBar';
import { UserContext } from 'components/BodyContent';
import { GetNotificationsRequest } from 'api/notifications';
import { useRouter } from 'next/router';

import * as S from './index.styles';

interface Notification {
    nick: string;
    type: string;
    date: string;
    content: TweetType | null;
    user: User | null;
}

const NotificationSection = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [width, setWidth] = useState<number>(window.innerWidth);

    const router = useRouter();
    const user = useContext(UserContext);

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
            const nots = await GetNotificationsRequest(user.nick);
            setNotifications(nots);
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
                            {not.type === 'retweet' && not.user ? (
                                <Tweets
                                    type="notificationTweet"
                                    avatar={not.user?.avatar}
                                    tweet={not.content}
                                    photoMode={true}
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
                                                    <b
                                                        onClick={() =>
                                                            router.push(
                                                                `/${not.user?.nick}`
                                                            )
                                                        }
                                                    >
                                                        {not.user?.nick}
                                                    </b>{' '}
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
                {width < 767 && <SideBar />}
                <S.Title>Notifications</S.Title>
            </S.Header>
            <S.NotificationsWrapper>
                {renderNotifications()}
            </S.NotificationsWrapper>
        </S.Wrapper>
    );
};

export default NotificationSection;
