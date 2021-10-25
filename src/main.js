import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import App from './App.vue'
import AddTodo from "./components/AddTodo"
import EditTodo from "./components/EditTodo"
import Todos from "./components/Todos"

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Todos,name:'home' },
    { path: '/add-todo', component: AddTodo,name:'add-todo' },
    { path: '/edit-todo/:id', component: EditTodo,name:'edit-todo' },
  ]
})

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
