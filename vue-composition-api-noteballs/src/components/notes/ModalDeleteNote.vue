<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="ModalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>

      <footer class="modal-card-foot is-justify-content-end">
        <button @click="closeModal" class="button">Cancel</button>
        <button @click="deleteNote" class="button is-danger">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
/*
 imports
*/
import { onClickOutside } from "@vueuse/core";
import { onMounted, onUnmounted, ref } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";

/*
 props
*/
const props = defineProps({
  modelValue: {
    Boolean,
    default: false,
  },
  noteId: {
    type: String,
    required: true,
  },
});

/*
 emits
*/

const emit = defineEmits(["update:modelValue"]);

/*
 close modal
*/

const closeModal = () => {
  emit("update:modelValue", false);
};

/*
 click outside to close
*/

const ModalCardRef = ref(null);
onClickOutside(ModalCardRef, closeModal);

/*
 keyboard control
*/
const handleKeyboard = (e) => {
  if (e.key === "Escape") closeModal();
};

onMounted(() => document.addEventListener("keyup", handleKeyboard));
onUnmounted(() => document.removeEventListener("keyup", handleKeyboard));

/*
 delete note
*/
const store = useStoreNotes();
const deleteNote = () => {
  store.deleteNote(props.noteId);
};
</script>
