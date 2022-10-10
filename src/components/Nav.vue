<template>
  <div class="navContainer">
    <div class="flex2">
      <img class="coronaImg" src="/img/corona.jpeg" alt="" />
      <div class="title">tasKing</div>
    </div>
    <div class="email">
      <img
        class="icono"
        src="/img/group_FILL0_wght400_GRAD0_opsz48.png"
        alt="icono persona"
      />
      <p>{{ nameEmail }}</p>
      <button @click="logOut" class="logOutButton">Log out</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "../stores/user";

//constant to save a variable that will hold the use router method
const redirect = useRouter();

// constant to save a variable that will get the user from store with a computed function imported from vue
const userStore = useUserStore();
// constant that calls user email from the useUSerStore
const userEmail = ref(userStore.user.email);
// console.log(userStore.user.email);
// constant that saves the user email and cleans out the @client from the user
const arr = userEmail.value.indexOf("@");
const nameEmail = ref(userEmail.value.slice(0, arr));

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.

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
.icono {
  margin-right: 9px;
  height: 35px;
}
.logOutButton {
  margin-top: 25px;
  margin-bottom: 20px;
  margin-right: 40px;
  margin-left: 20px;
  width: 90px;
  background-color: #57699a;
  color: white;
  border: 0px;
  border-radius: 10px;
  padding: 10px 0px 10px 0;
  font-size: 16px;
  cursor: w-resize;
}
.navContainer {
  margin-bottom: 90px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 5px double #57699a;
  background-color: white;
}

.title {
  font-size: 50px;
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
.email {
  display: flex;
  align-items: center;
  cursor: auto;
  color: #57699a;
  font-size: 19px;
}
.welcome {
  color: green;
  margin-right: 10px;
}
</style>
