<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="~public/logo.png" alt="logo">
        </router-link>
        <router-link to="/location">{{location}}&nbsp;∨</router-link>
        <router-link class="pull-right" to="/membercenter">个人</router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <modal v-bind:option="option" v-show="option.display" @close="option.display = false">
      <div slot="title">测试标题</div>
      <div slot="content">测试内容</div>
    </modal>
  </div>
</template>

<script>
import modal from './components/modal.vue'

function getLocation (store) {
  return store.dispatch('FETCH_LOCATION')
}

export default {
  name: 'App',
  preFetch: getLocation,
  data () {
    return {
       option:{
          display:false
      }
    }
  },
  computed: {
    location () {
      return this.$store.state.location
    }
  },
  beforeMount () {
    getLocation(this.$store)
  },
  components: { modal }
}
</script>

<style lang="sass">
body{
  font-family:"Hiragino Sans GB","Microsoft Yahei",SimSun,Arial,"Helvetica Neue",Helvetica;
  font-size:15px;
  background-color:lighten(#eceef1, 30%);
  margin:0;
  padding-top:55px;
  color:#34495e;
  overflow-y:scroll;
}
.btn-default{
    padding: 0 5px;
    line-height: 35px;
    background: #efefef;
    border-radius: 5px;
    color:#37a; 
    border:none;
    padding:0 10px;
    border:1px solid #ccc;
    &:hover{
        background: #e5e5e5;
        cursor:pointer
    }
}
.pull-right{
  float:right;
}
.pull-left{
  float:left;
}
.header{
  background-color:#f0f8ff;
  border-bottom:1px solid #e5e5e5;
  position:fixed;
  z-index:99;
  height:50px;
  top:0;
  left:0;
  right:0;
  .inner{ 
    box-sizing:border-box;
    margin:0px auto;
    padding:10px;
  }
  .logo{
    height:30px;
    margin-right:10px;
    display:inline-block;
    vertical-align:middle;
  }
  a{
    color:#37a;
    text-decoration: none;
    cursor: pointer;
    display:inline-block;
    vertical-align:middle;
    font-weight:300;
    letter-spacing:.075em;
    &:hover{
      color:#fff;
    }
    &.router-link-active{    
      color:#37a;
      font-weight:400;
    }
    &:nth-child(6){
      margin-right:0;
    }
  }
}

.fade-enter-active, .fade-leave-active{
  transition:all .2s ease
}

.fade-enter, .fade-leave-active{
  opacity:0
}

</style>
