<template>
  <div>
    <div class="media">
      <h1 class="addTask">Add a New Task</h1>
    </div>

    <div class="add">
      <div>
        <input
          class="enter"
          v-model="title"
          type="text"
          placeholder="Task name"
        />
      </div>
      <div>
        <input
          class="enter"
          v-model="description"
          type="text"
          placeholder="Task's description"
        />
      </div>

      <div>
        <button class="button-87" role="button" @click.prevent="addNewTask">
          Add
        </button>
      </div>
    </div>
    <div>
      <h3 v-if="errorNoValue">{{ errorMessage }}</h3>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/task.js";
import { ref } from "vue";
import { supabase } from "../supabase";

const useTasks = useTaskStore();
// useTasks.addTask("tittle", "description");

const props = defineProps(["ENTER-PROP-HERE"]);
// constant to save a variable that define the custom event that will be emitted to the homeView
const emit = defineEmits(["emitAddTask"]);
// constant to save a variable that holds the value of the title input field of the new task
let title = ref(""); // pasa a ser el valor que el user introduzca gracias a V-model
// constant to save a variable that holds the value of the description input field of the new task
let description = ref("");
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const errorNoValue = ref(false);
// const constant to save a variable that holds the value of the error message
const errorMessage = ref("");
// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.

function addNewTask() {
  emit("emitAddTask", title.value, description.value);
  title.value = "";
  description.value = "";
}
</script>

<style>
@media screen and (max-width: 768px) {
  .media h1 {
    margin-top: 30%;
  }
}
.addTask {
  color: black;
  margin-top: 40px;
}
.add {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.enter {
  margin: 2px 2px 2px 2px;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
  border: none;
  box-shadow: 10px 10px 10px;
}

.button-87 {
  margin: 10px;
  padding: 15px 30px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  box-shadow: 0px 0px 14px -7px #f09819;
  background-image: linear-gradient(
    45deg,
    #ff512f 0%,
    #f09819 51%,
    #ff512f 100%
  );
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-87:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.button-87:active {
  transform: scale(0.95);
}
</style>
