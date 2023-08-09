import { useState, useEffect } from 'react';
import * as S from './index.styles';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Tweet, { TweetType } from 'components/Tweet';
import Tweets from 'components/Tweets';
import Link from 'next/link';
const ProfileSection = ({ email, profile, type, child }) => {
    const router = useRouter();
    const pathname = router.pathname;
    const [likes, setLikes] = useState<Array<string>>([]);
    const [choice, setChoice] = useState<number>(
        pathname === '/[profile]'
            ? 0
            : pathname === '/[profile]/replies'
            ? 1
            : 2
    );

    const handleChoice = (choice: number, url: string) => {
        setChoice(choice);
        router.replace(`/${profile}${url}`);
    };
    const { previous } = router.query;

    return (
        <>
            {child}
            <S.Wrapper>
                <S.Header>
                    <BsArrowLeftShort
                        size="100%"
                        style={{ width: '30px' }}
                        onClick={() => router.push('/home')}
                    />
                    <div style={{ marginLeft: '15px', lineHeight: '22px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            {profile}
                        </div>
                        <div style={{ fontSize: '13px', color: 'gray' }}>
                            0 Tweets
                        </div>
                    </div>
                </S.Header>
                <S.ProfileHeader />
                <S.AvatarBar>
                    <S.Avatar />
                    {email === profile ? (
                        <S.SetUpProfileButton
                            onClick={() => router.push('/profile/settings')}
                        >
                            Edit profile
                        </S.SetUpProfileButton>
                    ) : (
                        <S.FollowButton>Follow</S.FollowButton>
                    )}
                </S.AvatarBar>
                <S.Description>
                    <div>{profile}</div>
                    <div>@{profile}</div>
                    <div>0 Following 1 Follower</div>
                </S.Description>
                <S.NavBar>
                    <S.Button
                        active={choice === 0 ? true : false}
                        onClick={() => handleChoice(0, '/')}
                    >
                        Tweets
                    </S.Button>
                    <S.Button
                        active={choice === 1 ? true : false}
                        onClick={() => handleChoice(1, '/replies')}
                    >
                        Replies
                    </S.Button>
                    <S.Button
                        active={choice === 2 ? true : false}
                        onClick={() => handleChoice(2, '/likes')}
                    >
                        Likes
                    </S.Button>
                </S.NavBar>
                <Tweets email={profile} type={type} />
            </S.Wrapper>
        </>
    );
};

export default ProfileSection;
