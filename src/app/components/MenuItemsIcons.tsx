import {
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

import styled from 'styled-components';
import { RiHome7Fill, RiHome7Line } from 'react-icons/ri';
import { ImSearch } from 'react-icons/im';
import { HiOutlineSearch } from 'react-icons/hi';
import { PiUsers, PiUsersFill } from 'react-icons/pi';
import { TbBell, TbBellFilled } from 'react-icons/tb';

export const IconWrapper = styled.div`
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

export const TwitterIcon = styled(FaTwitter)`
    width: 25px;
`;
export const HomeIcon = styled(RiHome7Line)`
    width: 25px;
`;
export const ActiveHomeIcon = styled(RiHome7Fill)`
    width: 25px;
`;
export const ExploreIcon = styled(HiOutlineSearch)`
    width: 25px;
`;
export const ActiveExploreIcon = styled(ImSearch)`
    width: 25px;
`;
export const NotificationsIcon = styled(TbBell)`
    width: 25px;
`;
export const ActiveNotificationsIcon = styled(TbBellFilled)`
    width: 25px;
`;
export const MessagesIcon = styled(FaRegEnvelope)`
    width: 25px;
`;
export const ActiveMessageIcon = styled(FaEnvelope)`
    width: 25px;
`;
export const ListIcon = styled(FaRegListAlt)`
    width: 21px;
`;
export const ActiveListIcon = styled(FaListAlt)`
    width: 21px;
`;
export const BookmarkIcon = styled(FaRegBookmark)`
    width: 18px;
`;
export const ActiveBookmarkIcon = styled(FaBookmark)`
    width: 18px;
`;
export const CommunitiesIcon = styled(PiUsers)`
    width: 25px;
`;
export const ActiveCommunitiesIcon = styled(PiUsersFill)`
    width: 25px;
`;

export const ProfileIcon = styled(FaRegUserCircle)`
    width: 25px;
`;

export const ActiveProfileIcon = styled(FaUserCircle)`
    width: 25px;
`;
