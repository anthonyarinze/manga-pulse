import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashoard from "./pages/Dashoard";
import Library from "./pages/Library";
import Account from "./pages/Account";
import Details from "./pages/Details";
import RecentSearch from "./pages/RecentSearch";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashoard />} />
            <Route path="library" element={<Library />} />
            <Route path="library:libraryId" element={<Details />} />
            <Route path="recent" element={<RecentSearch />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
