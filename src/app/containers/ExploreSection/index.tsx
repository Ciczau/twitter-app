import { useContext, useEffect, useState } from 'react';

import Tweets from 'components/Tweets';
import Users from 'components/Users';
import SideBar from 'components/SideBar';
import { UserContext } from 'components/BodyContent';

import * as S from './index.styles';

const ExploreSection = () => {
    const [focus, setFocus] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'tweets' | 'users'>('tweets');
    const [emptyTweetList, setEmptyTweetList] = useState<boolean>(false);
    const [emptyUserList, setEmptyUserList] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(window.innerWidth);

    const userData = useContext(UserContext);

    useEffect(() => {
        const handleWidth = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWidth);
        return () => {
            window.removeEventListener('resize', handleWidth);
        };
    }, []);
    const handleChange = (e) => {
        if (e.key === 'Enter') {
            setEmptyTweetList(false);
            setEmptyUserList(false);
            setSearchKey(e.target.value);
        }
    };

    return (
        <S.Wrapper>
            <S.Header>
                {width < 767 && <SideBar />}
                <S.ExploreWrapper>
                    <S.SearchIcon size="100%" focus={focus} />
                    <S.ExploreInput
                        placeholder="Search"
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        onKeyPress={handleChange}
                    />
                </S.ExploreWrapper>
            </S.Header>
            {searchKey !== '' && (
                <S.SelectionWrapper>
                    <S.Button
                        onClick={() => setActiveTab('tweets')}
                        active={activeTab === 'tweets' ? true : false}
                    >
                        Tweets
                    </S.Button>
                    <S.Button
                        onClick={() => setActiveTab('users')}
                        active={activeTab === 'users' ? true : false}
                    >
                        Users
                    </S.Button>
                </S.SelectionWrapper>
            )}

            {searchKey !== '' && userData && (
                <>
                    {activeTab === 'tweets' ? (
                        <>
                            {emptyTweetList ? (
                                <S.Warning>
                                    No result for {`"${searchKey}"`}
                                </S.Warning>
                            ) : (
                                <Tweets
                                    avatar={userData?.avatar}
                                    type="search"
                                    photoMode={false}
                                    searchKey={searchKey}
                                    isEmpty={(data) => setEmptyTweetList(data)}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            {emptyUserList ? (
                                <S.Warning>
                                    No result for {`"${searchKey}"`}
                                </S.Warning>
                            ) : (
                                <Users
                                    user={userData}
                                    type="search"
                                    searchKey={searchKey}
                                    isEmpty={(data) => setEmptyUserList(data)}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </S.Wrapper>
    );
};

export default ExploreSection;
