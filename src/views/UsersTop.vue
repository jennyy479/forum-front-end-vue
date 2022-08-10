<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">美食達人</h1>
      <hr />
      <div class="row align-center container">
        <Users v-for="user in users" :key="user.id" :initial-user="user" />
      </div>
    </template>
  </div>
</template>


<script>
import Users from "../components/Users.vue";
import NavTabs from "./../components/NavTabs.vue";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner"

export default {
  components: {
    NavTabs,
    Users,
    Spinner
  },
  data() {
    return {
      users: [],
      isLoading: true
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try{


        const { data } = await usersAPI.getTopUser();

        this.users = data.users;
        this.isLoading = false
      } catch(error) {
        this.isLoading = false,
        Toast.fire({
          icon: 'error',
          title: '無法取得美食達人，請稍後再試'
        })
      }
      }
  },
};
</script>