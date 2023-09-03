import instance from 'api/instance';
import { Community } from 'containers/CommunitiesSection/SearchSection';
import { useEffect, useState } from 'react';
import * as S from './index.styles';
const TweetCreator = ({
    text,
    handleChange,
    createTweet,
    placeholder,
    avatar,
    nick,
    handleFile,
    reply,
    type = '',
}) => {
    const [image, setImage] = useState<string>('');
    const [communities, setCommunities] = useState<Community[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [audienceChoice, setAudienceChoice] = useState<{
        name: string;
        id: string;
    }>({ name: 'Everyone', id: '' });
    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };
    const getUserCommunities = async () => {
        try {
            const res = await instance({
                url: '/communities/user/get',
                method: 'POST',
                data: { nick: nick },
            });
            setCommunities(res.data.result);
        } catch (err) {}
    };
    const handleChoice = (name: string, id: string) => {
        setAudienceChoice({ name: name, id: id });
        setModalVisible(false);
    };
    useEffect(() => {
        getUserCommunities();
    }, [nick]);

    const renderCommunities = () => {
        return (
            <>
                {communities.map((community, index) => {
                    return (
                        <S.AudienceWrapper
                            onClick={() =>
                                handleChoice(community.name, community._id)
                            }
                            key={index}
                        >
                            <S.AudienceItem>
                                <S.CommunityAvatar src={community.avatar} />
                                <div>{community.name}</div>
                            </S.AudienceItem>
                            {audienceChoice.id === community._id && (
                                <S.CheckIcon size="100%" />
                            )}
                        </S.AudienceWrapper>
                    );
                })}
            </>
        );
    };
    return (
        <S.TweetCreatorWrapper reply={reply}>
            <S.Avatar src={avatar} />
            <S.TweetCreator>
                {type === 'home' && !reply && (
                    <S.ChooseWrapper>
                        <S.ChoiceName onClick={() => setModalVisible(true)}>
                            {audienceChoice.name}
                            <S.ModalOpenIcon size="100%" />
                        </S.ChoiceName>
                        {modalVisible && (
                            <>
                                <S.ModalBackground
                                    onClick={() => setModalVisible(false)}
                                />
                                <S.ChooseModal>
                                    <S.TitleModal>Choose audience</S.TitleModal>
                                    <S.AudienceWrapper
                                        onClick={() =>
                                            handleChoice('everyone', '')
                                        }
                                    >
                                        <S.AudienceItem>
                                            <S.WorldIconWrapper>
                                                <S.WorldIcon size="100%" />
                                            </S.WorldIconWrapper>
                                            <div>Everyone</div>
                                        </S.AudienceItem>
                                        {audienceChoice.id === '' && (
                                            <S.CheckIcon size="100%" />
                                        )}
                                    </S.AudienceWrapper>
                                    <S.TitleModal>
                                        <div>My communities</div>
                                    </S.TitleModal>
                                    {renderCommunities()}
                                </S.ChooseModal>
                            </>
                        )}
                    </S.ChooseWrapper>
                )}
                <S.Input
                    minRows={1}
                    maxRows={5}
                    maxLength={255}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={text}
                />
                {image !== '' && (
                    <S.ImageWrapper>
                        <S.Image src={image} />
                        <S.DeleteImageButton
                            size="100%"
                            onClick={() => setImage('')}
                        />
                    </S.ImageWrapper>
                )}
                <S.SubmitBar>
                    <div>
                        <input
                            type="file"
                            hidden
                            id="imageInput"
                            accept="image/*"
                            onChange={(e) => {
                                handleFile(e);
                                handleImage(e);
                            }}
                        />
                        <label htmlFor="imageInput">
                            <S.AddImageIcon size="100%" />
                        </label>
                        {/*<S.EmojiListIcon size="100%" />*/}
                    </div>
                    <S.SendButton
                        onClick={() => {
                            createTweet(audienceChoice.id, audienceChoice.name);
                            setImage('');
                        }}
                    >
                        Tweet
                    </S.SendButton>
                </S.SubmitBar>
            </S.TweetCreator>
        </S.TweetCreatorWrapper>
    );
};
export default TweetCreator;
