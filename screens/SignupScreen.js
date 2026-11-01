import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import AuthContent from "../components/auth/AuthContent";
import {
  createUser,
  login as loginUser,
} from "../utils/authDataService";
import { authActions } from "../store/authSlice";

function SignupScreen() {
  const dispatch = useDispatch();

  async function signupHandler({ login, password }) {
    try {
      const signupResponse = await createUser(login, password);

      if (signupResponse.status !== 200) {
        Alert.alert(
          "Signup failed",
          signupResponse.data?.errors?.[0]?.msg || "Could not create user."
        );
        return;
      }

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
        "Signup failed",
        error.response?.data?.errors?.[0]?.msg ||
        "Something went wrong. Please try again."
      );
    }
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
