<template>
  <div>Nav Component</div>
  <button @click="logOut">Log Out</button>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "../stores/user";
//constant to save a variable that will hold the use router method
const userStore = useUserStore();
// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();
const logOut = async () => {
  try {
    await userStore.signOut();
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
