const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("login"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
};
const authData = () => {
  const user = JSON.parse(localStorage.getItem("login"));

  return user;
};
export default authHeader;
export { authData };
