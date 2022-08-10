<template>
  <div class="container">
    <div class="UserProfileCard">
      <UserProfileCard :user="user" :is-current-user="currentUser.id === user.id" :initial-is-followed="isFollowed" />
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="UserFollowingsCard">
          <UserFollowingsCard :followings="followings" />
        </div>
        <br />
        <div class="UserFollowersCard">
          <UserFollowersCard :followers="followers" />
        </div>
      </div>
      <div class="col-md-8">
        <div class="UserCommentsCard">
          <UserCommentsCard :comments="comments" />
        </div>
        <br />
        <div class="UserFavoritedRestaurantsCard.vue">
          <UserFavoritedRestaurantsCard />
      </div>
    </div>

  </div>
  </div>
</template>
<script>
import UserProfileCard from '../components/UserProfileCard';
import UserFollowingsCard from '../components/UserFollowingsCard'
import UserFollowersCard from '../components/UserFollowersCard';
import UserCommentsCard from '../components/UserCommentsCard';
import UserFavoritedRestaurantsCard from '../components/UserFavoritedRestaurantsCard';
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex"

export default {
  name: "User",
  components: { UserProfileCard, UserFollowingsCard, UserFollowersCard, UserCommentsCard, UserFavoritedRestaurantsCard },
  data() {
    return {
      user: {
        id: 0,
        image: "",
        name: "",
        email: "",
        commentsLength: 0,
        favoritedRestaurantsLength: 0,
        followersLength: 0,
        followingsLength: 0
      },
      isFollowed: false,
      comments: [],
      favoritedRestaurants: [],
      followers: [],
      followings: []
      }
    },

    computed: {
    ...mapState(['currentUser'])
  },

  

  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },

  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },

  methods: {
    async fetchUser(userId) {
      try{
        const { data } = await usersAPI.get({userId})

     

        const { profile, isFollowed } = data
        const {
          id,  image, name, email, Followings, Followers, Comments, FavoritedRestaurants
        } = profile
        console.log('data',data)
        const commentSet = new Set()
        this.comments = Comments.filter(
          comment => comment.Restaurant && !commentSet.has(comment.Restaurant.id) &&
          commentSet.add(comment.Restaurant.id)
        )
        console.log('id', data.profile.id)
        console.log('name', name)

        this.user = {
          ...this.user,
          id,
          name,
          image,
          email,
          followingsLength: Followings.length,
          followersLength: Followers.length,
          commentsLength: Comments.length,
          favoritedRestaurantsLength: FavoritedRestaurants.length
        }

        this.isFollowed = isFollowed
        this.followings = Followings
        this.followers = Followers
        this.favoritedRestaurants = FavoritedRestaurants

      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    }
  }
  }

</script>
