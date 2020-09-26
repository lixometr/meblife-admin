
const ModuleGroups = () => import("@/views/moduleGroup/moduleGroups")
const ModuleGroup = () => import("@/views/moduleGroup/moduleGroup")
const ModuleEditor = () => import("@/views/moduleGroup/ModuleEditor")

export default {
    path: "module-groups",
    meta: {
        label: 'ModuleGroups'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            component: ModuleGroups,
            name: "ModuleGroups",
        },
        {
            name: "ModuleGroupNew",
            path: "new",
            component: ModuleGroup,
            props: {
                isNew: true
            }
        },

        {
            path: ":id",
            meta: {
                label: 'ModuleGroup'
            },
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: "",
                    name: "ModuleGroup",
                    component: ModuleGroup,
                },
                {
                    name: "ModuleGroupEditorNew",
                    path: "module/new",
                    component: ModuleEditor,
                    props: {
                        isNew: true
                    }
                },
                {
                    name: "ModuleGroupEditor",
                    path: "module/:module_id",
                    component: ModuleEditor,
                },
            ]
        },
    ]
}