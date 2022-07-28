<template>
  <div class="container py-5">
    <Spinner v-if="isLoading"/>
    <template v-else>
        <div>
        <h1>{{ restaurant.name }}</h1>
        <span class="badge badge-secondary mt-1 mb-3">
          {{ restaurant.Category ? restaurant.Category.name : "未分類" }}</span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.Comments.length }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </template>
  </div>
</template>

<script>
import restaurantsAPI from "./../apis/restaurants"
import Spinner from "./../components/Spinner"
import { Toast } from "../utils/helpers";


export default {
  components: {
    Spinner
  },

  name: "RestaurantDashboard",
  data() {
    return {
      restaurant: {
        id: -1,
        name:'',
        CategoryName: "",
        commentsLength: 0,
        favoriteUsersLength: 0,
        likedUsersLength: 0,
      },
      isLoading: true
    };
  },

  mounted() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },

  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true
        const { data: {restaurant} } = await restaurantsAPI.getRestaurant({restaurantId})
        // if (data.status !== "success") {
        //   throw new Error(data.message)
        // }
        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryName: restaurant.Category.name,
          commentsLength: restaurant.Comments.length,
          favoriteUsersLength: restaurant.FavoritedUswes.length,
          likedUsersLength: restaurant.likedUsers.length
          };
        console.log("restaurantId", restaurantId);
        this.isLoading = false
      }
      catch(error) {
        this.isLoading = false
        Toast.fire({
          type: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
  },
};
</script>
