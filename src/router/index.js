import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Create from '../components/Create'
import Detail from '../components/Detail'
import Edit from '../components/Edit'
import Login from '../components/Login'
import My from '../components/My'
import Register from '../components/Register'
import User from '../components/User'
import store from '../store/index'

Vue.use(Router)
//
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                requireNotLogin: true
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                requireNotLogin: true
            }
        },
        {
            path: '/create',
            name: 'Create',
            component: Create
        },
        {
            path: '/edit',
            name: 'Edit',
            component: Edit,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/detail/:blogId',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/my',
            name: 'My',
            component: My,
            meta: {
                requireLogin: true
            }
        },
        {
            path: '/user/:userId',
            name: 'user',
            component: User
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})







//     ]
// })
//
export default router;