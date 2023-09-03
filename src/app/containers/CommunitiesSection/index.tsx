import { useEffect, useState } from 'react';
import { TbCameraPlus } from 'react-icons/tb';
import { useRouter } from 'next/router';

import instance from 'api/instance';
import { Community } from './SearchSection';
import Tweets from 'components/Tweets';

import * as S from './index.styles';

const CommunitiesSection = ({ user }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [communityName, setCommunityName] = useState<string>('');
    const [communityBackground, setCommunityBackground] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [userCommunities, setUserCommunities] = useState<Community[]>([]);

    const router = useRouter();

    const createCommunity = async () => {
        closeModal();
        try {
            const formData = new FormData();
            formData.append('name', communityName);
            formData.append('nick', user?.nick);
            if (file) {
                formData.append('file', file);
            }

            const res = await instance({
                url: '/community/create',
                method: 'POST',
                data: formData,
            });
            setUserCommunities([...userCommunities, res.data.newCommunity]);
        } catch (err) {}
    };
    const handleImage = (e) => {
        setFile(e.target.files[0]);
        setCommunityBackground(URL.createObjectURL(e.target.files[0]));
    };
    const closeModal = () => {
        setModalVisible(false);
        setFile(undefined);
        setCommunityBackground('');
        setCommunityName('');
    };
    const getUserCommunities = async () => {
        try {
            const res = await instance({
                url: '/communities/user/get',
                method: 'POST',
                data: { nick: user.nick },
            });
            setUserCommunities(res.data.result);
        } catch (err) {}
    };

    const renderCommunities = () => {
        return (
            <S.CommunitiesWrapper>
                {userCommunities?.map((community, index) => {
                    return (
                        <S.Community
                            src={community.avatar}
                            onClick={() =>
                                router.push(`/i/communities/${community._id}`)
                            }
                            key={index}
                        >
                            <S.CommunityName>{community.name}</S.CommunityName>
                        </S.Community>
                    );
                })}
            </S.CommunitiesWrapper>
        );
    };
    useEffect(() => {
        getUserCommunities();
    }, [user]);
    return (
        <>
            {modalVisible && (
                <S.ModalWrapper>
                    <S.ModalBackground />
                    <S.Modal>
                        <S.Header>
                            <S.TitleWrapper>
                                <S.CloseIcon size="100%" onClick={closeModal} />{' '}
                                <S.Title>Create community</S.Title>
                            </S.TitleWrapper>
                            <S.Button
                                active={
                                    communityName === '' ||
                                    communityBackground === ''
                                        ? false
                                        : true
                                }
                                onClick={createCommunity}
                            >
                                Create
                            </S.Button>
                        </S.Header>
                        <input
                            id="bg"
                            type="file"
                            hidden
                            onChange={handleImage}
                        />
                        <S.CommunityBackgroundWrapper src={communityBackground}>
                            <S.IconWrapper htmlFor="bg">
                                <TbCameraPlus />
                            </S.IconWrapper>
                        </S.CommunityBackgroundWrapper>
                        <S.InputWrapper>
                            <S.Input
                                id="communityName"
                                value={communityName}
                                onChange={(e) =>
                                    setCommunityName(e.target.value)
                                }
                            />
                            <S.Label
                                htmlFor="communityName"
                                isEmpty={communityName === '' ? true : false}
                            >
                                Name
                            </S.Label>
                        </S.InputWrapper>
                    </S.Modal>
                </S.ModalWrapper>
            )}
            <S.Wrapper>
                <S.Header>
                    <S.TitleWrapper>
                        <S.LeftArrowIcon
                            size="100%"
                            onClick={() => router.back()}
                        />
                        <S.Title>Communities</S.Title>
                    </S.TitleWrapper>
                    <S.CommunityIconsWrapper>
                        <S.SearchIcon
                            size="100%"
                            onClick={() => router.push('/i/communities')}
                        />
                        <S.CreatorIcon
                            size="100%"
                            onClick={() => setModalVisible(true)}
                        />
                    </S.CommunityIconsWrapper>
                </S.Header>
                {renderCommunities()}
                <Tweets
                    nick={user?.nick}
                    avatar={user?.avatarId}
                    type="communities"
                    photoMode={false}
                    user={user}
                />
            </S.Wrapper>
        </>
    );
};

export default CommunitiesSection;
