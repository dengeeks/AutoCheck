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
import AdminPanel from "./pages/AdminPanel/AdminPanel";
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
import './styles/App.css'


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <ToastContainer position='top-center' autoClose={2000} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password/:uid/:token" element={<ChangePassword />} />
          <Route path="/activate/:uid/:token" element={<ActivateUser />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/you-blocked" element={<BlockedUserPage />} />
          <Route path="/admin" element={<AdminPanel />}>
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
            <Route path="referral-system" element={<AdminStatistic />}/>
            <Route path="blocked" element={<AdminStatistic />}/>
            <Route path="ticket-system" element={<AdminStatistic />}/>
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
