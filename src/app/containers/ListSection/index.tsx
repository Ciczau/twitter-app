import instance from 'api/instance';
import * as S from './index.styles';
import { useEffect, useState } from 'react';
import { List } from 'containers/ListsSection';
import Tweets from 'components/Tweets';

const ListSection = ({ user, listQuery }) => {
    const [list, setList] = useState<List>();
    const [isFollowing, setFollowing] = useState<boolean>();

    const getList = async () => {
        try {
            const res = await instance({
                url: '/list/get',
                method: 'POST',
                data: { id: listQuery },
            });
            setList(res.data.result);
        } catch (err) {}
    };

    const followList = async () => {
        try {
            await instance({
                url: '/list/follow',
                method: 'POST',
                data: {
                    id: list?.id,
                    nick: user?.nick,
                    isFollowing: isFollowing,
                },
            });
            let followers = list?.followers;
            if (isFollowing && followers) {
                followers = followers.filter((el) => el !== user.nick);
            }
            if (!isFollowing && followers) {
                followers.push(user.nick);
            }
            if (list && followers) {
                setList({
                    id: list?.id,
                    name: list?.name,
                    desc: list?.desc,
                    members: list?.members,
                    creator: list?.creator,
                    followers: followers,
                });
            }
            setFollowing(!isFollowing);
        } catch (err) {}
    };
    useEffect(() => {
        setFollowing(list?.followers.includes(user.nick));
    }, [list]);
    useEffect(() => {
        getList();
    }, [listQuery]);
    return (
        <S.Wrapper>
            <S.Header>
                <S.LeftArrowIcon size="100%" />
                <S.TitleWrapper>
                    <S.Title>
                        <div>{list?.name}</div>
                        <p>@{list?.creator.nick}</p>
                    </S.Title>
                </S.TitleWrapper>
            </S.Header>
            <S.ListInfoWrapper>
                <S.ListTitle>{list?.name}</S.ListTitle>
                <S.ListDesc>{list?.desc}</S.ListDesc>
                <S.ListInfo>
                    {list?.creator.name}&nbsp; <p>@{list?.creator.nick}</p>
                </S.ListInfo>
                <S.ListInfo>
                    <div>{list?.members.length}&nbsp;</div>
                    <p>Members&nbsp;</p>
                    <div>{list?.followers.length}&nbsp;</div>
                    <p>Followers&nbsp;</p>
                </S.ListInfo>
                <S.FollowButton
                    following={
                        list?.followers.includes(user?.nick) ? true : false
                    }
                    onClick={followList}
                >
                    {list?.followers.includes(user?.nick) ? (
                        <div>Following</div>
                    ) : (
                        <div>Follow</div>
                    )}
                </S.FollowButton>
            </S.ListInfoWrapper>
            {user && listQuery && (
                <Tweets
                    nick={user?.nick}
                    avatar={user?.avatarId}
                    profile={null}
                    type="list"
                    tweet={null}
                    photoMode={false}
                    user={user}
                    listQuery={listQuery}
                />
            )}
        </S.Wrapper>
    );
};

export default ListSection;
