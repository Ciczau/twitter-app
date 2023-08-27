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
    justify-content: center;
    z-index: 999;
    align-items: center;
`;

export const menuItems = [
    {
        icon: (
            <IconWrapper>
                <FaTwitter
                    size="100%"
                    style={{ width: '25px' }}
                    color="white"
                />
            </IconWrapper>
        ),
        link: '/',
        name: '',
    },
    {
        icon: (
            <IconWrapper>
                <FaHome size="100%" style={{ width: '25px' }} color="white" />
            </IconWrapper>
        ),
        link: '/home',
        name: 'Home',
    },
    {
        icon: (
            <IconWrapper>
                <IoIosSearch
                    size="100%"
                    style={{ width: '25px' }}
                    color="white"
                />
            </IconWrapper>
        ),
        link: '/explore',
        name: 'Explore',
    },
    {
        icon: (
            <IconWrapper>
                <FaBell size="100%" style={{ width: '22px' }} color="white" />
            </IconWrapper>
        ),
        link: '/notifications',
        name: 'Notifications',
    },
    {
        icon: (
            <IconWrapper>
                <FaRegEnvelope
                    size="100%"
                    style={{ width: '25px' }}
                    color="white"
                />
            </IconWrapper>
        ),
        link: '/messages',
        name: 'Messages',
    },
    {
        icon: (
            <IconWrapper>
                <FaRegListAlt
                    size="100%"
                    style={{ width: '21px' }}
                    color="white"
                />
            </IconWrapper>
        ),
        link: '/lists',
        name: 'Lists',
    },
    {
        icon: (
            <IconWrapper>
                <FaRegBookmark
                    size="100%"
                    style={{ width: '18px' }}
                    color="white"
                />
            </IconWrapper>
        ),
        link: '/i/bookmarks',
        name: 'Bookmarks',
    },
    {
        icon: (
            <IconWrapper>
                <LiaUserFriendsSolid
                    size="100%"
                    style={{ width: '25px' }}
                    color="white"
                />
            </IconWrapper>
        ),
        link: '/communities',
        name: 'Communities',
    },
    {
        icon: (
            <IconWrapper>
                <CgProfile
                    size="100%"
                    style={{ width: '25px' }}
                    color="white"
                />
            </IconWrapper>
        ),
        link: '/profile',
        name: 'Profile',
    },
];
