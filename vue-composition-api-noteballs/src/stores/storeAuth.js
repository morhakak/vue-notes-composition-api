import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/js/firebase.js";
import { useStoreNotes } from "./storeNotes";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push("/");
          storeNotes.init();
          console.log("user logged in", user);
        } else {
          this.user = {};
          this.router.replace("/auth");
          storeNotes.clearNotes();
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          //   console.log("user: ", user);
        })
        .catch((error) => {
          //   console.log("error message: ", error.message);
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          //   console.log("user: ", user);
        })
        .catch((error) => {
          //   console.log("error message: ", error);
          //   console.log("error code: ", error.code);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          //   console.log("user sign out");
        })
        .catch((error) => {
          //   console.log("error: ", error);
        });
    },
  },
});