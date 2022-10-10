import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref([]);

  async function fetchTasks() {
    // funcion que se encarga de llamar a las tareas por parte del usuario
    const { data: supaTasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false }); // le cambio a true para que las muestre por orden
    tasks.value = supaTasks;
    return tasks.value;
  }

  async function addTask(title, description) {
    console.log(useUserStore().user.id); // llama al user.js para apuntar al ID del usuario que le pertecene la tarea.
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
      },
    ]);
  }

  async function deleteTask(id) {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .match({ id: id });
  }

  async function completeTask(id) {
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_complete: !this.is_complete })
      .match({ id: id });
  }
  async function editTask(title, description, id) {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        title: title,
        description: description,
      })
      .match({ id: id });
  }

  return { tasks, fetchTasks, addTask, deleteTask, completeTask, editTask };
});
