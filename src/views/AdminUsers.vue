<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th scope="col" width="140">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" user in users" :key="user.id">
          <th scope="row">
            {{ user.id }}
          </th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? "admin": "user" }}</td>
          <td>
            <div v-if="!(currentUser.id === user.id)">
              <button v-if="user.isAdmin" type="button" class="btn btn-link" @click.stop.prevent="setAsUser(user.id)">
                set as user
              </button>
              <button v-else type="button" class="btn btn-link" @click.stop.prevent="setAsAdmin(user.id)">
                set as admin
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import AdminNav from "../components/AdminNav.vue";
import { mapState } from "vuex"

export default {
  name: "AdminUser",

  components: {
    AdminNav,
  },

  data() {
    return {
      users: {
        id: -1,
        name: "",
        email: "",
        isAdmin: false
      }
    }
  },

  computed: {
    ...mapState(['currentUser'])
  },

  created() {
    this.fetchAdminUsers();
  },

  methods: {
  async fetchAdminUsers() {
    try
      { const { data } = await usersAPI.getAdminUsers()
      console.log(data)
      this.users = data.users
      } catch(error) {
        Toast.fire({
        icon: 'error',
        title: '無法載入使用者，請稍後再試'
      })
      }
    },

    toggleUserRole(userId) {
      console.log(userId)
      this.users = this.users.map( user => {
        if (user.id !== userId) return user

        return {
          ...user,
          isAdmin: !user.isAdmin
        }
      })
    },

    setAsUser(userId) {
      this.toggleUserRole(userId)
    },

    setAsAdmin(userId) {
      this.toggleUserRole(userId)
    }
  }
};

</script>