import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashoard from "./pages/Dashoard";
import Library from "./pages/Library";
import Account from "./pages/Account";
import RecentSearch from "./pages/RecentSearch";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import Title from "./pages/Title";
import Auth from "./pages/Auth";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="dashboard" element={<Dashoard />} />
            <Route path="library" element={<Library />} />
            <Route path="title/:type/:titleId" element={<Title />} />
            <Route path="recent" element={<RecentSearch />} />
            <Route path="account" element={<Account />} />
          </Route>

          {/* Authentication Route */}
          <Route path="auth/*" element={<Auth />} />

          {/* Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
