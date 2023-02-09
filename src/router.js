import {createRouter, createWebHistory} from 'vue-router'
import Home from "./components/Home_page.vue";
import Login from "./components/Login.vue";
import Data from "./components/Location.vue";
import Register from "./components/Register.vue";
import FilmDetails from "./components/Film.vue";
import CreateFilm from "./components/Add_Location.vue";
import EditFilm from "./components/Edit_Location.vue";

const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/login', name: "Login", component: Login },
    { path: '/data', name: "Data", component: Data, beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')) {
            next();
        } else {
            next('login');
        }
        }},
    { path: '/register', name: "Register", component: Register },
    { path: '/filmDetails/:filmId', component: FilmDetails },
    { path: '/createFilm', component: CreateFilm },
    { path: '/editFilm/:filmId', component: EditFilm },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;