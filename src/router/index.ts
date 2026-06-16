import { createRouter, createWebHashHistory } from "vue-router"

import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import NewsDetail from "../views/NewsDetail.vue"
import CreateNews from "../views/CreateNews.vue"

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "/news/:id", name: "news-detail", component: NewsDetail },
  { path: "/create-news", name: "create-news", component: CreateNews }
]

const router = createRouter({
  history: createWebHashHistory(), 
  routes
})

export default router