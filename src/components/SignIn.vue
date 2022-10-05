<template>
  <div class="header">
    <div class>
      <div class="start">
        <img class="logoImg" src="/img/corona.jpeg" alt="corona" />
        <div class="loginText">Log in to TasKING</div>
        <p>Wether you are organizing 5 to 500 tasks, we've got you.</p>
      </div>

      <!-- <PersonalRouter :route="route" :buttonText="buttonText" /> -->

      <p v-if="errorMsg" class="">
        {{ errorMsg }}
      </p>
      <form @submit.prevent="signIn">
        <div class="email">
          <label class="" for="">Email</label>
          <input
            class="placeholder"
            type="email"
            placeholder="Enter your email here"
            v-model="email"
            id="email"
          />
        </div>
        <div class="mb-4">
          <label class="" for="">Password</label>

          <div class="">
            <input
              class="placeholder"
              :type="passwordFieldType"
              onpaste="return false"
              placeholder="************"
              v-model="password"
              id="password"
            />
            <span class="">
              <EyeIcon
                :class="[passwordFieldIcon]"
                @click.prevent="hidePassword = !hidePassword"
              />
            </span>
          </div>
        </div>

        <button class="signInButton" type="submit">Sign In</button>
        <p class="">
          <span class="">Don’t have an account? </span>

          <PersonalRouter :route="route" :buttonText="buttonText" />
        </p>
      </form>
    </div>
    <div>
      <img class="escritorioImg" src="/img/escritorio.jpg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Sign Up ";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables, es el ojo que nos permite ver la contraseña y que no salgan *****
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView,
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value); //
    // redirects user to the homeView
    redirect.push({ path: "/" }); // nos lleva al home si es correcto
  } catch (error) {
    // si es error nos muestra un mensaje de error por parte de Supabase por 5 segundos y despues lo oculta.
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Abyssinica+SIL&family=Source+Sans+Pro&display=swap");
* {
  font-family: "Abyssinica SIL", serif;
}

.start {
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-content: center;
}

.email {
  display: flex;
  flex-direction: column;
}

.logoImg {
  height: 100px;
  width: 100px;
  margin-bottom: 0%;
  margin-top: 100px;
}

.loginText {
  font-size: 40px;
  margin-top: 0px;
  margin-bottom: 50px;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}

.placeholder {
  width: 225px;
  margin-bottom: 20px;
}

.signInButton {
  margin-top: 10px;
  width: 230px;
  background-color: rgba(12, 0, 147, 0.661);
  color: white;
  border: 0px;
  border-radius: 10px;
  padding: 10px 0px 10px 0;
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
  margin-left: 0px;
}
</style>
