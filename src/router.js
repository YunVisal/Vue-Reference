import { createRouter, createWebHistory } from "vue-router";

import CoachesList from './pages/coach/CoachesList.vue'
import CoachDetail from './pages/coach/CoachDetail.vue'
import CoachContact from './pages/request/CoachContact.vue'
import RegisterForm from './pages/coach/RegisterForm.vue'
import RequestList from './pages/request/RequestList.vue'
import NotFound from './pages/404NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        { path: '/coaches/:id', 
            component: CoachDetail, 
            children: [
                { path: 'contact', component: CoachContact }
            ],
            props: true 
        },
        { path: '/register', component: RegisterForm },
        { path: '/requests', component: RequestList },
        { path: '/notFound(.*)', component: NotFound }
    ]
})

export default router;