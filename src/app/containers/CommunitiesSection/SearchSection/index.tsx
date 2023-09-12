import { useState } from 'react';
import * as S from './index.styles';
import { useRouter } from 'next/router';

import { Community } from 'types/community';
import { GetSearchedCommunitiesRequest } from 'api/communities';

const SearchSection = () => {
    const [focus, setFocus] = useState<boolean>(false);
    const [searchedCommunities, setSearchedCommunities] =
        useState<Community[]>();

    const router = useRouter();

    const getCommunitiesByKey = async (e) => {
        try {
            const communities = await GetSearchedCommunitiesRequest(
                e.target.value
            );
            setSearchedCommunities(communities);
        } catch (err) {}
    };
    const renderCommunities = () => {
        return (
            <S.CommunitiesWrapper>
                {searchedCommunities?.map((community, index) => {
                    return (
                        <S.Community
                            key={index}
                            onClick={() =>
                                router.push(`/i/communities/${community._id}`)
                            }
                        >
                            <S.CommunityAvatar src={community.avatar} />
                            <S.CommunityContent>
                                <p>{community.name}</p>
                                <div>{community.members.length} Members</div>
                            </S.CommunityContent>
                        </S.Community>
                    );
                })}
            </S.CommunitiesWrapper>
        );
    };
    return (
        <S.Wrapper>
            <S.Header>
                <S.LeftArrowIcon size="100%" onClick={() => router.back()} />
                <S.ExploreWrapper>
                    <S.SearchIcon size="100%" focus={focus} />
                    <S.ExploreInput
                        placeholder="Search"
                        onFocus={() => {
                            setFocus(true);
                        }}
                        onBlur={() => setFocus(false)}
                        onChange={getCommunitiesByKey}
                    />
                </S.ExploreWrapper>
            </S.Header>
            {renderCommunities()}
        </S.Wrapper>
    );
};
export default SearchSection;
