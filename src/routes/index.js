import { useRoutes } from 'react-router-dom';
import { useState } from 'react';
import { lazy } from 'react';
// project import
import Loadable from 'components/Loadable';
// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from 'layout/MainLayout';
import AddSlot from 'pages/components-overview/Addslot';
import { Redirect } from 'react-router-dom';
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const TrainerEdit = Loadable(lazy(() => import('pages/components-overview/TrainerEdit')));
const AddTrainer = Loadable(lazy(() => import('pages/components-overview/AddTrainer')));
const Appointment = Loadable(lazy(() => import('pages/components-overview/Appointment')));
const VisitReason = Loadable(lazy(() => import('pages/components-overview/VisitReason')));
const TrainerTypes = Loadable(lazy(() => import('pages/components-overview/TrainerTypes')));
const Visits = Loadable(lazy(() => import('pages/components-overview/Visits')));
const Chat = Loadable(lazy(() => import('pages/components-overview/Chat')));
const App_rate = Loadable(lazy(() => import('pages/components-overview/AppRate')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const User = Loadable(lazy(() => import('pages/components-overview/User')));



// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    // return useRoutes([LoginRoutes,MainRoutes]);
    const [storage,setstorage]= useState(localStorage.getItem("admin"));

    return (
      <Routes>
            <Route path="/" element={<AuthLogin/>} />

      {storage ? (
        
        <Route path="/" element={<MainLayout />}>
        {/* <Route path={"/dashboard"} element={<DashboardDefault />} /> */}
        <Route path={"/trainer" }element={<Typography />} />
        
      <Route path="/appointment" element={<Appointment /> }/>

      <Route path="/trainer-edit/:id" element={ <TrainerEdit /> }/>

      <Route path="/trainer-add" element={<AddTrainer /> }/>

      <Route path="/slot-add" element={<AddSlot />}/>

      <Route path="/visit" element={<Visits />}/>

      <Route path="/chat" element={<Chat />}/>

      <Route path="/apprating" element={<App_rate />}/>

      <Route path="/visitreason" element={<VisitReason />}/>

      <Route path="/trainertypes" element={<TrainerTypes />}/>

      <Route  path='/user' element={<User />}/> 
      </Route>
          ) : (
            <Route path='*' element={<Navigate to='/' />} />
        )}
        {/* <Route path="/" element={<AuthLogin/>} />
      <Route path="/dashboard"
      element={storage ? <MainLayout /> : <Navigate to="/" />}><DashboardDefault /> </Route>

      <Route path="/trainer"
      element={storage ? <><MainLayout /> <Typography /> </>: <Navigate to="/" />}/>

      <Route path="/appointment"
      element={storage ? <><MainLayout /><Appointment /> </>: <Navigate to="/" />}/>

      <Route path="/trainer-edit/:id"
      element={storage ? <><MainLayout /> <TrainerEdit /> </> : <Navigate to="/" />}/>

      <Route path="/trainer-add"
      element={storage ? <><MainLayout /><AddTrainer /> </> : <Navigate to="/" />}/>

      <Route path="/slot-add"
      element={storage ? <><MainLayout /><AddSlot /></> : <Navigate to="/" />}/>

      <Route path="/visit"
      element={storage ? <><MainLayout /><Visits /></> : <Navigate to="/" />}/>

      <Route path="/chat"
      element={storage ? <><MainLayout /><Chat /></> : <Navigate to="/" />}/>

      <Route path="/apprating"
      element={storage ? <><MainLayout /><App_rate /></> : <Navigate to="/" />}/>

      <Route path="/visitreason"
      element={storage ? <><MainLayout /><VisitReason /></> : <Navigate to="/" />}/>

      <Route path="/trainertypes"
      element={storage ? <><MainLayout /><TrainerTypes /></> : <Navigate to="/" />}/>

      <Route  path='/user'
        element={storage ? <><MainLayout /><User /></> : <Navigate to="/" />}/> */}
      </Routes>
        //   {storage ? (
        //     <Route
        //     path="/sigin"
        //     element={token ? <Navigate to="/" /> : <Siging />}
        //   />
    
        //   ) : (
        //     <LoginRoutes/>
        //   )}
        // </div>
      );
}
