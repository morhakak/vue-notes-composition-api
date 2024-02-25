<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      placeholder="Edit note"
      label="Edit Note"
    >
      <template #buttons>
        <button class="button is-link is-light mr-2" @click="$router.back()">
          Cancel
        </button>
        <button
          @click="handleSaveClicked"
          class="button is-link has-background-link"
          :disabled="!noteContent"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
/*
imports
*/
import AddEditNote from "@/components/notes/AddEditNote.vue";
import { ref } from "vue";
import { useStoreNotes } from "@/stores/storeNotes.js";
import { useRoute, useRouter } from "vue-router";

/*
router
*/

const route = useRoute();
const router = useRouter();

/*
store
*/
const store = useStoreNotes();

/*
note
*/
const noteContent = ref("");
noteContent.value = store.getNoteContent(route.params.id);

/*
save clicked
*/
const handleSaveClicked = () => {
  store.updateNote(route.params.id, noteContent.value);
  router.push("/");
};
</script>

<style lang="scss" scoped></style>
