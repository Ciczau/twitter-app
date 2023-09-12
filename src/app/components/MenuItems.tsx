import {
    ActiveBookmarkIcon,
    ActiveCommunitiesIcon,
    ActiveExploreIcon,
    ActiveHomeIcon,
    ActiveListIcon,
    ActiveMessageIcon,
    ActiveNotificationsIcon,
    ActiveProfileIcon,
    BookmarkIcon,
    CommunitiesIcon,
    ExploreIcon,
    HomeIcon,
    IconWrapper,
    ListIcon,
    MessagesIcon,
    NotificationsIcon,
    ProfileIcon,
    TwitterIcon,
} from './MenuItemsIcons';

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
