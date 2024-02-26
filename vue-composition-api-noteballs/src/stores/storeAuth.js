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
        } else {
          this.user = {};
          this.router.replace("/auth");
          storeNotes.clearNotes();
        }
      });
    },
    async registerUser(credentials) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
      } catch (error) {
        console.log(error);
      }
    },
    async loginUser(credentials) {
      try {
        await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
      } catch (error) {
        console.log(error);
      }
    },
    async logoutUser() {
      try {
        await signOut(auth);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
