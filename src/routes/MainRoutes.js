import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AddSlot from 'pages/components-overview/Addslot';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));


// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const TrainerEdit = Loadable(lazy(() => import('pages/components-overview/TrainerEdit')));
const AddTrainer = Loadable(lazy(() => import('pages/components-overview/AddTrainer')));
const Appointment = Loadable(lazy(() => import('pages/components-overview/Appointment')));
const VisitReason = Loadable(lazy(() => import('pages/components-overview/VisitReason')));
const TrainerTypes = Loadable(lazy(() => import('pages/components-overview/TrainerTypes')));
const Visits = Loadable(lazy(() => import('pages/components-overview/Visits')));
const Chat = Loadable(lazy(() => import('pages/components-overview/Chat')));
const App_rate = Loadable(lazy(() => import('pages/components-overview/AppRate')));
const User = Loadable(lazy(() => import('pages/components-overview/User')));

const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        { 
            path: 'dashboard',
            element:<DashboardDefault />
        },
        {
            path: 'user',
            element: <User />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'trainer',
            element: <Typography />
        },
        {
            path: 'appointment',
            element: <Appointment />
        },
        {
            path: 'trainer-edit/:id',
            element: <TrainerEdit />
        },
        {
            path: 'trainer-add',
            element: <AddTrainer />
        },
        {
            path: 'slot-add',
            element: <AddSlot />
        },
        {
            path: 'visit',
            element: <Visits />
        },
        {
            path: 'chat',
            element: <Chat />
        },
        {
            path: 'apprating',
            element: <App_rate />
        },
        {
            path: 'visitreason',
            element: <VisitReason />
        },
        {
            path: 'trainertypes',
            element: <TrainerTypes />
        }
    ]
};

export default MainRoutes;
