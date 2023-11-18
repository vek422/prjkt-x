import { API_BASE_URL } from "../config/serviceApiConfig";
import { updateUser } from "../features/auth/authSlice";
const refreshUser = async (token, user, dispatch) => {
  console.log("im running from refreshUser");
  const req = await fetch(`${API_BASE_URL}/refreshUser?userId=${user._id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(req.status);
  if (req.status === 200) {
    const newUser = await req.json();
    console.log(newUser);
    dispatch(updateUser({ newUser: newUser }));
    console.log("updated user");
    return;
  }

  console.log("unable to refresh user");
};

export default refreshUser;
