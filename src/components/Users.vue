<template>
  <div class="text-center">
      <a href="#">
        <img :src="user.image" width="140px" height="140px" />
      </a>
      <h2>{{ user.name }}</h2>
      <span class="badge badge-secondary">
        追蹤人數: {{ user.FollowerCount }}</span>
      <p class="mt-3">
        <button v-if="user.isFollowed" type="button" class="btn btn-danger"
          @click.stop.prevent="deleteFollowed(user.id)">
          取消追蹤
        </button>
        <button v-else type="button" class="btn btn-primary" @click.stop.prevent="addFollowed(user.id)">
          追蹤
        </button>
      </p>
  </div>
</template>
<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
    };
  },

  methods: {
    async addFollowed(userId) {
      try {
        const { data } = await usersAPI.addFollowed({ userId })

        console.log('data', data)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.user = {
          ...this.user,
          FollowerCount: this.user.FollowerCount + 1 ,
          isFollowed: true,
        };
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },

    async deleteFollowed(userId) {
      try {
        const { data } = await usersAPI.deleteFollowed({ userId })

        if (data.status !== 'success') {
          throw new Error (data.message)
        }
        this.user = {
          ...this.user,
          FollowerCount: this.user.FollowerCount - 1,
          isFollowed: false,
        };
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法移除追蹤，請稍後再試'
        })
      }
    },
  },
};
</script>

