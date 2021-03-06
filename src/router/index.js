import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Main from '@/components/Main'
import Discover from '@/components/Discover'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Details from '@/components/Details'
import Genre from '@/components/Genre'
import Playlist from '@/components/Playlist'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    },
    {
      path: '/discover/:type',
      name: 'Genre',
      component: Genre,
      props(route) {
        return {  props: route.params.type }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    },
    {
      path: '/playlist',
      name: 'Playlist',
      component: Playlist
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})
