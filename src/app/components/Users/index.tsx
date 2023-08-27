import { useRouter } from 'next/router';
import * as S from './index.styles';
import { useEffect, useState } from 'react';
import { User } from 'components/BodyContent';
import instance from 'api/instance';

const Users = ({ user, activeTab = '', type, searchKey = '' }) => {
    const router = useRouter();

    const [userData, setUserData] = useState<User>();
    const [users, setUsers] = useState<User[]>();
    useEffect(() => {
        setUserData(user);
    }, [user]);

    const getUsers = async () => {
        try {
            if (type === 'followers') {
                const res = await instance({
                    url: `/follow/${activeTab}`,
                    method: 'POST',
                    data: { user: userData?.nick },
                });
                if (res.status === 200) {
                    const userList = res.data.list;
                    const followerList = await instance({
                        url: '/users',
                        method: 'POST',
                        data: { list: userList },
                    });
                    setUsers(followerList.data.users);
                }
            }
            if (type === 'search') {
                const res = await instance({
                    url: '/users/get/search',
                    method: 'POST',
                    data: { key: searchKey },
                });
                if (res.status === 200) {
                    setUsers(res.data.result);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getUsers();
    }, [userData, searchKey]);
    return (
        <S.UsersWrapper>
            {users?.map((user, index) => {
                return (
                    <S.User key={index}>
                        <S.Avatar
                            src={`https://res.cloudinary.com/df4tupotg/image/upload/${user.avatarId}`}
                        />
                        <S.UserDescription
                            onClick={() => router.push(`/${user.nick}`)}
                        >
                            <S.UserName>{user.name}</S.UserName>
                            <div>@{user.nick}</div>
                            <S.UserBio>{user.bio}</S.UserBio>
                        </S.UserDescription>
                        <S.FollowButton>Follow</S.FollowButton>
                    </S.User>
                );
            })}
        </S.UsersWrapper>
    );
};

export default Users;
