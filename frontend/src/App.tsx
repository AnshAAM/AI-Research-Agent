import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import History from "./pages/History";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          element={<Layout />}
        >

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;