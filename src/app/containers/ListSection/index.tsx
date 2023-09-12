import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { List } from 'types/list';
import Tweets from 'components/Tweets';
import instance from 'api/instance';
import { UserContext } from 'components/BodyContent';

import * as S from './index.styles';
import { FollowListRequest, GetListRequest } from 'api/list';

const ListSection = ({ listQuery }) => {
    const [list, setList] = useState<List>({} as List);
    const [isFollowing, setFollowing] = useState<boolean>({} as boolean);

    const user = useContext(UserContext);

    const router = useRouter();

    const getList = async () => {
        try {
            const listData = await GetListRequest(listQuery);
            setList(listData);
        } catch (err) {}
    };

    const followList = async () => {
        try {
            await FollowListRequest(list?.id, user.nick, isFollowing);
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
        setFollowing(list?.followers?.includes(user.nick));
    }, [list]);
    useEffect(() => {
        getList();
    }, [listQuery, user]);
    return (
        <S.Wrapper>
            <S.Header>
                <S.LeftArrowIcon size="100%" onClick={() => router.back()} />
                <S.TitleWrapper>
                    <S.Title>
                        <div>{list?.name}</div>
                        <p>@{list?.creator?.nick}</p>
                    </S.Title>
                </S.TitleWrapper>
            </S.Header>
            <S.ListInfoWrapper>
                <S.ListTitle>{list?.name}</S.ListTitle>
                <S.ListDesc>{list?.desc}</S.ListDesc>
                <S.ListInfo>
                    {list?.creator?.name}&nbsp; <p>@{list?.creator?.nick}</p>
                </S.ListInfo>
                <S.ListInfo>
                    <div>{list?.members?.length}&nbsp;</div>
                    <p>Members&nbsp;</p>
                    <div>{list?.followers?.length}&nbsp;</div>
                    <p>Followers&nbsp;</p>
                </S.ListInfo>
                <S.FollowButton
                    following={
                        list?.followers?.includes(user?.nick) ? true : false
                    }
                    onClick={followList}
                >
                    {list?.followers?.includes(user?.nick) ? (
                        <div>Following</div>
                    ) : (
                        <div>Follow</div>
                    )}
                </S.FollowButton>
            </S.ListInfoWrapper>
            {user && listQuery && (
                <Tweets
                    avatar={user?.avatar}
                    type="list"
                    photoMode={false}
                    listQuery={listQuery}
                />
            )}
        </S.Wrapper>
    );
};

export default ListSection;
