
const ProductModels = () => import("@/views/productModel/productModels")
const ProductModel = () => import("@/views/productModel/productModel")
export default {
    path: "product-models",
    meta: {
        label: 'ProductModels'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            component: ProductModels,
            name: "ProductModels",

        },
        {
            name: "ProductModelNew",
            path: "new",
            component: ProductModel,
            props: {
                isNew: true
            }
        },
        {
            name: "ProductModel",
            path: ":id",
            component: ProductModel,
        },
    ]
}