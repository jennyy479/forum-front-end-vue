<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        />
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

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">Sign In</router-link>
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
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },
  
  methods: {
    async handleSubmit() {
      // 向後端驗證使用者資料
      authorizationAPI;
      try {
        const { data } = await authorizationAPI.signUp ({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        }) 
        

        if (data.status !== "success") {
          throw new Error(data.message)
        } else if (data.status == "success") {
          console.log('signin')
          console.log('beforeSigninData', data)
          console.log('beforeSigninData.token', data.token)
          // console.log(
          //   "handleSubmit------------:",
          //   JSON.stringify({
          //     name: this.name,
          //     email: this.email,
          //     password: this.password,
          //     passwordCheck: this.passwordCheck,
          //   })
          // );
    
            try {
              authorizationAPI;
              const { data } = await authorizationAPI.signIn({
                email: this.email,
                password: this.password,
                name: this.name,
              });
            

              if (data.status !== "success") {
                throw new Error(data.message);
              }
              console.log('data', data)
              console.log('data.token',data.token)
             
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
          }
            


        
        
        
        
        console.log(
          "handleSubmit",
          JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            passwordCheck: this.passwordCheck,
          })
        );

      } catch(error) {
        this.password = "";
        Toast.fire({
          icon: "warning",
          title: "輸入訊息有誤",
        });
      }
      
    },
  },
};
</script>
