<template>
  <div class="flex">
    <div class="centro">
      <img class="taskImg" src="/img/descarga.png" alt="task" />

      <p :class="task.is_complete ? 'titulo completed' : 'titulo'">
        {{ task.title }}
      </p>
    </div>
    <!-- Le aplicamos una clase bindeada mediante ternarios, en el caso de que task_is_complete sea true le aplicamos tambien la clase "completed" que tacha el texto -->
    <p :class="task.is_complete ? 'descripcion completed ' : 'descripcion'">
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
        <button v-if="!task.is_complete" class="button" @click="completeTask">
          <!-- ✔️ -->
          <img
            class="arrow"
            src="https://cdn-icons-png.flaticon.com/512/4737/4737461.png"
            alt="edit mano icono"
          />
        </button>
        <button v-if="task.is_complete" class="button" @click="uncompleteTask">
          <img
            class="arrow"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiv_-gNykwSxrkBPQR9T3XqQwLF8b286a5ZQ&usqp=CAU"
            alt="vuelta atras icono"
          />
        </button>
      </div>

      <div>
        <button class="button" v-if="!readyForEdit" @click="changeParams">
          <img
            :class="{ hidebutton: isComplete }"
            class="arrow"
            src="data:image/png;base64,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"
            alt="edit pencil icon"
          />
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
        <button class="button" @click="deleteTask">
          <img
            :class="{ hidebutton: isComplete }"
            class="arrow"
            src="data:image/png;base64,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"
            alt="erase icon"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["task"]);
const emits = defineEmits([
  "deleteChild",
  "completeChild",
  "editChild",
  "uncompleteChild",
]);
const readyForEdit = ref(false);
const newTitle = ref(""); // variables que nos creamos para añadir los nuevos valores de titulo y descripcion al hacer funcion EDIT.
const newDescription = ref("");
const isComplete = ref(props.task.is_complete);

function toggleIsComplete() {
  isComplete.value = !isComplete.value;
}

function deleteTask() {
  emits("deleteChild", props.task.id);
  // console.log("I have been clicked");
}

function completeTask() {
  emits("completeChild", props.task.id);
  toggleIsComplete();
  console.log(isComplete.value);
  // console.log("I have been clicked to chedk complete");
}

function uncompleteTask() {
  emits("uncompleteChild", props.task.id);
  toggleIsComplete();

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
.arrow {
  height: 30px;
}
.hidebutton {
  display: none;
}

.showbutton {
  background-color: red;
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
  color: red;
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
  margin-left: 10px;
}
.titulo {
  font-size: 25px;
  margin-bottom: 2px;
  margin-top: 10px;
  display: flex;
}

.descripcion {
  font-size: 18px;

  margin-bottom: 0px;
  margin-top: 0px;
  margin-left: 10px;
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
  margin-top: 10px;
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
  padding: 2px 20px;
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
  font-size: 14px;
  font-weight: 400;
  outline: none;
  outline: 0;
  padding: 10px 20px;
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
