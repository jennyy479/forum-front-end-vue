<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },

  //async
  methods: {
    async handleSubmit() {
      if (!this.email || !this.password) {
        Toast.fire({
          icon: "warning",
          title: "請填入帳號密碼",
        });
      }
      (this.isProcessing = true),
        // 向後端驗證使用者資料
        authorizationAPI;
      try {
        const { data } = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });

        
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        console.log("token", data.token)
        console.log('data', data)
        localStorage.setItem("token", data.token);
        
        this.$store.commit('setCurrentUser', data.user)
        
        this.$router.push("/restaurants");
      } catch (error) {
        this.password = "";
        Toast.fire({
          icon: "warning",
          title: "輸入訊息有誤",
        });
        this.isProcessing = false;
        console.log("error", error);
      }
    },
  },
};

//promise
// methods: {
//   handleSubmit() {
//     if (!this.email || !this.password) {
//       Toast.fire({
//         icon: "warning",
//         title: "請填入帳號密碼",
//       });
//       return;
//     }
//     (this.isProcessing = true),
//       // 向後端驗證使用者資料
//       authorizationAPI
//         .signIn({
//           email: this.email,
//           password: this.password,
//         })
//         .then((response) => {
//           const { data } = response;
//           if (data.status !== "success") {
//             throw new Error(data.message);
//           }
//           localStorage.setItem("token", data.token);

//           this.$router.push("/restaurants");
//         })
//         .catch((error) => {
//           this.password = "";
//           Toast.fire({
//             icon: "warning",
//             title: "輸入訊息有誤",
//           });
//           this.isProcessing = false;
//           console.log("error", error);
//         });
//   },
// },
</script>