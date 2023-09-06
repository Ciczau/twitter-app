import { AiFillHeart } from 'react-icons/ai';
import { BiRepost } from 'react-icons/bi';
import { FaTwitter, FaUser } from 'react-icons/fa';
import styled from 'styled-components';

export const Wrapper = styled.div`
    color: white;
    width: 600px;
    max-width: 85vw;
    @media screen and (max-width:767px){
        width: 100vw;
        max-width: 100vw;
    }
`;
export const Header = styled.div`
    width: 100%;
    padding: 10px 20px;
    border-bottom: 1px solid #4e4d4d;
`;

export const Title = styled.div`
    font-size: 21px;
    font-weight: 700;
`;

export const NotificationsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
export const Notification = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: ${(props) =>
        props.type !== 'retweet' && '1px solid #4e4d4d'};
`;
export const NotificationIconWrapper = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 15px;
`;

export const LoginIcon = styled(FaTwitter)`
    width: 25px;
    color: white;
`;
export const LikeIcon = styled(AiFillHeart)`
    color: #ad156e;
    cursor: pointer;
    width: 30px;
`;
export const NotificationContent = styled.div`
    width: 90%;
    font-size: 15px;
    padding: 5px 15px;
    display: flex;
    flex-direction: column;
`;
export const Avatar = styled.img`
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
`;
export const RepostIcon = styled(BiRepost)`
    width: 30px;
    cursor: pointer;
    color: #0c9143;
`;
export const UserIcon = styled(FaUser)`
    width: 20px;
    color: #0077ff;
`;
