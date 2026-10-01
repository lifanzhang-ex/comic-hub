import { createRouter,createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes =[
    {
        path:"/",
        name:"home",
        component:Home
    },
    {
        path:"/Comic",
        name:"comic",
        component:()=>import("@/views/Comic/Comic.vue") //这是异步加载，不会在顶部全部加载，优化加载，首页以外建议全部异步引入
    },
    {
        path:"/ComicDetail/:workCode",
        name:"comicDetail",
        component:()=>import("@/views/Comic/ComicDetail.vue")
    },
    {
        path:"/ComicPage/:contentCode",
        name:"comicPage",
        component:()=>import("@/views/Comic/ComicPage.vue")
    }
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;