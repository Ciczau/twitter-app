import {
    FaHome,
    FaSearch,
    FaBell,
    FaRegEnvelope,
    FaRegListAlt,
    FaRegBookmark,
} from 'react-icons/fa';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { CgProfile } from 'react-icons/cg';
import styled from 'styled-components';

const IconWrapper = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.15s ease;
    cursor: pointer;
    &:hover {
        background-color: #80808034;
    }
`;

export const menuItems = [
    {
        icon: (
            <IconWrapper>
                <FaHome size="100%" style={{ width: '25px' }} color="white" />
            </IconWrapper>
        ),
        link: 'home',
    },
    {
        icon: (
            <IconWrapper>
                <FaSearch size="100%" style={{ width: '25px' }} color="white" />
            </IconWrapper>
        ),
        link: 'explore',
    },
    {
        icon: (
            <IconWrapper>
                <FaBell size="100%" style={{ width: '22px' }} color="white" />
            </IconWrapper>
        ),
        link: 'notifications',
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
        link: 'messages',
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
        link: 'lists',
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
        link: 'bookmarks',
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
        link: 'communities',
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
        link: 'profile',
    },
];
