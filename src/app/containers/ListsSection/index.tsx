import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import instance from 'api/instance';
import { User } from 'components/BodyContent';
import Users from 'components/Users';

import * as S from './index.styles';
export interface List {
    id: string;
    name: string;
    desc: string;
    creator: User;
    members: Array<string>;
    followers: Array<string>;
}

const ListSection = ({ user }) => {
    const [focus, setFocus] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [listName, setListName] = useState<string>('');
    const [listDesc, setListDesc] = useState<string>('');
    const [userLists, setUserLists] = useState<List[]>([]);
    const [modalType, setModalType] = useState<'creator' | 'members'>(
        'creator'
    );
    const [futureMembersList, setMembersList] = useState<User[]>([]);
    const [activeTab, setActiveTab] = useState<'members' | 'suggested'>(
        'suggested'
    );
    const [listSearchKey, setListSearchKey] = useState<string>('');
    const [usersSearchKey, setUsersSearchKey] = useState<string>('');
    const [searchedLists, setSearchedLists] = useState<List[]>([]);
    const [resultVisible, setResultVisible] = useState<boolean>(false);

    const router = useRouter();

    const handleListCreate = async () => {
        if (listName !== '' || listDesc !== '') {
            setModalType('members');

            try {
                const res = await instance({
                    url: '/lists/create',
                    method: 'POST',
                    data: { creator: user, name: listName, desc: listDesc },
                });
                setUserLists([res.data.newList, ...userLists]);
            } catch (err) {}
        }
    };
    const getUserLists = async () => {
        try {
            const res = await instance({
                url: '/lists/user/get',
                method: 'POST',
                data: { nick: user.nick },
            });
            setUserLists(res.data.result);
        } catch (err) {}
    };
    const getListsByKey = async () => {
        try {
            const res = await instance({
                url: '/lists/get/bykey',
                method: 'POST',
                data: { key: listSearchKey },
            });
            setSearchedLists(res.data.result);
        } catch (err) {}
    };
    useEffect(() => {
        getUserLists();
    }, [user]);
    useEffect(() => {
        getListsByKey();
    }, [listSearchKey]);
    const handleListUsers = async () => {
        setModalVisible(false);
        try {
            const membersArray = futureMembersList.map((el) => el.nick);
            await instance({
                url: '/lists/create/users',
                method: 'POST',
                data: {
                    membersArray: membersArray,
                    name: listName,
                    desc: listDesc,
                },
            });
            setListDesc('');
            setListName('');
        } catch (err) {}
    };
    const handleMember = (user: User, type: 'add' | 'remove') => {
        if (type === 'add') {
            setMembersList([...futureMembersList, user]);
        } else if (type === 'remove') {
            let membersArray = [...futureMembersList];
            membersArray = membersArray.filter((el) => el.nick !== user.nick);
            setMembersList(membersArray);
        }
    };
    const closeModal = () => {
        setModalVisible(false);
        setModalType('creator');
        setListDesc('');
        setListName('');
    };
    function closeResultListener(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setResultVisible(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }

    const renderLists = (list: List[]) => {
        return (
            <S.ListsWrapper>
                {list.map((list, index) => {
                    return (
                        <S.List
                            key={index}
                            onClick={() => router.push(`/i/lists/${list.id}`)}
                        >
                            <S.ListIcon size="100%" />
                            <S.ListInfo>
                                <div>{list.name}</div>
                                <S.Dot>&middot;</S.Dot>
                                <p>{list.members.length} members</p>
                            </S.ListInfo>
                        </S.List>
                    );
                })}
            </S.ListsWrapper>
        );
    };

    const searchResultRef = useRef(null);
    closeResultListener(searchResultRef);
    return (
        <>
            {modalVisible && (
                <S.ModalWrapper>
                    <S.ModalBackground />
                    <S.Modal>
                        {modalType === 'creator' && (
                            <>
                                <S.ModalHeader>
                                    <S.TitleWrapper>
                                        <S.Title>
                                            <S.CloseIcon
                                                size="100%"
                                                onClick={closeModal}
                                            />
                                            <div>Create a new list</div>
                                        </S.Title>
                                        <S.Button
                                            onClick={handleListCreate}
                                            active={
                                                listName !== '' ||
                                                listDesc !== ''
                                                    ? true
                                                    : false
                                            }
                                        >
                                            Next
                                        </S.Button>
                                    </S.TitleWrapper>
                                </S.ModalHeader>
                                <S.InputWrapper>
                                    <S.Input
                                        id="name"
                                        value={listName}
                                        onChange={(e) =>
                                            setListName(e.target.value)
                                        }
                                    />
                                    <S.Label
                                        htmlFor="name"
                                        isEmpty={listName === '' ? true : false}
                                    >
                                        Name
                                    </S.Label>
                                </S.InputWrapper>
                                <S.InputWrapper>
                                    <S.Input
                                        id="desc"
                                        value={listDesc}
                                        onChange={(e) =>
                                            setListDesc(e.target.value)
                                        }
                                    />
                                    <S.Label
                                        htmlFor="desc"
                                        isEmpty={listDesc === '' ? true : false}
                                    >
                                        Description
                                    </S.Label>
                                </S.InputWrapper>
                            </>
                        )}
                        {modalType === 'members' && (
                            <>
                                <S.ModalHeader>
                                    <S.TitleWrapper>
                                        <S.Title>
                                            <S.CloseIcon
                                                size="100%"
                                                onClick={closeModal}
                                            />
                                            <div></div>
                                        </S.Title>
                                        <S.Button
                                            onClick={handleListUsers}
                                            active={true}
                                        >
                                            Done
                                        </S.Button>
                                    </S.TitleWrapper>
                                </S.ModalHeader>
                                <S.SelectionWrapper>
                                    <S.TabButton
                                        onClick={() => setActiveTab('members')}
                                        active={
                                            activeTab === 'members'
                                                ? true
                                                : false
                                        }
                                    >
                                        Members
                                    </S.TabButton>
                                    <S.TabButton
                                        onClick={() =>
                                            setActiveTab('suggested')
                                        }
                                        active={
                                            activeTab === 'suggested'
                                                ? true
                                                : false
                                        }
                                    >
                                        Suggested
                                    </S.TabButton>
                                </S.SelectionWrapper>
                                {activeTab === 'members' &&
                                    modalType === 'members' &&
                                    futureMembersList.length < 1 && (
                                        <S.EmptyListInfo>
                                            This list is lonely
                                        </S.EmptyListInfo>
                                    )}
                                {activeTab === 'suggested' && (
                                    <S.ExploreWrapper>
                                        <S.SearchIcon
                                            size="100%"
                                            focus={focus}
                                        />
                                        <S.ExploreInput
                                            placeholder="Search"
                                            onFocus={() => setFocus(true)}
                                            onBlur={() => setFocus(false)}
                                            onChange={(e) =>
                                                setUsersSearchKey(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </S.ExploreWrapper>
                                )}
                                <Users
                                    user={user}
                                    type="listSearch"
                                    activeTab={activeTab}
                                    searchKey={usersSearchKey}
                                    addUserToList={(user) =>
                                        handleMember(user, 'add')
                                    }
                                    removeUserFromList={(user) =>
                                        handleMember(user, 'remove')
                                    }
                                />
                            </>
                        )}
                    </S.Modal>
                </S.ModalWrapper>
            )}
            <S.Wrapper>
                <S.Header>
                    <S.LeftArrowIcon size="100%" />
                    <S.ExploreContainer>
                        <S.ExploreWrapper>
                            <S.SearchIcon size="100%" focus={focus} />
                            <S.ExploreInput
                                placeholder="Search"
                                onFocus={() => {
                                    setFocus(true);
                                    setResultVisible(true);
                                }}
                                onBlur={() => setFocus(false)}
                                onChange={(e) =>
                                    setListSearchKey(e.target.value)
                                }
                            />
                        </S.ExploreWrapper>
                        {resultVisible && (
                            <S.SearchResult ref={searchResultRef}>
                                {searchedLists.length === 0 ? (
                                    <>
                                        {listSearchKey === '' ? (
                                            <S.ExploreWarning>
                                                Try searching for lists
                                            </S.ExploreWarning>
                                        ) : (
                                            <S.ExploreWarning>
                                                No Lists matched "
                                                {listSearchKey}"
                                            </S.ExploreWarning>
                                        )}
                                    </>
                                ) : (
                                    <>{renderLists(searchedLists)}</>
                                )}
                            </S.SearchResult>
                        )}
                    </S.ExploreContainer>
                    <S.AddListIcon
                        size="100%"
                        onClick={() => setModalVisible(true)}
                    />
                </S.Header>
                <S.Title>Your lists</S.Title>
                {renderLists(userLists)}
            </S.Wrapper>
        </>
    );
};

export default ListSection;
