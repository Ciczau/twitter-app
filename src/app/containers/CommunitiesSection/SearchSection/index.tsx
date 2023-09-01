import { useState } from 'react';
import * as S from './index.styles';
import instance from 'api/instance';
export interface Community {
    name: string;
    members: string[];
    avatar: string;
    _id: string;
}

const SearchSection = () => {
    const [focus, setFocus] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string>('');
    const [searchedCommunities, setSearchedCommunities] =
        useState<Community[]>();

    const getCommunitiesByKey = async (e) => {
        try {
            const res = await instance({
                url: '/communities/get/bykey',
                method: 'POST',
                data: { key: e.target.value },
            });
            setSearchedCommunities(res.data.result);
        } catch (err) {}
    };
    const renderCommunities = () => {
        return (
            <S.CommunitiesWrapper>
                {searchedCommunities?.map((community, index) => {
                    return (
                        <S.Community>
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
                <S.LeftArrowIcon size="100%" />
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
