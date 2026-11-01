import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import AuthContent from "../components/auth/AuthContent";
import { login as loginUser } from "../utils/authDataService";
import { authActions } from "../store/authSlice";

function LoginScreen() {
  const dispatch = useDispatch();

  async function loginHandler({ login, password }) {
    try {
      const response = await loginUser(login, password);

      dispatch(
        authActions.authenticate({
          login,
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        error.response?.data?.errors?.[0]?.msg ||
        "Something went wrong. Please try again."
      );
    }
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
