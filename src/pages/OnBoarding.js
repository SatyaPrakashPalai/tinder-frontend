import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./on-boarding.module.css";
import Navbar from "../components/Navbar";

function OnBoarding() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: null,
    dob_month: null,
    dob_year: null,
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    about: "",
    url: "",
    matches: [],
    friend_requests: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submiited");
    try {
      const response = await axios.put(
        "https://tinder-server.vercel.app/users",
        {
          formData,
        }
      );
      console.log(response);

      const success = response.status === 200;
      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 500); // Adjust the delay as needed
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    // console.log("e", e);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    // console.log(value);
    const name = e.target.name;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <>
      <Navbar minimal={true} />
      <div className={styles["onboarding"]}>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="First_naem">First Name</label>

            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className={styles["multiple-input-container"]}>
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label>Gender</label>
            <div className={styles["multiple-input-container"]}>
              <input
                id="man_gender_identity"
                type="radio"
                name="gender_identity"
                required={true}
                value={"man"}
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man_gender_identity">Man</label>
              <input
                id="woman_gender_identity"
                type="radio"
                name="gender_identity"
                required={true}
                value={"woman"}
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman_gender_identity">Woman</label>
              <input
                id="other_gender_identity"
                type="radio"
                name="gender_identity"
                required={true}
                value={"other"}
                onChange={handleChange}
                checked={formData.gender_identity === "other"}
              />
              <label htmlFor="other_gender_identity">Other</label>
            </div>
            <label htmlFor="show_gender">Show gender on my profile</label>
            <input
              id="show_gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />
            <label>Show Me</label>
            <div className={styles["multiple-input-container"]}>
              <input
                id="man_gender_interest"
                type="radio"
                name="gender_interest"
                required={true}
                value={"man"}
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man_gender_interest">Man</label>
              <input
                id="woman_gender_interest"
                type="radio"
                name="gender_interest"
                required={true}
                value={"woman"}
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman_gender_interest">Woman</label>
              <input
                id="everyone_gender_interest"
                type="radio"
                name="gender_interest"
                required={true}
                value={"everyone"}
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone_gender_interest">Everyone</label>
            </div>
            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>
          <section>
            <label htmlFor="url">Profile </label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className={styles["photo-container"]}>
              {formData.url && (
                <img
                  style={{ width: "100%" }}
                  src={formData.url}
                  alt="profile pic preview"
                />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
}

export default OnBoarding;
