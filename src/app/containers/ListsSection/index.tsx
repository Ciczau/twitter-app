import { useEffect, useState } from 'react';
import * as S from './index.styles';
import instance from 'api/instance';
import { useRouter } from 'next/router';
import { User } from 'components/BodyContent';

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
    const [userLists, setUserLists] = useState<List[]>();

    const router = useRouter();

    const handleListCreate = async () => {
        setModalVisible(false);
        try {
            const res = await instance({
                url: '/lists/create',
                method: 'POST',
                data: { creator: user, name: listName, desc: listDesc },
            });
        } catch (err) {}
    };
    const getUserLists = async () => {
        try {
            const res = await instance({
                url: '/lists/user/get',
                method: 'POST',
                data: { nick: user.nick },
            });
            console.log(res);
            setUserLists(res.data.result);
        } catch (err) {}
    };
    useEffect(() => {
        getUserLists();
    }, [user]);
    return (
        <>
            {modalVisible && (
                <S.ModalWrapper>
                    <S.ModalBackground />
                    <S.Modal>
                        <S.ModalHeader>
                            <S.TitleWrapper>
                                <S.Title>
                                    <S.CloseIcon
                                        size="100%"
                                        onClick={() => setModalVisible(false)}
                                    />
                                    <div>chuj</div>
                                </S.Title>
                                <S.Button onClick={handleListCreate}>
                                    Create
                                </S.Button>
                            </S.TitleWrapper>
                        </S.ModalHeader>
                        <S.InputWrapper>
                            <S.Input
                                id="name"
                                value={listName}
                                onChange={(e) => setListName(e.target.value)}
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
                                onChange={(e) => setListDesc(e.target.value)}
                            />
                            <S.Label
                                htmlFor="desc"
                                isEmpty={listDesc === '' ? true : false}
                            >
                                Description
                            </S.Label>
                        </S.InputWrapper>
                    </S.Modal>
                </S.ModalWrapper>
            )}
            <S.Wrapper>
                <S.Header>
                    <S.LeftArrowIcon size="100%" />
                    <S.ExploreWrapper>
                        <S.SearchIcon size="100%" focus={focus} />
                        <S.ExploreInput
                            placeholder="Search"
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                        />
                    </S.ExploreWrapper>{' '}
                    <S.AddListIcon
                        size="100%"
                        onClick={() => setModalVisible(true)}
                    />
                </S.Header>
                <S.Title>Your lists</S.Title>
                <S.ListsWrapper>
                    {userLists?.map((list, index) => {
                        return (
                            <S.List
                                key={index}
                                onClick={() =>
                                    router.push(`/i/lists/${list.id}`)
                                }
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
            </S.Wrapper>
        </>
    );
};

export default ListSection;
