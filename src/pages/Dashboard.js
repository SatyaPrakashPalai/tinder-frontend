import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import "./TinderCards.css";
import Header from "../components/Header";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import axios from "axios";
import { useCookies } from "react-cookie";

function Dashboard() {
  const [people, setPeople] = useState([]);
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();

  //cookies
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const userId = cookies.UserId;

  useEffect(() => {
    async function getPersons() {
      const peopleCol = collection(db, "people");
      const peopleSnapshot = await getDocs(peopleCol);
      const peopleList = peopleSnapshot.docs.map((doc) => doc.data());
      setPeople(peopleList);
    }

    getPersons();
  }, []);

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

      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getGenderedUsers();
  }, [user]);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("https://tinder-server.vercel.app/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUsers) => !matchedUserIds.includes(genderedUsers.user_id)
  );

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
          <Header />

          <div style={{ display: "flex", height: "100%" }}>
            <ChatContainer user={user} />
            <div style={{ width: "100%" }}>
              {/* <p>you swiped {lastDirection}</p> */}
              <div className="tinder__cardContainer">
                {filteredGenderedUsers?.map((genderedUser) => (
                  <TinderCard
                    className="swipe"
                    key={genderedUser.user_id}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                  >
                    <div
                      style={{ backgroundImage: `url(${genderedUser.url})` }}
                      className="card"
                    >
                      <h3>{genderedUser.first_name}</h3>
                    </div>
                  </TinderCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
