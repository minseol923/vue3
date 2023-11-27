import { createWebHistory, createRouter } from "vue-router";
import FirstStep from '@/components/firstStep.vue'
import SecondStep from '@/components/secondStep.vue'

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;