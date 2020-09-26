const Widgets = () => import("@/views/widget/widgets")
const Widget = () => import("@/views/widget/widget")
const WidgetMainPage = () => import("@/views/widget/mainPage")
const WidgetTopBar = () => import("@/views/widget/topBar")
export default {
    path: "widgets",
    meta: {
        label: 'Widgets'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            name: "Widgets",
            component: Widgets,
            path: '',
        },


        {
            path: "main_page",
            component: Widget,
            children: [
                {
                    name: "WidgetMainPage",
                    path: "",
                    component: WidgetMainPage,
                },
            ]
        },
        {
            path: "top_bar",
            component: Widget,
            children: [
                {
                    name: "WidgetTopBar",
                    path: "",
                    component: WidgetTopBar,
                },
            ]
        },
    ]
}