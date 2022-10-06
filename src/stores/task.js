import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", () => {
  const taskes = ref([]);

  async function fetchTasks() {
    // funcion que se encarga de llamar a las tareas por parte del usuario
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false }); // le cambio a true para que las muestre por orden
    taskes.value = tasks;
    return tasks;
  }
  // New code
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
  return { taskes, fetchTasks, addTask };
});
