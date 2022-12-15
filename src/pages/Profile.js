import ProfileAdmin from "../components/Profile/Admin/ProfileAdmin";
import ProfileUser from "../components/Profile/Profile";

const Profile = () => {
  const userJSON = localStorage.getItem("login");
  const user = JSON.parse(userJSON);

  return <> {user.role !== "admin" ? <ProfileUser /> : <ProfileAdmin />}</>;
};
export default Profile