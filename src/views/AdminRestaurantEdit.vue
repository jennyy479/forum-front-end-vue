<template>
  <div class="container py-5">
    <AdminRestaurantForm
      :initial-restaurant="restaurant"
      :is-processing="isProcessing"
      @afterSubmit="handleAfterSubmit"
    />
  </div>
</template>
<script>
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'


import AdminRestaurantForm from "../components/AdminRestaurantForm.vue";

export default {
  components: {
    AdminRestaurantForm,
  },

  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
      isProcessing: false
    };
  },

  created() {
    const { id } = this.$route.params;
    this.fetchRestaurants(id);
  },

  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchRestaurants(id)
    next()
  },

  methods: {
    async fetchRestaurants(restaurantId) { 
      try{
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId })
        
        const { restaurant } = data;
        const {
          id,
          name,
          CategoryId: categoryId,
          tel,
          address,
          opening_hours: openingHours,
          description,
        } = restaurant;

        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          categoryId,
          tel,
          address,
          openingHours,
          description,
        };
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
      
    },

    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData
        })

        if (data.status !== 'success') {
          throw new Error(data.message) 
        }
        
        this.$router.push({ name: 'admin-restaurants' })
      } catch(error) {
        this.isProcessing = false
      }
  
    },
  },
};
</script>
