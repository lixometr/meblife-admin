const Looks = () => import("@/views/looks/looks")
const Look = () => import("@/views/looks/look")

export default {
    path: "looks",
    meta: {
        label: 'Looks'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            component: Looks,
            name: "Looks",

        },
        {
            name: "LookNew",
            path: "new",
            component: Look,
            props: {
                isNew: true
            }
        },
        {
            name: "Look",
            path: ":id",
            component: Look,
        },
    ]
}