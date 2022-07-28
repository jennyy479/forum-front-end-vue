<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading"/>
    <template v-else>
      <h1 class="mt-5">人氣餐廳</h1>
      <Top10Restaurant
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </template>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import Top10Restaurant from "./../components/Top10Restaurant.vue";
import restaurantApi from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner"



export default {
  components: {
    NavTabs,
    Top10Restaurant,
    Spinner
  },

  data() {
    return {
      restaurants: {
        id: "",
        name: "",
        image: "",
        viewCounts: "",
        CategoryId: "",
        FavoritedUsers: [],
        isFavorited: false,
        FavoriteCount: 0,
        
      },
      isLoading: true,
    };
  },

  created() {
    this.fetchTopRestaurants();
  },

  methods: {
    async fetchTopRestaurants() {
      try {
        const { data } = await restaurantApi.getTopRestaurants()
        
        console.log('data',data)
        this.restaurants = data.restaurants;
        this.isLoading = false
      } catch(error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法載入餐廳，請稍後再試'
        })
      }
    },
  },
};
</script>