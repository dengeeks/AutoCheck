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
import AdminPanel from "./components/AuthForms/AdminPanel/AdminPanel";
import AdminUsers from "./components/AuthForms/AdminPanel/AdminUsers/AdminUsers";
import AdminStatistic from "./components/AuthForms/AdminPanel/AdminStatistic/AdminStatistic";
import AdminTariffPlans from "./components/AuthForms/AdminPanel/AdminTariffPlans/AdminTariff";
import AdminTariffChange from "./components/AuthForms/AdminPanel/AdminTariffPlans/AdminTariffChange";
import './styles/App.css'
import FeedbackPage from "./pages/FeedbackPage";


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
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/admin" element={<AdminPanel />}>
            <Route path="users" element={<AdminUsers />}/>
            <Route path="statistic" element={<AdminStatistic />}/>
            <Route path="tariff-plans" element={<AdminTariffPlans />}/>
            <Route path="tariff-plans/:id" element={<AdminTariffChange />}/>
            <Route path="referral-system" element={<AdminStatistic />}/>
            <Route path="violators" element={<AdminStatistic />}/>
            <Route path="newsletter" element={<AdminStatistic />}/>
            <Route path="ticket-system" element={<AdminStatistic />}/>
            <Route path="report-history" element={<AdminStatistic />}/>
            <Route path="design" element={<AdminStatistic />}/>
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
