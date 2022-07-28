<template>
  <div class="container py-5">
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input v-model="newCategoryName" type="text" class="form-control" placeholder="新增餐廳類別" />
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" @click.stop.prevent="createCategory">
            新增
          </button>
        </div>
      </div>
    </form>
    <Spinner v-if="isLoading" />
    <template v-else>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col" width="60">#</th>
            <th scope="col">Category name</th>
            <th scope="col" width="210">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <th scope="row">{{ category.id }}</th>
            <td class="position-relative">
              <input v-show="category.isEditing" v-model="category.name" type="text" class="form-control">
              <div class="category-name" v-show="!category.isEditing">{{ category.name }} </div>
              <span v-show="category.isEditing" class="cancel" @click="handleCancel(category.id)">✕</span>
            </td>
            <td class="d-flex justify-content-between">
              <button v-show="!category.isEditing" @click.stop.prevent="toggleIsEditing(category.id)"
                @click="edit(category, indexCategory)" type="button" class="btn btn-link mr-2">Edit</button>
              <button v-show="category.isEditing" type="button"
                @click.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
                class="btn btn-link mr-2">Save</button>
              <button type="button" class="btn btn-link mr-2" @click.stop.prevent="deleteCategory(category.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>


</template>

<script>
import AdminNav from "../components/AdminNav.vue";
import { v4 as uuid } from "uuid";
import adminAPI from './../apis/admin'
import Spinner from "./../components/Spinner";
import { Toast } from './../utils/helpers'



export default {
  components: {
    AdminNav,
    Spinner
  },

  data() {
    return {
      newCategoryName: '',
      categories: {
        id: -1,
        name: "",
      },
      isLoading: true,
    };
  },

  created() {
    this.fetchCategories();
  },


  methods: {

    async fetchCategories() {
      try {
        this.isLoading = true
        const { data } = await adminAPI.categories.get()
          this.categories = data.categories;
        this.isLoading = false
        this.categories = data.categories.map(category => ({
          ...category,
          isEditing: false
        })) 
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法載入餐廳類別，請稍後再試'
        })
      }
    },

    async createCategory() {
      try { 
        this.isProcessing = true
        const { data } = await adminAPI.categories.create({
          id: uuid(),
          name: this.newCategoryName
          })
        
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.categories.push({
          id: uuid(),
          name: this.newCategoryName,
          isEditing: false
        });
        this.isProcessing = true
        this.newCategoryName = ''
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法建立餐廳類別，請稍候再試'
        })
      }
      
    },

    async deleteCategory(categoryId) {
      try {
        const { data } = await adminAPI.categories.delete(categoryId)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳類別，請稍候再試'
        })
      }
      
    },

    async updateCategory({ categoryId, name }) {
      try {
        const { data, statusText } = await adminAPI.categories.update({
          categoryId,
          name
        
        })
        if (statusText !== 'OK' || data.status !== 'success') {
          throw new Error(statusText)
        }
        
        this.toggleIsEditing(categoryId)
        } catch(error) {
          Toast.fire({
          type: 'error',
          title: '無法更新餐廳類別，請稍後再試'
        })
        }

    },

    toggleIsEditing(categoryId) {
      this.categories = this.categories.map( category => {
        if (category.id !== categoryId) return category
      

      return {
        ...category,
        nameCached: category.name,
        isEditing: !category.isEditing
      }
      })
    },

    handleCancel(categoryId) {
      this.categories = this.categories.map(category => {
        if(category.id !== categoryId) {
          return category
        }

        return {
          ...category,
          name: category.nameCached
        }
      })
      this.toggleIsEditing(categoryId)
    }
  

  },
};
</script>
