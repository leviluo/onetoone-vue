<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="~public/logo.png" alt="logo">
        </router-link>
        <router-link to="/location">位置:</router-link>
        <router-link class="pull-right" to="/membercenter">个人</router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
//import vue from 'vue'
//require('font-awesome-webpack')

//import Location from './components/Location.vue'

function fetchUser (store) {
  return store.dispatch('FETCH_USER', {
    id: store.state.route.params.id
  })
}

export default {
  name: 'App',
  preFetch: fetchUser,
  beforeMount () {
    fetchUser(this.$store)
  }
  //components:  { Location }
}
</script>

<style lang="stylus">
body
  font-family "Hiragino Sans GB","Microsoft Yahei",SimSun,Arial,"Helvetica Neue",Helvetica
  font-size 15px
  background-color lighten(#eceef1, 30%)
  margin 0
  padding-top 55px
  color #34495e
  overflow-y scroll

a
  color #34495e
  text-decoration none
.header
  background-color #f0f8ff
  border-bottom 1px solid #e5e5e5
  position fixed
  z-index 999
  height 50px
  top 0
  left 0
  right 0
  .inner
    box-sizing border-box
    margin 0px auto
    padding 10px
  .pull-right
    float right
  a
    color #37a
    text-decoration: none;
    cursor: pointer
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    &:hover
      color #fff
    &.router-link-active
      color #37a
      font-weight 400
    &:nth-child(6)
      margin-right 0
    
  .github
    color #fff
    font-size .9em
    margin 0
    float right

.logo
  height 30px
  margin-right 10px
  display inline-block
  vertical-align middle

.view
  max-width 800px
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 600px)
  body
    font-size 14px
</style>
