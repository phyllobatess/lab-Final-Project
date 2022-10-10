<template>
  <div class="flex">
    <div class="centro">
      <img class="taskImg" src="/img/descarga.png" alt="task" />

      <p class="titulo">{{ task.title }}</p>
    </div>
    <p class="descripcion">{{ task.description }}</p>
    <p>{{ task.is_complete }}</p>
    <div v-if="readyForEdit">
      <input
        v-model="newTitle"
        placeholder="Enter new title"
        type="text"
      /><input
        v-model="newDescription"
        placeholder="Enter new desription"
        type="text"
      />
    </div>
    <div class="buttons">
      <div>
        <button class="button" @click="completeTask">✔️</button>
      </div>

      <div>
        <button class="button" v-if="!readyForEdit" @click="changeParams">
          Edit
        </button>
        <button class="button" v-if="readyForEdit" @click="editTask">
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
const newTitle = ref("");
const newDescription = ref("");

function deleteTask() {
  emits("deleteChild", props.task.id);
  console.log("I have been clicked");
}

// function editTask() {
//   const myValues = {
//     id: props.task.id,
//       newTitle:
//     newDescription:
//   }
//   emits("e;l-nombre-de-tu-emit", myValues)
// }

function completeTask() {
  emits("completeChild", props.task.id);
  console.log("I have been clicked to chedk complete");
}

function editTask() {
  emits("editChild", newTitle.value, newDescription.value, props.task.id);
  readyForEdit.value = false;
  console.log("Prueba edit");
}

function changeParams() {
  readyForEdit.value = true;
}
</script>

<style scoped>
* {
  background-color: white;
}
.button {
  padding: 5px 5px 5px 5px;
  margin-right: 5px;
  cursor: pointer;
  border: none;
  height: 8px;
}

.flex {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1px 1px 20px 20px;
  border-radius: 10px;
  box-shadow: 6px 6px 11px -2px #8d90c4;
}
.centro {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.titulo {
  font-size: 30px;
  margin-bottom: 2px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
}

.descripcion {
  font-size: 20px;
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
</style>

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
