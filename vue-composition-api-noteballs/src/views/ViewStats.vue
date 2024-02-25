<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ store.getTotalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{ store.getTotalNumberOfCharacters }}</td>
        </tr>
      </tbody>
    </table>
    <input
      type="text"
      class="input"
      v-model="loveNoteballs"
      placeholder="Do you love noteballs"
      v-autofocus
    />
  </div>
</template>

<script setup>
/*
imports
*/
import { ref } from "vue";
import { vAutofocus } from "@/directives/vAutofocus";
import { useStoreNotes } from "@/stores/storeNotes.js";
import useWatchCharacters from "../use/useWatchCharacters.js";

/*
store
*/
const store = useStoreNotes();

/*
love noteballs
*/
const loveNoteballs = ref("");
useWatchCharacters(loveNoteballs, 50);
</script>
