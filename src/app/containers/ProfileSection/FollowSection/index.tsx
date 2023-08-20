import { BsArrowLeftShort } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { User } from 'components/BodyContent';

import * as S from './index.styles';

const FollowSection = ({ user }) => {
    const router = useRouter();
    const pathname = router.pathname;
    const [userData, setUserData] = useState<User>();
    const [users, setUsers] = useState<User[]>();
    const [choice, setChoice] = useState<number>(
        pathname === '/[profile]/followers' ? 0 : 1
    );

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const getUsers = async () => {
        try {
            const path = choice === 0 ? 'followers' : 'following';
            const res = await axios.post(
                `http://localhost:5000/follow/${path}`,
                { user: userData?.nick }
            );
            if (res.status === 200) {
                const userList = res.data.list;

                const followerList = await axios.post(
                    'http://localhost:5000/users',
                    { list: userList }
                );
                setUsers(followerList.data.users);
            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getUsers();
    }, [userData]);
    return (
        <S.Wrapper>
            <S.Header>
                <BsArrowLeftShort
                    size="100%"
                    style={{ width: '30px' }}
                    onClick={() => router.push('/home')}
                />
                <div style={{ marginLeft: '15px', lineHeight: '22px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {userData?.name}
                    </div>
                    {userData?.nick !== '' && (
                        <div style={{ fontSize: '13px', color: 'gray' }}>
                            @{userData?.nick}
                        </div>
                    )}
                </div>
            </S.Header>
            <S.Menu>
                <S.MenuItem
                    active={choice === 0 ? true : false}
                    onClick={() => {
                        setChoice(0);
                        router.push(`/${userData?.nick}/followers`);
                    }}
                >
                    Followers
                </S.MenuItem>
                <S.MenuItem
                    active={choice === 1 ? true : false}
                    onClick={() => {
                        setChoice(0);
                        router.push(`/${userData?.nick}/following`);
                    }}
                >
                    Following
                </S.MenuItem>
            </S.Menu>
            <S.UsersWrapper>
                {users?.map((user, index) => {
                    return (
                        <S.User>
                            <S.Avatar
                                src={`https://res.cloudinary.com/df4tupotg/image/upload/${user.avatarId}`}
                            />
                            <S.UserDescription
                                onClick={() => router.push(`/${user.nick}`)}
                            >
                                <div style={{ fontWeight: 'bold' }}>
                                    {user.name}
                                </div>
                                <div style={{ color: 'gray' }}>
                                    @{user.nick}
                                </div>
                                <div>{user.bio}</div>
                            </S.UserDescription>
                            <S.FollowButton>Follow</S.FollowButton>
                        </S.User>
                    );
                })}
            </S.UsersWrapper>
        </S.Wrapper>
    );
};

export default FollowSection;
