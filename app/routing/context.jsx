import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "sonner";

const Context = createContext({});

export default Context;

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [darkMode, setDarkMode] = useState(0);

  useEffect(() => {
    if (user == null && localStorage.getItem("accessToken") != null) {
      setUser(jwtDecode(localStorage.getItem("accessToken")!));
    }

    if (
      localStorage.getItem("dark-theme") &&
      localStorage.getItem("dark-theme")?.toString() == "1"
    ) {
      setDarkMode(1);
    } else {
      setDarkMode(0);
    }
  }, []);

  useEffect(() => {
    document.querySelector(".root")?.classList.toggle("dark");
  }, [darkMode]);

  const handleSignUp = async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        router.push("/login");
        toast.success("Successfully signed in ✨");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleDarkMode = () => {
    let m = darkMode;
    setDarkMode(darkMode == 1 ? 0 : 1);
    if (m == 0) {
      localStorage.setItem("dark-theme", "1");
    } else {
      localStorage.setItem("dark-theme", "0");
    }
  };

  const handleLogin = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("accessToken", user.accessToken);
        setUser(jwtDecode(user.accessToken));
        toast.success("Successfully logged in 😄");
        const user1 = auth.currentUser;
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = result.user.accessToken;
        setUser(result.user);
        localStorage.setItem("accessToken", token || "");
        toast.success("Successfully logged in 😄");
        router.push("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const checkIfAuthenticated = () => {
    if (user == null) {
      console.log("user yok");
      router.back();
    }
  };

  const checkIfNotAuthenticated = () => {
    console.log(user);

    if (user != null) {
      console.log("user var");
      router.back();
      return;
    }
  };

  const logout = () => {
    auth.signOut();
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login");
    toast.success("Successfully logged out 🥰");
  };

  let contextData = {
    user: user,
    handleSignUp: handleSignUp,
    handleLogin: handleLogin,
    checkIfAuthenticated: checkIfAuthenticated,
    checkIfNotAuthenticated: checkIfNotAuthenticated,
    logout: logout,
    loginWithGoogle: loginWithGoogle,
    darkMode: darkMode,
    toggleDarkMode: toggleDarkMode,
  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
};
