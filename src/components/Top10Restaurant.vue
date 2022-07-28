<template>
  <div class="card mb-3" style="max-width: 540px; margin: auto">
    <div class="row no-gutters">
      <div class="col-md-4">
        <a href="#">
          <img :src="restaurant.image" class="card-img" />
        </a>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ restaurant.name }}</h5>
          <span class="badge badge-secondary">收藏數：{{ restaurant.viewCounts }}</span>
          <p class="card-text">
            {{ restaurant.description }}
          </p>
          <a href="#" class="btn btn-primary mr-2">Show</a>

          <button v-if="restaurant.isFavorited" type="button" class="btn btn-danger mr-2"
            @click.stop.prevent="deleteFavorited(restaurant.id)">
            移除最愛
          </button>
          <button v-else type="button" class="btn btn-primary" @click.stop.prevent="addFavorited(restaurant.id)">
            加到最愛
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";


export default {

  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },
  methods: {

    async addFavorited( restaurantId ) { 
      try {
      const { data } = await usersAPI.addFavorite({ restaurantId })

      if (data.status !== 'success') {
        throw new Error(data.message)
      }
      this.restaurant = {
        ...this.restaurant,
        FollowerCount: this.restaurant.FollowerCount + 1,
        isFavorited: true,
      };
     } 
    catch(error) {
      console.log('error',error)
      Toast.fire({
        icon: 'error',
        title: '無法加入追蹤，請稍後再試'
      })
    }
    },
    async deleteFavorited( restaurantId ) { 
    try { 
      const { data } = await usersAPI.deleteFavorite({ restaurantId })
      if (data.status !== 'success') {
        throw new Error(data.message)
      }

      this.restaurant = {
        ...this.restaurant,
        FollowerCount: this.restaurant.FollowerCount - 1,
        isFavorited: false,
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





