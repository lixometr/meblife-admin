const Manufacturer = () => import("@/views/manufacturer/manufacturer")
const Manufacturers = () => import("@/views/manufacturer/manufacturers")

export default  {
    path: "/manufacturers",
    meta: {
      label: 'Manufacturers'
    },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: '',
        name: "Manufacturers",
        component: Manufacturers,

      },
      {
        name: "ManufacturerNew",
        path: "new",
        component: Manufacturer,
        props: {
          isNew: true
        }
      },
      {
        name: "Manufacturer",
        path: ":id",
        component: Manufacturer,
      },
    ]
  }