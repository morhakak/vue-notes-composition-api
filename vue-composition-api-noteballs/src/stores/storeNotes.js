import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/js/firebase.js";
import { useStoreAuth } from "@/stores/storeAuth.js";

let notesCollectionRef;
let noteCollectionQuery;
let getNotesSnapshot = null;

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },
  actions: {
    init() {
      const authStore = useStoreAuth();
      notesCollectionRef = collection(db, "users", authStore.user.id, "notes");
      noteCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      this.getNotes();
    },
    async getNotes() {
      this.notesLoaded = false;

      getNotesSnapshot = onSnapshot(
        noteCollectionQuery,
        (querySnapshot) => {
          let notes = [];
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date,
            };
            notes.push(note);
          });
          this.notes = notes;
          this.notesLoaded = true;
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    clearNotes() {
      this.notes = [];
      if (getNotesSnapshot) getNotesSnapshot(); //unsubscribe from any active listener
    },
    async addNote(newNoteContent) {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const currentDate = new Date();
      const userLocalTime = currentDate.toLocaleString("en-US", {
        timeZone: userTimeZone,
        hour12: false,
      });

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date: userLocalTime,
      });
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter((note) => note.id === id)[0].content;
      };
    },

    getTotalNotesCount: (state) => {
      return state.notes.length;
    },

    getTotalNumberOfCharacters: (state) => {
      let count = 0;
      state.notes.forEach((note) => (count += note.content.length));
      return count;
    },
  },
});
