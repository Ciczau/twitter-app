import { useEffect, useState } from 'react';

import Tweets from 'components/Tweets';
import { User } from 'components/BodyContent';
import Users from 'components/Users';

import * as S from './index.styles';
import SideBar from 'components/SideBar';

const ExploreSection = ({ user }) => {
    const [focus, setFocus] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string>('');
    const [userData, setUserData] = useState<User>();
    const [activeTab, setActiveTab] = useState<'tweets' | 'users'>('tweets');
    const [emptyTweetList, setEmptyTweetList] = useState<boolean>(false);
    const [emptyUserList, setEmptyUserList] = useState<boolean>(false);
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
    const handleChange = (e) => {
        if (e.key === 'Enter') {
            setEmptyTweetList(false);
            setEmptyUserList(false);
            setSearchKey(e.target.value);
        }
    };
    useEffect(() => {
        setUserData(user);
    }, [user]);
    return (
        <S.Wrapper>
            <S.Header>
                {width < 767 && <SideBar user={user} />}
                <S.ExploreWrapper>
                    <S.SearchIcon size="100%" focus={focus} />
                    <S.ExploreInput
                        placeholder="Search"
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        onKeyPress={handleChange}
                    />
                </S.ExploreWrapper>
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
            </S.Header>
            {searchKey !== '' && (
                <>
                    {activeTab === 'tweets' ? (
                        <>
                            {emptyTweetList ? (
                                <S.Warning>
                                    No result for {`"${searchKey}"`}
                                </S.Warning>
                            ) : (
                                <Tweets
                                    nick={userData?.nick}
                                    avatar={userData?.avatar}
                                    type="search"
                                    photoMode={false}
                                    searchKey={searchKey}
                                    user={user}
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
