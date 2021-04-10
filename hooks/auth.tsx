import { useState, useEffect, useContext, createContext } from "react";
import Cookies from "js-cookie";
import { User } from "@dtos/user";
import { useRouter } from "next/router";
import firebase, { auth } from "@firebase/firebase";
import api from "@utils/api";
interface AuthContextData {
  user: User;
  signInWithGitHub(): Promise<User | undefined>;
  signInWithGoogle(): Promise<User | undefined>;
  signOut(): Promise<void>;
}

const initialAuthData: AuthContextData = undefined;
const AuthContext = createContext(initialAuthData);

function useProvideAuth(): AuthContextData {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { push } = useRouter();

  const signInWithGitHub = async () => {
    const response = await auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider()
    );

    const currentUser = await handleUser(response.user);

    return currentUser;
  };
  const signInWithGoogle = async () => {
    const response = await auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );

    const currentUser = await handleUser(response.user);

    return currentUser;
  };

  const signOut = async () => {
    return auth.signOut().then(() => {
      handleUser(undefined);
      push("/");
    });
  };

  const handleUser = async (
    rawUser?: firebase.User
  ): Promise<User | undefined> => {
    if (rawUser) {
      const formattedUser = await formatUser(rawUser);
      const { token, ...userWithoutToken } = formattedUser;
      await api.post("users/create", {
        user: userWithoutToken,
      });
      setUser(formattedUser);
      Cookies.set("linktree-auth", "true", { expires: 1 });

      return formattedUser;
    } else {
      Cookies.remove("linktree-auth");
      setUser(undefined);
      return undefined;
    }
  };

  const formatUser = async (user: firebase.User): Promise<User> => {
    const decodedToken = await auth.currentUser.getIdTokenResult(true);
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
      token: await user.getIdToken(),
    };
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: firebase.User) => {
      handleUser(user);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signOut,
    signInWithGitHub,
    signInWithGoogle,
  };
}

export default function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
