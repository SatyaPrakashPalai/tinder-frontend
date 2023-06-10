import React, { useEffect, useState } from "react";
import styles from "./matches-display.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import Avatar from "./Avatar";

function MatchesDisplay({ matches, setClickedUser }) {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const matchedUserIds = matches?.map(({ user_id }) => user_id);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const userId = cookies.UserId;

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, [matches]);

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
          <Avatar user={match} />
        </div>
      ))}
    </div>
  );
}

export default MatchesDisplay;
