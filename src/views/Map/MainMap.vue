<template>
    <sideNav :isMapsActive="true" />
    <div class="tab-wrapper">
      <Tab :tabs="tabs" @clicked= "changeNavigation" />
    </div>
    <div class="content">
      <component :is="selectedComponent" />
    </div>

  </template>
  
  <script >
    import Tab from '@/components/tab/Tab.vue';
    import sideNav from '@/components/navigation/sideNav.vue'
    import RealtimeMap from '@/views/Map/RealtimeMap.vue'
    import HeatMap from '@/views/Map/HeatMap.vue'
    import { onMounted, ref} from 'vue'

    export default {
      components:{
        RealtimeMap,
        HeatMap,
        Tab,
        sideNav
    },

    setup() {
      const selectedComponent = ref('RealtimeMap')
      const tabs = [
        {
          title: 'Crowd Zone',
          value: 'HeatMap'
        },        
        {
          title: 'Realtime Tracking',
          value: 'RealtimeMap'
        },
        {
          title: 'Route Tracking',
          value: 'HeatMap'
        }
      ]
 
      function changeNavigation(navigation) {
        var subNavs = document.getElementsByClassName("nav")
        console.log(subNavs)
        for (var i of subNavs) {
          i.classList.remove("active");
        }
        console.log(navigation)
        event.target.className += " active"
        selectedComponent.value = navigation
      }

      onMounted(async() => {
        var element = document.getElementById("Realtime Tracking");
        element.classList.add("active");
      })
      
      return {
        selectedComponent, changeNavigation, tabs
      }
    }
  }

  </script>
  
  <style scoped>
.tab-wrapper{
  @apply
    absolute left-[80px] bottom-[20px] w-fit z-50
}
.content {
  @apply w-full h-screen ml-[60px] mt-[80px]
} 

  </style>