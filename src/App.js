import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import OnBoarding from "./pages/OnBoarding";
import Header from "./components/Header";
import { useCookies } from "react-cookie";
import Dashboard from "./pages/Dashboard";
import ChatContainer from "./components/ChatContainer";

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
