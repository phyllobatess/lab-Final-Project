<template>
  <router-link :to="route">{{ buttonText }}</router-link>
</template>

<script setup>
defineProps({
  route: String,
  buttonText: String,
});
</script>

<style></style>

// PersonalRouter.vue:   Para no estar trabajando con routerlink todo el rato creamos este componente que le pasa dos parametros: un parametro de props para apuntar a la ruta y le pasamos por defecto  dentro del router link el "buttonText" y desde el SignIn accedemos a el, y desde la route variables se lo bindeamos