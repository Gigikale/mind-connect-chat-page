import { BrowserRouter, Route, Routes } from "react-router-dom";
import {SnackbarProvider} from "notistack";
import LandingPage from "./pages/home/dashboard/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import GroupPage from "./pages/home/GroupPage";
import OurRoutes from "./commons/OurRoutes"
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ConfirmEmail from "./pages/auth/ConfirmEmailPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import PostPage from "./pages/home/PostsPage";
import ProfilePage from "./pages/home/profile/ProfilePage";
import SuccessfulModal from "./components/popups/SuccessfulModal";
import CreatedGroupSuccessModal from "./components/popups/CreatedGroupSuccessmodal";
import JoinedGroupSuccessModal from "./components/popups/JoinedGroupSuccessModal";
import ExitGroupSuccessModal from "./components/popups/ExitGroupSuccessModal";
import Slidepics from "./commons/Slidepics";
import JoinedGroupPage from "./pages/home/JoinedGroupPage";
import PostsPage from "./pages/home/PostsPage";
import ChatPage from "./pages/home/ChatPage";


function App() {
  return (
    <>
      <SnackbarProvider 
                maxSnack={2} 
                iconVariant={{
                    success: '✅ ',
                    error: '✖️ ',
                    warning: '⚠️ ',
                    info: 'ℹ️ ',
                }}
            />

      <BrowserRouter>
        <Routes>
          <Route path={OurRoutes.slidepage} element={<Slidepics />} />
          <Route path={OurRoutes.landing} element={<LandingPage />} />
          <Route path={OurRoutes.signup} element={<SignupPage />} />
          <Route path={OurRoutes.homepage} element={<HomePage />} />
          <Route path={OurRoutes.grouppage} element={<GroupPage />} />
          <Route path={OurRoutes.login} element={<LoginPage />} />
          <Route path={OurRoutes.post} element={<PostPage/>}/>
          <Route path={OurRoutes.profilepage } element={<ProfilePage />} />
          <Route path={OurRoutes.chatpage } element={<ChatPage />} />
          <Route path={OurRoutes.successfulmodal } element={<SuccessfulModal />} />
          <Route path={OurRoutes.Createdgroupsuccessmodal } element={<CreatedGroupSuccessModal />} />
          <Route path={OurRoutes.joinedgroupsuccessmodal } element={<JoinedGroupSuccessModal />} />
          <Route path={OurRoutes.exitgroupsuccessmodal } element={<ExitGroupSuccessModal />} />
          <Route path={OurRoutes.postpage} element={<PostsPage/>} />
          <Route
            path={OurRoutes.verifemailypage}
            element={<VerifyEmailPage />}
          />
          <Route path={OurRoutes.confirmemailpage} element={<ConfirmEmail />} />
          <Route
            path={OurRoutes.forgotpasswordpage}
            element={<ForgotPassword />}
          />
          <Route
            path={OurRoutes.resetpasswordpage}
            element={<ResetPasswordPage />}
          />
          <Route
            path={OurRoutes.changepasswordpage}
            element={<ChangePasswordPage />}
          />
          <Route path={OurRoutes.joinedgroup} element={<JoinedGroupPage/>}/>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
