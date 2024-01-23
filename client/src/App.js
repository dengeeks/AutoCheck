import Header from "./layers/Header/Header";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/Auth/Login";
import RegistrationPage from "./pages/Auth/Registration";
import ChangePassword from "./pages/Auth/ChangePassword";
import { Route, Routes } from "react-router-dom";
import ForgetPasswordPage from "./pages/Auth/ForgetPassword";
import Footer from "./layers/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSidebar from './layers/adminSidebar/AdminSidebar'
import AdminUsers from "./pages/AdminPanel/Users/AdminUsers";
import AdminStatistic from "./components/AdminPanel/AdminStatistic/AdminStatistic";
import AdminTariffPlans from "./pages/AdminPanel/TariffPlans/AdminTariff";
import AdminTariffChange from "./pages/AdminPanel/TariffPlans/AdminTariffChange";
import AdminSocialNetworks from "./pages/AdminPanel/SocialNetworks/AdminSocialNetworks";
import AdminSocialNetworkChange from "./pages/AdminPanel/SocialNetworks/AdminChangeSocialNetwork";
import AdminContacts from "./pages/AdminPanel/Contacts/AdminContacts";
import AdminContactChange from "./pages/AdminPanel/Contacts/AdminContactsChange";
import AdminReviews from "./pages/AdminPanel/Reviews/AdminReviews";
import AdminReviewChange from "./pages/AdminPanel/Reviews/AdminReviewChange";
import ActivateUser from "./pages/Auth/ActivateUser";
import FeedbackPage from "./pages/FeedbackPage";
import NotFoundError from "./pages/Errors/NotFound/NotFoundPage";
import AdminUsersChange from "./pages/AdminPanel/Users/AdminUsersChange";
import BlockedUserPage from "./pages/Errors/Blocked/BlockedUserPage";
import AdminMailingPage from "./pages/AdminPanel/Mailing/AdminMailing";
import BlockedUsers from "./pages/AdminPanel/BlockedUsers/BlockedUsers";
import ReviewPage from "./pages/Review/ReviewPage";

import ProfileSidebar from "./layers/profileSidebar/ProfileSidebar";
import AccountSettings from "./pages/UserProfile/AccountSettings/AccountSettings";
import TicketSystem from "./pages/UserProfile/TicketSystem/TicketCatalog/TicketCatalog";
import TicketPage from "./pages/UserProfile/TicketSystem/TicketPage/TicketPage";
import ReferralSystem from "./pages/UserProfile/ReferralSystem/ReferralSystem";
import UserBalance from "./pages/UserProfile/Balance/UserBalance";
import Profile from "./pages/UserProfile/Profile/ProfileIndex";
import AdminReferralSystem from "./pages/AdminPanel/ReferralSystem/ReferralSystem";
import AdminTicketSystem from "./pages/AdminPanel/TicketSystem/TicketSystem";
import AdminTicketAnswerPage from "./pages/AdminPanel/TicketSystem/TicketAnswerPage";

import './styles/App.css'
import PaymentSettings from "./pages/AdminPanel/PaymentSettings/PaymentSettings";
import FAQPage from "./pages/UserProfile/FAQ/FAQPage";
import TariffPage from "./pages/UserProfile/TariffPlans/TariffPage";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <ToastContainer position='top-center' autoClose={2000} style={{ top: '70px' }} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration/:referral_code?" element={<RegistrationPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password/:uid/:token" element={<ChangePassword />} />
          <Route path="/activate/:uid/:token" element={<ActivateUser />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/review/:id" element={<ReviewPage />} />
          <Route path="/you-blocked" element={<BlockedUserPage />} />
          <Route path="/user-profile" element={<ProfileSidebar />}>
            <Route index element={<Profile />} />
            <Route path="referral-system" element={<ReferralSystem />}/>
            <Route path="settings" element={<AccountSettings />}/>
            <Route path="ticket/:id" element={<TicketPage />} />
            <Route path="ticket-system" element={<TicketSystem />}/>
            <Route path="tariff-plans" element={<TariffPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="balance" element={<UserBalance />} />
          </Route> 
          <Route path="/admin" element={<AdminSidebar />}>
            <Route path="users" element={<AdminUsers />}/>
            <Route path="users/:id" element={<AdminUsersChange />}/>
            <Route path="statistic" element={<AdminStatistic />}/>
            <Route path="tariff-plans" element={<AdminTariffPlans />}/>
            <Route path="tariff-plans/:id" element={<AdminTariffChange />}/>
            <Route path="social-networks" element={<AdminSocialNetworks />}/>
            <Route path="social-networks/:id" element={<AdminSocialNetworkChange />}/>
            <Route path="contacts" element={<AdminContacts />}/>
            <Route path="contacts/:id" element={<AdminContactChange />}/>
            <Route path="reviews" element={<AdminReviews />}/>
            <Route path="reviews/:id" element={<AdminReviewChange />}/>
            <Route path="mailing/" element={<AdminMailingPage />}/>
            <Route path="blocked" element={<BlockedUsers />}/>
            <Route path="ticket-system" element={<AdminTicketSystem />}/>
            <Route path="ticket/:id" element={<AdminTicketAnswerPage />}/>
            <Route path="payment-settings" element={<PaymentSettings />}/>
            <Route path="referral-system" element={<AdminReferralSystem />}/>
            <Route path="report-history" element={<AdminStatistic />}/>
            <Route path="design" element={<AdminStatistic />}/>
          </Route>
          <Route path='*' element={<NotFoundError />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
