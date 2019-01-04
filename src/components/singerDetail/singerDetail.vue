<template>
  <div class="singerDetail">

  </div>
</template>
<script>
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'

export default {
  props:{
    data:{
      type:Object,
      default:null
    }
  },
  data(){
    return{
      songs:[]
    }
  },
  methods:{
    _getSingerDetail(){
      if(!this.singer.id){
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res)=>{
        if(res.code === ERR_OK){
         
        }
      })
    }
  }
}
</script>

