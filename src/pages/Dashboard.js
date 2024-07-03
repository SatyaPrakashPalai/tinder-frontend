import React, { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";
import ProfileCard from "../components/ProfileCard";
import "./TinderCards.css";

function Dashboard() {
  const [queue, setQueue] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [user, setUser] = useState(null);

  // cookies
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://tinder-server.vercel.app/user",
        {
          params: { userId },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get(
        "https://tinder-server.vercel.app/gendered-users",
        {
          params: { gender: user?.gender_interest },
        }
      );
      const genderedUsers = response.data;
      const matchedUserIds = user?.matches
        ?.map(({ user_id }) => user_id)
        .concat(userId);

      const filteredGenderedUsers = genderedUsers.filter(
        (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
      );

      setQueue(filteredGenderedUsers);
      setCurrentProfile(filteredGenderedUsers[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  const addFriend = async (matchedUserId) => {
    try {
      await axios.put("https://tinder-server.vercel.app/addfriend", {
        userId,
        matchedUserId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loved = () => {
    console.log(currentProfile.user_id);
    addFriend(currentProfile.user_id);
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    setCurrentProfile(newQueue[0]);
    if (newQueue.length === 0) {
      getGenderedUsers();
    }
  };

  const notInterested = () => {
    console.log(currentProfile.user_id);
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    setCurrentProfile(newQueue[0]);
    if (newQueue.length === 0) {
      getGenderedUsers();
    }
  };

  return (
    <>
      {user && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Header /> */}

          <div style={{ display: "flex", height: "100%" }}>
            <ChatContainer user={user} getUser={getUser} />
            <div style={{ width: "100%" }}>
              <div className="tinder__cardContainer">
                {currentProfile ? (
                  <ProfileCard
                    className="swipe"
                    key={currentProfile.user_id}
                    url={currentProfile.url}
                    name={currentProfile.first_name}
                    describ={currentProfile.about}
                    loved={loved}
                    notInterested={notInterested}
                  />
                ) : (
                  <div className="no-more-profiles">
                    <h2>Loading more profiles...</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
