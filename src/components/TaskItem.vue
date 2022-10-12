<template>
  <div class="flex">
    <div class="centro">
      <img class="taskImg" src="/img/descarga.png" alt="task" />

      <p :class="task.is_complete ? 'titulo completed' : 'titulo'">
        {{ task.title }}
      </p>
    </div>

    <p :class="task.is_complete ? 'descripcion completed' : 'descripcion'">
      {{ task.description }}
    </p>
    <!-- <p>{{ task.is_complete }}</p> -->
    <div class="buttonEdit" v-if="readyForEdit">
      <input
        class="button-17"
        role="button"
        v-model="newTitle"
        placeholder="Enter new title"
        type="text"
      /><input
        class="button-17"
        role="button"
        v-model="newDescription"
        placeholder="Enter new description"
        type="text"
      />
    </div>
    <div class="buttons">
      <div>
        <button class="button" @click="completeTask">✔️</button>
      </div>

      <div>
        <button class="button" v-if="!readyForEdit" @click="changeParams">
          ✏️
        </button>
        <button
          class="button-37"
          role="button"
          v-if="readyForEdit"
          @click="editTask"
        >
          Confirm Edit
        </button>
      </div>

      <div>
        <button class="button" @click="deleteTask">❌</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["task"]);
const emits = defineEmits(["deleteChild", "completeChild", "editChild"]);
const readyForEdit = ref(false);
const newTitle = ref(""); // variables que nos creamos para añadir los nuevos valores de titulo y descripcion al hacer funcion EDIT.
const newDescription = ref("");

function deleteTask() {
  emits("deleteChild", props.task.id);
  // console.log("I have been clicked");
}

function completeTask() {
  emits("completeChild", props.task.id);

  // console.log("I have been clicked to chedk complete");
}

function editTask() {
  emits("editChild", newTitle.value, newDescription.value, props.task.id);
  readyForEdit.value = false;
  // console.log("Prueba edit");
}
//Funcion que se utiliza para el boton edit, nos cambia el valor de la variable boolean a true para retornar al punto inial una vez se cambian title y descript.
function changeParams() {
  readyForEdit.value = true;
}
</script>

<style scoped>
* {
  background-color: white;
}

.button {
  padding: 5px 5px 0px 5px;
  margin-right: 5px;
  cursor: pointer;
  border: none;
  height: 8px;
}
.buttonEdit {
  display: flex;
  justify-content: space-evenly;
}

.completed {
  text-decoration: line-through;
}

.flex {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1px 1px 20px 20px;
  border-radius: 20px;
  box-shadow: 15px 10px 11px -2px #b9bbc0;
  margin-bottom: 40px;
}
.centro {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.titulo {
  font-size: 25px;
  margin-bottom: 2px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
}

.descripcion {
  font-size: 18px;

  margin-bottom: 0px;
  margin-top: 0px;
}
.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 0px;
}
.taskImg {
  height: 4%;
  width: 4%;
  margin-top: 10px;
}
.button-17 {
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: auto;
  display: inline-flex;
  fill: currentcolor;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 10px;
  font-weight: 500;
  height: 30px;
  justify-content: center;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: start;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 24%;
  will-change: transform, opacity;
  z-index: 0;
  margin-bottom: 10px;
}

.button-17:hover {
  background: #f6f9fe;
  color: #174ea6;
}

.button-17:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%),
    0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
}

.button-17:focus {
  outline: none;
  border: 2px solid #4285f4;
}

.button-17:not(:disabled) {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}

.button-17:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0 2px 3px 0,
    rgba(60, 64, 67, 0.15) 0 6px 10px 4px;
}

.button-17:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}

.button-17:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, 0.3) 0 4px 4px 0,
    rgba(60, 64, 67, 0.15) 0 8px 12px 6px;
}

.button-17:disabled {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}
.button-37 {
  background-color: #13aa52;
  border: 1px solid #13aa52;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont,
    sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  outline: 0;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-37:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  .button-37 {
    padding: 10px 30px;
  }
}
</style>

<!-- HTML !-->

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
