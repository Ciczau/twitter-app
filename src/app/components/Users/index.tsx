import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import instance from 'api/instance';
import { User } from 'types/user';

import * as S from './index.styles';
import {
    GetFollowingUsersRequest,
    GetSearchedUsersRequest,
    HandleFollowRequest,
} from 'api/users';

const Users = ({
    user,
    activeTab = '',
    type,
    searchKey = '',
    isEmpty = (data: boolean) => {},
    addUserToList = (data: User) => {},
    removeUserFromList = (data: User) => {},
}) => {
    const [userData, setUserData] = useState<User>({} as User);
    const [users, setUsers] = useState<User[]>();
    const [addedUsersList, setAddedUsersList] = useState<User[]>([]);
    const [followingList, setFollowingList] = useState<string[]>([]);

    const router = useRouter();

    useEffect(() => {
        setUserData(user);
        getFollowingUsers();
    }, [user]);
    const handleFollowUser = async (user: User) => {
        await followUser(user);
    };
    const followUser = async (user: User) => {
        const type = followingList.includes(user.nick) ? 'delete' : 'add';
        try {
            const res = await HandleFollowRequest(
                userData.nick,
                user.nick,
                type
            );
            if (res.status === 200) {
                if (type === 'delete') {
                    let tempList = [...followingList];
                    tempList = tempList.filter((el) => el !== user.nick);
                    setFollowingList(tempList);
                } else {
                    setFollowingList([...followingList, user.nick]);
                }
            }
        } catch (err) {}
    };
    const getFollowingUsers = async () => {
        try {
            const following = await GetFollowingUsersRequest(user.nick);
            setFollowingList(following);
        } catch (err) {}
    };

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
            if (type === 'search' || type === 'listSearch') {
                const usersArray = await GetSearchedUsersRequest(searchKey);

                if (usersArray.length === 0) {
                    isEmpty(true);
                } else {
                    isEmpty(false);
                }
                setUsers(usersArray);
            }
        } catch (err) {}
    };

    const handleUserAdd = (user: User) => {
        addUserToList(user);
        setAddedUsersList([...addedUsersList, user]);
    };
    const handleUserRemove = (user: User) => {
        removeUserFromList(user);
        let addedUsersArray = [...addedUsersList];
        addedUsersArray = addedUsersArray.filter((el) => el.nick !== user.nick);
        setAddedUsersList(addedUsersArray);
    };

    const renderUsers = () => {
        return (
            <>
                {users?.map((user, index) => {
                    if (
                        (activeTab === 'members' &&
                            addedUsersList.includes(user)) ||
                        (activeTab === 'suggested' &&
                            !addedUsersList.includes(user)) ||
                        (activeTab !== 'members' && activeTab !== 'suggested')
                    ) {
                        const isFollowing = followingList.includes(user.nick);
                        return (
                            <S.User key={index}>
                                <S.UserInfoWrapper>
                                    <S.Avatar src={user.avatar} />
                                    <S.UserDescription
                                        onClick={() =>
                                            router.push(`/${user.nick}`)
                                        }
                                    >
                                        <S.UserName>{user.name}</S.UserName>
                                        <div>@{user.nick}</div>
                                        <S.UserBio>{user.bio}</S.UserBio>
                                    </S.UserDescription>
                                </S.UserInfoWrapper>
                                {user.nick !== userData?.nick && (
                                    <S.FollowButton
                                        isFollowing={
                                            isFollowing && type !== 'listSearch'
                                        }
                                    >
                                        {type === 'listSearch' ? (
                                            <>
                                                {addedUsersList?.includes(
                                                    user
                                                ) ? (
                                                    <div
                                                        onClick={() =>
                                                            handleUserRemove(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            handleUserAdd(user)
                                                        }
                                                    >
                                                        Add
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div
                                                onClick={() =>
                                                    handleFollowUser(user)
                                                }
                                            >
                                                Follow{isFollowing && <>ing</>}{' '}
                                            </div>
                                        )}
                                    </S.FollowButton>
                                )}
                            </S.User>
                        );
                    }
                })}
            </>
        );
    };

    useEffect(() => {
        getUsers();
    }, [userData, searchKey]);
    return <S.UsersWrapper>{renderUsers()}</S.UsersWrapper>;
};

export default Users;
