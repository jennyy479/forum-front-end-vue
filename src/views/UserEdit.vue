<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" name="name" class="form-control" placeholder="Enter Name" required>
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img v-if="image" :src="image" class="d-block img-thumbnail mb-3" width="200" height="200">
        <input id="image" type="file" name="image" accept="image/*" class="form-control-file"
          @change="handleFileChange">
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isProcessing">
        {{ isProcessing ? '資料更新中': "Submit"}}
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
        id:0,
        image: "",
        name: "",
        email: "",
        isProcessing: false
    }
  },

  computed: {
    ...mapState(['currentUser'])
  },

  watch: {
    currentUser (user) {
      if(user.id === -1) return
      const { id } = this.$route.params;
      this.setUser(id)
    }
  },

  created() {
    if (this.currentUser.id === -1 ) return
    const { id } = this.$route.params;
    this.setUser(id);
  },

  beforeRouteUpdate(to, from, next) {
    if (this.currentUser.id === -1) return
    const { id } = to.params
    this.setUser(id)
    next()
  },

  methods: {
    async handleSubmit(e){
  
      try {
        if (!this.name) {
        Toast.fire({
          icon: 'warning',
          title: '您尚未填寫姓名'
        })
        return
      }
      console.log('e:', e)
      const form = e.target
      const formData = new FormData(form)
        console.log('formData',formData)
      this.isProcessing = true

      const { data } = await usersAPI.update({
        userId: this.id,
        formData
      })
      console.log('data', data)

      if (data.status === 'error') {
        throw new Error(data.message)
      }
      this.$router.push({ name: 'user', params: { id: this.id } })
    } catch(error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
    }
    },

    setUser (userId) {
      const { id, image, name, email } = this.currentUser
      if(id.toString() !== userId.toString()) {
        this.$router.push({ name: 'not-found' })
        return
      }

      this.id = id
      this.name = name
      this.email = email
      this.image = image
    },

    async handleFileChange(e) {
      console.log('e', e)
      const { files } = e.target;
      console.log("files", files);
      if(files.length === 0) return
        const imageURL = window.URL.createObjectURL(files[0]);
        this.image = imageURL;
      }
    },
  }

</script>
