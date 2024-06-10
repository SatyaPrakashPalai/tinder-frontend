import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./App.css";

const SignUp = lazy(() => import("./pages/SignUp"));
const OnBoarding = lazy(() => import("./pages/OnBoarding"));
const Header = lazy(() => import("./components/Header"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ChatContainer = lazy(() => import("./components/ChatContainer"));

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  return (
    <div className="app">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
            {authToken && <Route path="/" element={<Dashboard />} />}
            {authToken && (
              <Route
                path="/chat"
                element={
                  <>
                    <Header backButton={true} />
                    <ChatContainer />
                  </>
                }
              />
            )}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
