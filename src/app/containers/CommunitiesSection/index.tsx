import { useContext, useEffect, useState } from 'react';
import { TbCameraPlus } from 'react-icons/tb';
import { useRouter } from 'next/router';

import instance from 'api/instance';
import { Community } from 'types/community';
import Tweets from 'components/Tweets';
import { UserContext } from 'components/BodyContent';

import * as S from './index.styles';
import {
    CreateCommunityRequest,
    GetUserCommunitiesRequest,
} from 'api/communities';

const CommunitiesSection = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [communityName, setCommunityName] = useState<string>('');
    const [communityBackground, setCommunityBackground] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [userCommunities, setUserCommunities] = useState<Community[]>([]);

    const user = useContext(UserContext);

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

            const newCommunity = await CreateCommunityRequest(formData);
            setUserCommunities([...userCommunities, newCommunity]);
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
            const communities = await GetUserCommunitiesRequest(user.nick);
            setUserCommunities(communities);
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
                    avatar={user?.avatar}
                    type="communities"
                    photoMode={false}
                />
            </S.Wrapper>
        </>
    );
};

export default CommunitiesSection;
