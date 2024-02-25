<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ note.date }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
        :to="`/editNote/${note.id}`"
        @click.prevent=""
        class="card-footer-item"
        >Edit</RouterLink
      >
      <a
        href="#"
        @click.prevent="modals.deleteNote = true"
        class="card-footer-item"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
/*
 imports
*/

import { computed, reactive } from "vue";
import { useStoreNotes } from "../../stores/storeNotes.js";
import ModalDeleteNote from "../notes/ModalDeleteNote.vue";

/*
 store
*/
const storeNotes = useStoreNotes();

/*
 props
*/
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

/*
 character length
*/
const characterLength = computed(() => {
  let length = props.note.content.length;

  let description = length > 1 ? "characters" : "character";
  return `${length} ${description}`;
});

/*
 modals
*/
const modals = reactive({
  deleteNote: false,
});
</script>

<style scoped></style>
