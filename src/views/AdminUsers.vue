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
            <button v-if="currentUser.id !== user.id" type="button" class="btn btn-link"
              @click.stop.prevent="toggleUserRole({ userId: user.id, isAdmin: user.isAdmin })">
              {{ user.isAdmin ? 'set as user' : 'set as admin' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import adminAPI from "../apis/admin";
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
    this.fetchUsers();
  },

  methods: {
  async fetchUsers() {
    try
      { const { data } = await adminAPI.users.get()

      if (data.status === 'error') {
        throw new Error(data.message)
      }
      console.log(data)
      this.users = data.users
      } catch(error) {
        Toast.fire({
        icon: 'error',
        title: '無法載入會員資料，請稍後再試'
      })
      }
    },

    async toggleUserRole({userId, isAdmin }) {
      try {
        const { data } = await adminAPI.users.update({
          userId,
          isAdmin: (!isAdmin).toString()
        })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        console.log(userId)
        this.users = this.users.map(user => {
          if (user.id === userId) {
            return {
            ...user,
            isAdmin: !isAdmin
            }
          }
          return user
        })
      } catch(error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法更新會員角色，請稍後再試'
        })
      }
     
    },
  }
};

</script>