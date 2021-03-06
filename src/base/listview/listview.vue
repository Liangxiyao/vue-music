<template>
  <scroll class="listview"  
          ref="listview"
          :probeType="probeType"
          :data="data"  
          :listenScroll= "listenScroll"
          @scroll="scroll">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onshortcutTouchStart" @touchmove.stop.prevent="onshortcutTouchMove">
      <ul>
        <li class="item"  
        v-for="(item,index) in shortcutList" 
        :class="{'current':currentIndex===index}"
        :data-index="index"
        >{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'


const ANCHOR_HEIGHT = 18  //右边导航字母的固定高度

export default {
  created(){
    this.probeType = 3
    this.touch = {} //不在data里定义，是因为data定义的值基本和dom有关
    this.listenScroll = true
    this.listHeight = []
  },
  props: {
    data:{
      type: Array,
      default: [] 
    }
  },
  components:{
    Scroll
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  computed:{
    shortcutList(){
      return this.data.map((group)=>{
        return group.title.substr(0,1)
      })
    }
  },
  methods:{
    onshortcutTouchStart(e){ 
      let anchorIndex = getData(e.target,'index') //获取自定义数据的值      
      this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex],0)
      let firstTouch = e.touches[0] //触摸的第一根手指
      this.touch.y1 = firstTouch.pageY  //获取触摸开始的y值      
      this.touch.anchorIndex =  anchorIndex     
      this._scrollTo(anchorIndex)
    },
    onshortcutTouchMove(e){
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 // 或0表示向下取整，；类似于Math.floor
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    }, 
    scroll(pos){
      this.scrollY = pos.y
    }, 
    _scrollTo(index){
      if(!index && index !==0){ //解决字母导航上下两部分点击触发字母不能高亮的问题
        return
      }
      if(index < 0){  //拖动时，导航字母的边界处理
        index = 0
      }else if(index > this.listHeight.length - 2){
        index = this.listHeight.length - 2
      }
      
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
    },
    _calculateHeight(){
      this.listHeight = []  //存储每个字母下列表的高度
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for(let i =0;i<list.length;i++){
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }    
  },
  watch:{
    data(){
      setTimeout(()=>{
        this._calculateHeight()
      },20)
    },
    scrollY(newY){ 
      const listHeight = this.listHeight
      //滚动到顶部，newY>0
      if(newY>0){
        this.currentIndex = 0
        return
      }
      //中间滚动
      for(let i=0;i<listHeight.length-1;i++){
        let height1 = listHeight[i]
        let height2 = listHeight[i+1]
        if(!height2 || (-newY >= height1 && -newY < height2)){ //对比当前滚动的是第几个
          this.currentIndex = i
          return
        }
      }
      //滚动到底部，且-newY 大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2

    }
  }
  
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>