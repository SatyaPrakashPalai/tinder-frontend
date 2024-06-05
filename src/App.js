import {lazy} from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useCookies } from "react-cookie";

const SignUp = lazy(() => {"./pages/SignUp";});
const OnBoarding = lazy(() => {"./pages/OnBoarding";});
const DashBoard = lazy(() => {"./pages/DashBoard";});
const ChatContainer = lazy(() => {"./components/ChatContainer";});

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  return (
    <div className="app">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
