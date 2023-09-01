import instance from 'api/instance';
import * as S from './index.styles';
import { useEffect, useState } from 'react';
import { Community } from '../SearchSection';
import Tweets from 'components/Tweets';

const CommunitySection = ({ communityQuery, user }) => {
    const [community, setCommunity] = useState<Community>();
    const getCommunity = async () => {
        try {
            const res = await instance({
                url: '/community/get',
                method: 'POST',
                data: { id: communityQuery },
            });
            setCommunity(res.data.result);
            console.log(res);
        } catch (err) {}
    };
    useEffect(() => {
        getCommunity();
    }, [communityQuery]);
    return (
        <S.Wrapper>
            <S.Header>
                <S.TitleWrapper>
                    <S.LeftArrowIcon size="100%" />
                    <S.Title>{community?.name}</S.Title>
                </S.TitleWrapper>
            </S.Header>
            <S.CommunityBackground src={community?.avatar} />
            <S.CommunityContent>
                <S.CommunityTitle>{community?.name}</S.CommunityTitle>
                <S.Button>
                    {community?.members.includes(user.nick) ? (
                        <>Joined</>
                    ) : (
                        <>Join</>
                    )}
                </S.Button>
            </S.CommunityContent>
            {community && (
                <Tweets
                    nick={user.nick}
                    avatar={user.avatarId}
                    profile={null}
                    type="community"
                    community={community?._id}
                    tweet={null}
                    photoMode={false}
                    user={user}
                />
            )}
        </S.Wrapper>
    );
};
export default CommunitySection;
