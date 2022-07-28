<template>
  <div id="restaurant-forum">
    <Narbar />
    <main class="mt-5 bg-white"><router-view /></main>
  </div>
</template>

<style scoped>
  main {
    margin-top: 65px !important;
}
</style>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Narbar from "./components/Narbar.vue";
export default {
  components: {
    Narbar,
  },
};
</script>

