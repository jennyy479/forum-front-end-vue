<template>
  <div class="container py-5">
    <Spinner v-if="isLoading"/>
    <template v-else>
      <h1>餐廳描述頁</h1>
      <!-- 餐廳資訊頁 RestaurantDetail -->
      <RestaurantDetail :key="restaurant.id" :initial-restaurant="restaurant" />
      <hr />
      <!-- 餐廳評論 RestaurantComments -->
      <RestaurantComments :restaurant-comments="restaurantComments" @after-delete-comment="afterDeleteComment" />
      <!-- 新增評論 CreateComment -->
      <CreateComment :restaurant-id="restaurant.id" @after-create-comment="afterCreateComment" />
    </template>
  </div>
</template>


<script>
import RestaurantDetail from "../components/RestaurantDetail.vue";
import RestaurantComments from "../components/RestaurantComments.vue";
import CreateComment from "../components/CreateComment.vue";
import restaurantsApi from "./../apis/restaurants";
import Spinner from "./../components/Spinner";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";


export default {
  name: "Restaurant",
  components: { RestaurantDetail, RestaurantComments, CreateComment, Spinner },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        isFavorited: false,
        isLiked: false,
      },
      isLoading: true,
      restaurantComments: [],
    };
  },

  computed: {
    ...mapState(['currentUser'])
  },

  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },

  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },

  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true
        const { data } = await restaurantsApi.getRestaurant({ restaurantId })
        const { restaurant, isFavorited, isLiked } = data;
        const {
          id,
          name,
          Category,
          image,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments,
        } = restaurant;
        console.log("fetchrestaurant id", restaurantId);
        (this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : "未分類",
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        }),
          (this.restaurantComments = Comments);
        this.isLoading = false
      }
      catch(error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法載入餐廳，請稍後再試'
        })
      }
    },

    afterDeleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },

    async afterCreateComment(payload) {
      try {
        const { data } = await restaurantsApi.createComments()
        if ( data.status !== 'success' ) {
        throw new Error( data.message )
      } 
        const { commentId, restaurantId, text } = payload;
        this.restaurantComments.push({
          id: commentId,
          RestaurantId: restaurantId,
          User: {
            id: this.currentUser.id,
            name: this.currentUser.name,
          },
          text,
          createdAt: new Date(),
        });
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法新增餐廳評論，請稍後再試'
        })
      }
    },
  },
};
</script>
