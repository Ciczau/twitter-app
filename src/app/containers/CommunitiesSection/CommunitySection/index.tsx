import { useContext, useEffect, useState } from 'react';

import { Community } from 'types/community';
import instance from 'api/instance';
import Tweets from 'components/Tweets';

import * as S from './index.styles';
import { UserContext } from 'components/BodyContent';
import { GetCommunityRequest, JoinCommunityRequest } from 'api/communities';

const CommunitySection = ({ communityQuery }) => {
    const [community, setCommunity] = useState<Community>({} as Community);
    const [buttonText, setButtonText] = useState<string>('');

    const user = useContext(UserContext);

    const getCommunity = async () => {
        try {
            const community = await GetCommunityRequest(communityQuery);
            setCommunity(community);
        } catch (err) {}
    };
    const joinCommunity = async () => {
        const joined = community?.members.includes(user.nick) ? true : false;

        try {
            const res = await JoinCommunityRequest(
                user.nick,
                joined,
                community?._id
            );
            if (res.status === 200) {
                if (community) {
                    let tempCommunity: Community = community;
                    if (joined) {
                        let tempMembers = tempCommunity.members;
                        tempMembers = tempMembers.filter(
                            (member) => member !== user.nick
                        );
                        tempCommunity.members = tempMembers;
                    } else {
                        tempCommunity.members.push(user.nick);
                    }
                    setCommunity({
                        _id: community._id,
                        name: community.name,
                        members: tempCommunity.members,
                        avatar: community.avatar,
                    });
                }
            }
        } catch (err) {}
    };
    const handleTextButton = (buttonHover: boolean) => {
        if (community?.members?.includes(user.nick)) {
            if (buttonHover) {
                setButtonText('Leave');
            } else {
                setButtonText('Joined');
            }
        } else {
            setButtonText('Join');
        }
    };
    useEffect(() => {
        getCommunity();
    }, [communityQuery]);
    useEffect(() => {
        handleTextButton(false);
    }, [community]);
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
                <S.CommunityBar>
                    <S.MembersCount>
                        <b>{community?.members?.length}</b> Member
                        {community !== undefined &&
                            community?.members?.length !== 1 && <>s</>}
                    </S.MembersCount>
                    <S.Button
                        onClick={joinCommunity}
                        joined={community?.members?.includes(user?.nick)}
                        leave={buttonText === 'Leave' ? true : false}
                        onMouseEnter={() => handleTextButton(true)}
                        onMouseLeave={() => handleTextButton(false)}
                    >
                        {buttonText}
                    </S.Button>
                </S.CommunityBar>
            </S.CommunityContent>

            <Tweets
                avatar={user.avatar}
                profile={null}
                type="community"
                community={community._id}
                tweet={null}
                photoMode={false}
            />
        </S.Wrapper>
    );
};
export default CommunitySection;
