import { Route, Routes, Navigate } from 'react-router-dom';

const AdminRoute = ({ element: Element, isAdmin, ...rest }) => (
  <Route
    {...rest}
    element={isAdmin ? <Element /> : <Navigate to="/login" replace />}
  />
);

const AdminDashboard = () => {
  return <div>Admin Dashboard</div>;
};

const UsersPage = () => {
  return <div>Users Page</div>;
};

const StatisticPage = () => {
  return <div>Statistic Page</div>;
};

const ReferralsPage = () => {
  return <div>Referrals Page</div>;
};

const AdminRoutes = ({ isAdmin }) => {
  return (
    <Routes>
      <AdminRoute path="admin" element={<AdminDashboard />} isAdmin={isAdmin} />
      <AdminRoute path="admin/users" element={<UsersPage />} isAdmin={isAdmin} />
      <AdminRoute path="admin/statistic" element={<StatisticPage />} isAdmin={isAdmin} />
      <AdminRoute path="admin/referrals" element={<ReferralsPage />} isAdmin={isAdmin} />
      {/* Redirect to admin dashboard for unknown routes */}
      <Route path="admin/*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
