import { createRouter, createWebHistory } from 'vue-router'

import GatewayConfig from '@/views/Devices/GatewayConfig.vue'
import GatewayDataView from '@/views/Data/GatewayDataView.vue'
import LoginForm from '@/views/Auth/LoginFormNew.vue'
import MainMap from '@/views/Map/MainMap.vue'
import DevicesCategory from '@/views/Devices/DevicesCategory.vue'
import BLEList from '@/views/Devices/DevicesList.vue'
import GateList from '@/views/Devices/Gate/GateList.vue'
import GateDetail from '@/views/Devices/Gate/GateDetail.vue'
import DeviceDetails from '@/views/Devices/DeviceDetails.vue'
import ResetPassword from '@/views/Auth/ResetPassword.vue'
import NotFound from '@/views/error/NotFound.vue'


const routes = [
  { path: '/', name: 'LoginForm', component: LoginForm, meta: { requiresAuth:false, title: 'Intellisense Connect - Login' } },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword, meta: { requiresAuth:false} },
  { path: '/realtime-map', name: 'MainMap', component: MainMap, meta: { requiresAuth:false } },
  { path: '/devices', name: 'DevicesCategory', component: DevicesCategory, meta: { requiresAuth:false } },
  { path: '/devices/ble', name: 'BLEList', component: BLEList, meta: { requiresAuth:false } },
  { path: '/devices/gate', name: 'GateList', component: GateList, meta: { requiresAuth:false } },
  { path: '/devices/gate/details/:id', name: 'GateDetail', component: GateDetail, props: true, meta: { requiresAuth:false } },
  { path: '/devices/device-info/:id', name: 'DeviceDetails', component: DeviceDetails, props: true, meta: { requiresAuth:false } },

  { path: '/data/gateway-data', name: 'GatewayDataView', component: GatewayDataView, meta: { requiresAuth:false } },

]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

// router.beforeEach(async (to, from,  next) => {
//   document.title = 'Intellisense Connect | Connecting Assets'
//   if (to.meta.requiresAuth && !localStorage.getItem('auth.accessToken')){
//     next({ name: 'LoginForm'})
//   } else if (to.meta.requiresAuth && localStorage.getItem('auth.accessToken') || to.meta.freeAccess){
//     next()
//   } else if (!to.meta.requiresAuth && localStorage.getItem('auth.accessToken')){
//     next({name: 'DevicesList'})
//   } else next()
//   }) 

  //loading
// router.beforeEach(async (to, from, next) => {
//   const loadingStore = useLoadingStore()
//   loadingStore.startLoading()

//   // Wait for 500ms to simulate async operation
//   await new Promise(resolve => setTimeout(resolve, 500))

//   loadingStore.stopLoading()
//   next()
// })

export default router