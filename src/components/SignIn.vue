<template>
  <div class="header">
    <div class="start">
      <div>
        <img class="logoImg" src="/img/corona.jpeg" alt="corona" />
        <div class="loginText">Log in to tasKing</div>
      </div>
      <p class="wetherText">
        Whether you are organizing 5 to 500 tasks, we got you.
      </p>
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
      <div class="email">
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
        <button class="signInButton" type="submit">Sign In</button>
      </div>

      <p class="">
        <span class="textDont">Don’t have an account? </span>

        <PersonalRouter :route="route" :buttonText="buttonText" />
      </p>
    </form>
  </div>
  <div class="escritorio">
    <img class="escritorioImg" src="/img/escritorio.jpg" alt="Image Sign-In" />
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Abyssinica+SIL&family=Source+Sans+Pro&family=Ubuntu&display=swap");
* {
  font-family: "Ubuntu", sans-serif;
}
@media screen and (max-width: 768px) {
  .escritorio {
    display: none;
  }
  .start img {
    height: 20%;
    width: 20%;
    margin-top: 8%;
    margin-left: 40%;
  }
  .start div div {
    font-size: 200%;
  }
  .email input {
    width: 90%;
  }

  .email button {
    width: 50%;
    margin-left: 25%;
  }
}
.start {
  display: flex;
  flex-direction: column;
}

.email {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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

  margin-bottom: 15px;
}

.wetherText {
  margin-bottom: 60px;
  font-size: 18px;
  opacity: 0.7;
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
  width: 30%;
  margin-bottom: 20px;
  box-shadow: 2px 2px 2px 4px #57699a;
  border: 0;
  padding: 10px 10px 10px 10px;
  margin-top: 10px;
  border-radius: 10px;
}

.signInButton {
  margin-top: 25px;
  margin-bottom: 20px;
  width: 32%;
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
  margin-right: 10vw;
  margin-left: 10vw;
}
.textDont {
  margin-left: 5%;
  opacity: 0.6;
}
</style>
