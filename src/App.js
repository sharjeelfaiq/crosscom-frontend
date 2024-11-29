import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import { useAuth } from './context';

export default function App() {
  const { isAuthenticated } = useAuth();
  function Template() {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    )
  }

  return (
    <Router>
      <Routes>
        <Route element={<Template />}>
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
          <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
            <Route path='/auth' element={<Auth />} />
          </Route>
          <Route path='*' element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}
