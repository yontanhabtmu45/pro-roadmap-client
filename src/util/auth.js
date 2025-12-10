// function to read the data from the user's localstorage
const api_url = "http://localhost:1010/api";
export const getUserData = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

// function to save the data to the user's localstorage
export const saveUserData = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};
// function to get the auth token from localstorage and decode it
const getAuth = async() => {
    const admin = await JSON.parse(localStorage.getItem("authToken")) ;
    if (admin && admin.admin_token) {
    const decodedToken = await decodeTokenPayLoad(admin.admin_token);
    admin.admin_id = decodedToken.admin_id;
    admin.admin_name = decodedToken.admin_name;

    return admin;
  } else {
    return {};
  } 

}
  

// function to decode the payload from the token
const decodeTokenPayLoad = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export default getAuth ;