import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'component/recommend/recommend'
import Rank from 'component/rank/rank'
import Singer from 'component/singer/singer'
import Search from 'component/search/search'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path:'/recommend',
      name:'recommend',
      component:Recommend
    },
    {
      path:'/rank',
      name:'rank',
      component:Rank
    },
    {
      path:'/singer',
      name:'singer',
      component:Singer
    },
    {
      path:'/search',
      name:'search',
      component:Search
    } 
  ]
})
