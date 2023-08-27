import { IoIosSearch } from 'react-icons/io';
import * as S from './index.styles';
import { useEffect, useState } from 'react';
import Tweets from 'components/Tweets';
import { User } from 'components/BodyContent';
import Users from 'components/Users';

const ExploreSection = ({ user }) => {
    const [focus, setFocus] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string>('');
    const [userData, setUserData] = useState<User>();
    const [activeTab, setActiveTab] = useState<'tweets' | 'users'>('tweets');

    const handleChange = (e) => {
        if (e.key === 'Enter') {
            setSearchKey(e.target.value);
            console.log(e.target.value);
        }
    };
    useEffect(() => {
        setUserData(user);
    }, [user]);
    return (
        <S.Wrapper>
            <S.Header>
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
                        <Tweets
                            nick={userData?.nick}
                            avatar={userData?.avatarId}
                            profile={null}
                            type="search"
                            postTweet={null}
                            photoMode={false}
                            searchKey={searchKey}
                            user={user}
                        />
                    ) : (
                        <Users
                            user={userData}
                            type="search"
                            searchKey={searchKey}
                        />
                    )}
                </>
            )}
        </S.Wrapper>
    );
};

export default ExploreSection;
