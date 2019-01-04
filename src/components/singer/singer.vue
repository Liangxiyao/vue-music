<template>
  <div class="singer">
     <listview :data="singers"></listview>
     <router-view></router-view>
  </div>
</template>
<script>
import Listview from 'base/listview/listview'
import { getSingerList } from "api/singer"
import { ERR_OK } from "api/config"
import Singer from 'common/js/singer'


export default {
  components:{
    Listview
  },
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)  
        }
      })
    },
    _normalizeSinger(list){
      let map = {
         hot:{
            title:'热门',
            items:[]
         }
      }
      list.forEach((item,index) => {
         if(index < 10){  //热门取前十条
         map.hot.items.push(new Singer({
            mid:item.Fsinger_mid,
            name:item.Fsinger_name,
         }))
         }
      const key = item.Findex
      if(!map[key]){
         map[key] = {
            title: key,
            items:[]
         }
      }
      map[key].items.push(new Singer({
         mid:item.Fsinger_mid,
         name:item.Fsinger_name
         }))
      })
      //对象的遍历是无序的，为了得到有序列表，需要处理map
      let hot = []
      let ret = []
      for(let key in map){
         let val = map[key]
         if(val.title.match(/[a-zA-Z]/)){
            ret.push(val)
         }else if(val.title === '热门'){
            hot.push(val)
         }
      }
      ret.sort((a,b)=>{
         return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>