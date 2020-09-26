const Inspirations = () => import("@/views/inspiration/inspirations")
const Inspiration = () => import("@/views/inspiration/inspiration")

export default {
    path: "inspirations",
    meta: {
      label: 'Inspirations'
    },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        name: "Inspirations",
        component: Inspirations,

        path: '',
      },
      {
        name: "InspirationNew",
        path: "new",
        component: Inspiration,
        props: {
          isNew: true
        }
      },
      {
        name: "Inspiration",
        path: ":id",
        component: Inspiration,
      },
    ]
  }