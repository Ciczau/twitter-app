import {
    FaHome,
    FaSearch,
    FaBell,
    FaRegEnvelope,
    FaRegListAlt,
    FaRegBookmark,
    FaTwitter,
} from 'react-icons/fa';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { CgProfile } from 'react-icons/cg';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';

const IconWrapper = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    position: relative;
    color: white;
    justify-content: center;
    z-index: 999;
    align-items: center;
`;

const TwitterIcon = styled(FaTwitter)`
    width: 25px;
`;
const HomeIcon = styled(FaHome)`
    width: 25px;
`;
const ExploreIcon = styled(IoIosSearch)`
    width: 25px;
`;
const NotificationsIcon = styled(FaBell)`
    width: 22px;
`;
const MessagesIcon = styled(FaRegEnvelope)`
    width: 25px;
`;
const ListIcon = styled(FaRegListAlt)`
    width: 21px;
`;
const BookmarkIcon = styled(FaRegBookmark)`
    width: 18px;
`;
const CommunitiesIcon = styled(LiaUserFriendsSolid)`
    width: 25px;
`;

const ProfileIcon = styled(CgProfile)`
    width: 25px;
`;

export const menuItems = [
    {
        icon: (
            <IconWrapper>
                <TwitterIcon size="100%" />
            </IconWrapper>
        ),
        link: '/',
        name: '',
    },
    {
        icon: (
            <IconWrapper>
                <HomeIcon size="100%" />
            </IconWrapper>
        ),
        link: '/home',
        name: 'Home',
    },
    {
        icon: (
            <IconWrapper>
                <ExploreIcon size="100%" />
            </IconWrapper>
        ),
        link: '/explore',
        name: 'Explore',
    },
    {
        icon: (
            <IconWrapper>
                <NotificationsIcon size="100%" />
            </IconWrapper>
        ),
        link: '/notifications',
        name: 'Notifications',
    },
    {
        icon: (
            <IconWrapper>
                <MessagesIcon size="100%" />
            </IconWrapper>
        ),
        link: '/messages',
        name: 'Messages',
    },
    {
        icon: (
            <IconWrapper>
                <ListIcon size="100%" />
            </IconWrapper>
        ),
        link: '/i/lists',
        name: 'Lists',
    },
    {
        icon: (
            <IconWrapper>
                <BookmarkIcon size="100%" />
            </IconWrapper>
        ),
        link: '/i/bookmarks',
        name: 'Bookmarks',
    },
    {
        icon: (
            <IconWrapper>
                <CommunitiesIcon size="100%" />
            </IconWrapper>
        ),
        link: '/[profile]/communities',
        name: 'Communities',
    },
    {
        icon: (
            <IconWrapper>
                <ProfileIcon size="100%" />
            </IconWrapper>
        ),
        link: '/[profile]',
        name: 'Profile',
    },
];
