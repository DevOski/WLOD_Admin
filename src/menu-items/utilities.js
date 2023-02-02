// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    TeamOutlined,
    UserOutlined,
    CalendarOutlined,
    UnorderedListOutlined,
    CommentOutlined,
    StarOutlined,
    AuditOutlined
} from '@ant-design/icons';

// icons
const icons = {
    TeamOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    UserOutlined,
    CalendarOutlined,
    UnorderedListOutlined,
    CommentOutlined,
    StarOutlined,
    AuditOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Menu',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Trainers',
            type: 'item',
            url: '/trainer',
            icon: icons.TeamOutlined
        },
        {
            id: 'util-color',
            title: 'Users',
            type: 'item',
            url: '/user',
            icon: icons.UserOutlined 
        },
        {
            id: 'util-shadow',
            title: 'Appointments',
            type: 'item',
            url: '/appointment',
            icon: icons.CalendarOutlined
        },
        {
            id: 'util-shadow1',
            title: 'Visits',
            type: 'item',
            url: '/visit',
            icon: icons.AuditOutlined,
            // breadcrumbs: false
        },
        {
            id: 'util-shadow2',
            title: 'Chats',
            type: 'item',
            url: '/chat',
            icon: icons.CommentOutlined,
            // breadcrumbs: false
        },
        {
            id: 'util-shadow3',
            title: 'App Ratings',
            type: 'item',
            url: '/apprating',
            icon: icons.StarOutlined,
            // breadcrumbs: false
        }
        ,
        {
            id: 'util-shadow4',
            title: 'Visit Reason',
            type: 'item',
            url: '/visitreason',
            icon: icons.UnorderedListOutlined,
            // breadcrumbs: false
        },
        {
            id: 'util-shadow5',
            title: 'Trainer Types',
            type: 'item',
            url: '/trainertypes',
            icon: icons.TeamOutlined,
            // breadcrumbs: false
        }
    ]
};

export default utilities;
