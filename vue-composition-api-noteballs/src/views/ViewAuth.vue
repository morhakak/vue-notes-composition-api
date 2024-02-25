<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ title }}</div>

        <form @submit.prevent="onSubmit">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                v-model="credentials.email"
                class="input"
                type="email"
                placeholder="Email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                v-model="credentials.password"
                class="input"
                type="password"
                placeholder="Password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>

          <div class="field">
            <p class="control">
              <button class="button is-link is-fullwidth">{{ title }}</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
imports
*/
import { computed, ref, reactive } from "vue";
import { useStoreAuth } from "@/stores/storeAuth";

/*
stores
*/
const storeAuth = useStoreAuth();

/*
register / login 
*/
const register = ref(false);

/*
form title
*/
const title = computed(() => {
  return register.value ? "Register" : "Login";
});

/*
credentials
*/

const credentials = reactive({
  email: "",
  password: "",
});

/*
submit
*/
const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert("please enter email and password");
  } else {
    if (register.value) {
      storeAuth.registerUser(credentials);
    } else {
      storeAuth.loginUser(credentials);
    }
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
