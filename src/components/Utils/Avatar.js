import React, { useState } from "react";
import styles from "./avatar.module.css";

function Avatar({ user }) {
  const colors = [
    "azure",
    "aliceblue",
    "antiquewhite",
    "blanchedalmond",
    "cornsilk",
    "beige",
  ];

  const isHexadecimal = /^[0-9a-fA-F]+$/.test(user.user_id);
  const userIdBase10 = isHexadecimal ? parseInt(user.user_id, 16) : 0;
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  const [imageLoadingError, setImageLoadingError] = useState(false);

  const isValidImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const displayAvatarOrImage = async () => {
    if (user?.url) {
      const isValidImage = await isValidImageUrl(user.url);
      setImageLoadingError(!isValidImage);
    }
  };

  useState(() => {
    displayAvatarOrImage();
  }, [user?.url]);

  return (
    <div className={styles["match-card"]}>
      {!imageLoadingError ? (
        <div className={styles["img-container"]}>
          <img
            style={{ width: "100%" }}
            src={user?.url}
            alt={`${user?.first_name} profile`}
          />
        </div>
      ) : (
        <div
          className={styles["text-container"]}
          style={{ backgroundColor: color }}
        >
          <div className={styles["text"]}>{user?.first_name[0]}</div>
        </div>
      )}
      <h3>{user?.first_name}</h3>
    </div>
  );
}

export default Avatar;
