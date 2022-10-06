<template>
  <div>
    <h2>Add a New Task</h2>
    <div>
      <input v-model="title" type="text" placeholder="Task name" />
      <input
        v-model="description"
        type="text"
        placeholder="Task's description"
      />
      <button @click.prevent="addNewTask">Add</button>
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
}
</script>

<style></style>
