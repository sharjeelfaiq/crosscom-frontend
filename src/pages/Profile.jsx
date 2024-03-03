import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      !user && navigate("/signup");
      setUser(JSON.parse(user).name);
    } catch (error) {
      console.error("Error in Profile.jsx; useEffect() hook", error);
    }
  }, [navigate, user]);

  return (
    <div className="mx-20 pt-10 pb-28">
      Hello {user}
    </div>
  );
};

export default Profile;
