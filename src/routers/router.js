import { createWebHistory, createRouter } from "vue-router";
import FirstStep from '@/components/firstStep.vue'
import SecondStep from '@/components/secondStep.vue'
import FinalStep from '@/components/finalStep.vue'
import InfoPage from '@/components/infoPage.vue'

const routes = [
    {
        path: "/",
        name: "FirstStep",
        component: FirstStep,
    },
    {
        path: "/secondStep",
        name: "SecondStep", 
        component: SecondStep,
    },
    {
        path: "/finalStep",
        name: "FinalStep", 
        component: FinalStep,
    },
    {
        path: "/infoPage",
        name: "InfoPage", 
        component: InfoPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;