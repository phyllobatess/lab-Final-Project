<template>
  <div class="navContainer">
    <div class="flex2">
      <img class="coronaImg" src="/img/corona.jpeg" alt="" />
      <div>TasKING</div>
    </div>

    <button @click="logOut" class="logOutButton">Log out</button>
  </div>
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

<style scoped>
.logOutButton {
  margin-top: 25px;
  margin-bottom: 20px;
  margin-right: 20px;
  width: 90px;
  background-color: #57699a;
  color: white;
  border: 0px;
  border-radius: 10px;
  padding: 10px 0px 10px 0;
  font-size: 15px;
  cursor: w-resize;
}
.navContainer {
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 3px solid #57699a;
}

.flex2 {
  display: flex;
  align-items: center;
  font-size: 30px;
  padding-bottom: 0px;
}
.coronaImg {
  height: 20%;
  width: 20%;
}
</style>
