import {
    FaHome,
    FaBell,
    FaRegEnvelope,
    FaRegListAlt,
    FaRegBookmark,
    FaTwitter,
    FaEnvelope,
    FaListAlt,
    FaBookmark,
    FaUserCircle,
    FaRegUserCircle,
} from 'react-icons/fa';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { CgProfile } from 'react-icons/cg';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { RiHome7Fill, RiHome7Line } from 'react-icons/ri';
import { ImSearch } from 'react-icons/im';
import { HiOutlineSearch, HiOutlineBell, HiOutlineUsers } from 'react-icons/hi';
import { PiUsers, PiUsersFill } from 'react-icons/pi';
import { TbBell, TbBellFilled } from 'react-icons/tb';
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
/*
RiHome7Fill RiHome7Line

ImSearch HiOutlineSearch

HiMiniBell HiOutlineBell

FaEnvelope FaRegEnvelope

FaListAlt FaRegListAlt

FaBookmark FaRegBookmark

HiMiniUsers HiOutlineUsers
FaUserCircle FaRegUserCircle


*/
const TwitterIcon = styled(FaTwitter)`
    width: 25px;
`;
const HomeIcon = styled(RiHome7Line)`
    width: 25px;
`;
const ActiveHomeIcon = styled(RiHome7Fill)`
    width: 25px;
`;
const ExploreIcon = styled(HiOutlineSearch)`
    width: 25px;
`;
const ActiveExploreIcon = styled(ImSearch)`
    width: 25px;
`;
const NotificationsIcon = styled(TbBell)`
    width: 25px;
`;
const ActiveNotificationsIcon = styled(TbBellFilled)`
    width: 25px;
`;
const MessagesIcon = styled(FaRegEnvelope)`
    width: 25px;
`;
const ActiveMessageIcon = styled(FaEnvelope)`
    width: 25px;
`;
const ListIcon = styled(FaRegListAlt)`
    width: 21px;
`;
const ActiveListIcon = styled(FaListAlt)`
    width: 21px;
`;
const BookmarkIcon = styled(FaRegBookmark)`
    width: 18px;
`;
const ActiveBookmarkIcon = styled(FaBookmark)`
    width: 18px;
`;
const CommunitiesIcon = styled(PiUsers)`
    width: 25px;
`;
const ActiveCommunitiesIcon = styled(PiUsersFill)`
    width: 25px;
`;

const ProfileIcon = styled(FaRegUserCircle)`
    width: 25px;
`;

const ActiveProfileIcon = styled(FaUserCircle)`
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
        mobile: false,
    },
    {
        icon: (
            <IconWrapper>
                <HomeIcon size="100%" />
            </IconWrapper>
        ),
        activeIcon: (
            <IconWrapper>
                <ActiveHomeIcon size="100%" />
            </IconWrapper>
        ),
        link: '/home',
        name: 'Home',
        mobile: true,
    },
    {
        icon: (
            <IconWrapper>
                <ExploreIcon size="100%" />
            </IconWrapper>
        ),
        activeIcon: (
            <IconWrapper>
                <ActiveExploreIcon size="100%" />
            </IconWrapper>
        ),
        link: '/explore',
        name: 'Explore',
        mobile: true,
    },
    {
        icon: (
            <IconWrapper>
                <NotificationsIcon size="100%" />
            </IconWrapper>
        ),
        activeIcon: (
            <IconWrapper>
                <ActiveNotificationsIcon size="100%" />
            </IconWrapper>
        ),
        link: '/notifications',
        name: 'Notifications',
        mobile: true,
    },
    {
        icon: (
            <IconWrapper>
                <MessagesIcon size="100%" />
            </IconWrapper>
        ),
        activeIcon: (
            <IconWrapper>
                <ActiveMessageIcon size="100%" />
            </IconWrapper>
        ),
        link: '/messages',
        name: 'Messages',
        mobile: true,
    },
    {
        icon: (
            <IconWrapper>
                <ListIcon size="100%" />
            </IconWrapper>
        ),
        activeIcon: (
            <IconWrapper>
                <ActiveListIcon size="100%" />
            </IconWrapper>
        ),
        link: '/i/lists',
        name: 'Lists',
        mobile: false,
    },
    {
        icon: (
            <IconWrapper>
                <BookmarkIcon size="100%" />
            </IconWrapper>
        ),
        activeIcon: (
            <IconWrapper>
                <ActiveBookmarkIcon size="100%" />
            </IconWrapper>
        ),
        link: '/i/bookmarks',
        name: 'Bookmarks',
        mobile: false,
    },
    {
        icon: (
            <IconWrapper>
                <CommunitiesIcon size="100%" />
            </IconWrapper>
        ),
        activeIcon: (
            <IconWrapper>
                <ActiveCommunitiesIcon size="100%" />
            </IconWrapper>
        ),
        link: '/[profile]/communities',
        name: 'Communities',
        mobile: false,
    },
    {
        icon: (
            <IconWrapper>
                <ProfileIcon size="100%" />
            </IconWrapper>
        ),
        activeIcon: (
            <IconWrapper>
                <ActiveProfileIcon size="100%" />
            </IconWrapper>
        ),
        link: '/[profile]',
        name: 'Profile',
        mobile: false,
    },
];
