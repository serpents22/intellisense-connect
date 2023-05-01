<template>
    <sideNav :isDevicesActive="true" />
    <div class="content">
      <div class="px-8 pt-8 flex justify-between items-start  ">
        <h1 class="title"> Smart Band List </h1>
        <div class="w-fit">
          <Tab :tabs="tabs" @clicked= "changeNavigation" />
        </div>
      </div>
      <component :is="selectedComponent" />
    </div>

  </template>
  
  <script >
    import Tab from '@/components/tab/Tab.vue';
    import sideNav from '@/components/navigation/sideNav.vue'
    import GatewaysList from '@/views/Devices/GatewaysList.vue'
    import NodesList from '@/views/Devices/NodesList..vue'
    import { onMounted, ref} from 'vue'
    import { useLoadingStore } from '@/stores/LoadingStore'
    import { storeToRefs } from 'pinia'
    export default {
      components:{
        GatewaysList,
        NodesList,
        Tab,
        sideNav
    },
 
    setup() {
      const selectedComponent = ref('GatewaysList')
      const tabs = [
        {
          title: 'Gateways',
          value: 'GatewaysList'
        },
        {
          title: 'Nodes',
          value: 'NodesList'
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
        var element = document.getElementById("Gateways");
        element.classList.add("active");
      })
      
      return {
        selectedComponent, changeNavigation, tabs
      }
    }
  }

  </script>
  
  <style scoped>
.content {
  @apply w-full h-fit ml-[60px] mt-[60px]
} 

.title {
  @apply
    text-[28px] font-thin flex justify-start items-center text-[#353535] opacity-80
}

  </style>