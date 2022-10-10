<template>
  <div class="header">
    <div class="start">
      <img class="logoImg" src="/img/corona.jpeg" alt="corona" />
      <div class="loginText">Start from today</div>
    </div>

    <!-- <PersonalRouter :route="route" :buttonText="buttonText" /> -->

    <form @submit.prevent="signUp">
      <div class="email">
        <label class="" for="">Email </label>
        <input
          class="placeholder"
          type="email"
          placeholder="Enter your email here"
          v-model="email"
          id="email"
        />
      </div>
      <div class="email">
        <label class="" for="">Password </label>
        <input
          class="placeholder"
          type="password"
          placeholder="************"
          v-model="password"
          id="password"
        />
      </div>
      <div class="email">
        <label for="">Confirm Password </label>
        <input
          class="placeholder"
          type="password"
          placeholder="************"
          v-model="confirmPassword"
          id="confirmPassword"
        />
      </div>
      <button class="signInButton" type="submit">Sign Up</button>
      <p class="">
        <span class="textDont">Have an account? </span>
        <PersonalRouter :route="route" :buttonText="buttonText" />
      </p>
    </form>
  </div>

  <div>
    <img class="escritorioImg" src="/img/iStock-869283118.jpg" alt="" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";
// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
// Error Message
// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    //comprueba que "password" sea = a "confirm password"
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Abyssinica+SIL&family=Source+Sans+Pro&display=swap");
* {
  font-family: "Abyssinica SIL", serif;
}

.start {
  display: flex;
  flex-direction: column;
}

.email {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

.logoImg {
  height: 100px;
  width: 100px;
  margin-top: 100px;
  margin-left: 180px;
}

.loginText {
  font-size: 45px;
  margin-left: 35px;
  margin-right: 40px;

  margin-bottom: 15px;
}

.placeholder {
  width: 425px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 2px 4px #57699a;
  border: 0;
  padding: 10px 10px 10px 10px;
  margin-top: 10px;
  border-radius: 10px;
}

.signInButton {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 500px;
  width: 448px;
  background-color: #57699a;
  color: white;
  border: 0px;
  border-radius: 10px;
  padding: 10px 0px 10px 0;
  font-size: 15px;
  cursor: pointer;
}

.escritorioImg {
  position: fixed;
  width: 50%;
  height: 100%;
  right: 0;
  top: 0;
}

.header {
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
}
.textDont {
  margin-left: 80px;
  opacity: 0.6;
}
</style>
