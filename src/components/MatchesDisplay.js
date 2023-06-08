import React, { useEffect, useState } from "react";
import styles from "./matches-display.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";

function MatchesDisplay({ matches, setClickedUser }) {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const matchedUserIds = matches.map(({ user_id }) => user_id);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const userId = cookies.UserId;

  const getMatches = async () => {
    try {
      const response = await axios.get(
        "https://tinder-server.vercel.app/users",
        {
          params: { userIds: JSON.stringify(matchedUserIds) },
        }
      );
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id === userId)
        .length > 0
  );

  return (
    <div className={styles["matches-display"]}>
      {filteredMatchedProfiles?.map((match, _index) => (
        <div
          key={_index}
          className={styles["match-card"]}
          onClick={() => setClickedUser(match)}
        >
          <div className={styles["img-container"]}>
            <img src={match?.url} alt={match?.first_name + "profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
}

export default MatchesDisplay;
