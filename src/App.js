import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./App.css";
import Loader from "./components/Loader";
import ProfileCard from "./components/ProfileCard";

const SignUp = lazy(() => delayLoad(import("./pages/SignUp")));
const OnBoarding = lazy(() => delayLoad(import("./pages/OnBoarding")));
const Header = lazy(() => import("./components/Header"));
const Dashboard = lazy(() => delayLoad(import("./pages/Dashboard")));
const ChatContainer = lazy(() => import("./components/ChatContainer"));

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  return (
    <div className="app">
      <Router>
        <Suspense fallback={<Loader />}>
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
function delayLoad(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  }).then(() => promise);
}
export default App;
