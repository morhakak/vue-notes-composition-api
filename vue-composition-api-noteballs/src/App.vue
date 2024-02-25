<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup>
/*
 imports
*/
import { onMounted } from "vue";
import NavBar from "./components/layout/NavBar.vue";
import { useStoreAuth } from "@/stores/storeAuth.js";

/*
store
*/
const store = useStoreAuth();

/*
 mounted
*/

onMounted(() => {
  store.init();
});
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>
