import Vue from 'vue'
import Router from 'vue-router'
import api from "@/plugins/api"
// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const SignUp = () => import('@/views/pages/SignUp')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

// Custom

const Product = () => import("@/views/product/product")
const Products = () => import("@/views/product/products")

const Category = () => import("@/views/category/category")
const Categories = () => import("@/views/category/categories")

const Manufacturer = () => import("@/views/manufacturer/manufacturer")
const Manufacturers = () => import("@/views/manufacturer/manufacturers")

const Attribute = () => import("@/views/attribute/attribute")
const Attributes = () => import("@/views/attribute/attributes")

const Languages = () => import("@/views/language/languages")
const Currencies = () => import("@/views/currency/currencies")

const Settings = () => import("@/views/settings/settings")

const Looks = () => import("@/views/looks/looks")
const Look = () => import("@/views/looks/look")

const Inspirations = () => import("@/views/inspiration/inspirations")
const Inspiration = () => import("@/views/inspiration/inspiration")

const ModuleGroups = () => import("@/views/moduleGroup/moduleGroups")
const ModuleGroup = () => import("@/views/moduleGroup/moduleGroup")
const ModuleEditor = () => import("@/views/moduleGroup/ModuleEditor")


const Pages = () => import("@/views/page/pages")
const Page = () => import("@/views/page/page")

const Translations = () => import("@/views/translations/translations")

const Labels = () => import("@/views/label/labels")
const Label = () => import("@/views/label/label")


Vue.use(Router)
const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

router.beforeEach(async (to, from, next) => {
  try {
    if (to.name === 'Login' || to.name === 'SignUp') return next()
    const { data: result } = await api.get('adminCheck')
    if (result.ok) {
      next()
    } else {
      next('/login')

    }
  } catch (err) {
    next('/login')
  }
})

export default router

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,

      children: [
        {
          path: "products",
          meta: {
            label: 'Products'
          },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Products,
              name: "Products"
            },
            {
              path: "new",
              name: "ProductNew",
              component: Product,
              props: {
                isNew: true
              }
            },
            {
              path: ":id",
              name: "Product",
              component: Product,
            },
          ]
        },

        {
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
        },

        {
          path: "categories",
          meta: {
            label: 'Categories'
          },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              name: "Categories",
              component: Categories,
            },
            {
              name: "CategoryNew",
              path: "new",
              component: Category,
              props: {
                isNew: true
              }
            },
            {
              name: "Category",
              path: ":id",
              component: Category,
            },
          ]
        },

        {
          path: "attributes",
          meta: {
            label: 'Attributes'
          },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Attributes,
              name: "Attributes",

            },
            {
              name: "AttributeNew",
              path: "new",
              component: Attribute,
              props: {
                isNew: true
              }
            },
            {
              name: "Attribute",
              path: ":id",
              component: Attribute,
            },
          ]
        },
        {
          path: "labels",
          meta: {
            label: 'Labels'
          },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Labels,
              name: "Labels",

            },
            {
              name: "LabelNew",
              path: "new",
              component: Label,
              props: {
                isNew: true
              }
            },
            {
              name: "Label",
              path: ":id",
              component: Label,
            },
          ]
        },
        {
          name: "Languages",
          path: "languages",
          component: Languages,
        },
        {
          name: "Currencies",
          path: "currencies",
          component: Currencies,
        },
        {
          name: "Settings",
          path: "settings",
          component: Settings,
        },
        {
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
        },

        {
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
        },

        {
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
        },
        {
          path: "pages",
          meta: {
            label: 'Pages'
          },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              name: "Pages",
              component: Pages,

              path: '',
            },
            {
              name: "PageNew",
              path: "new",
              component: Page,
              props: {
                isNew: true
              }
            },
            {
              name: "Page",
              path: ":id",
              component: Page,
            },
          ]
        },
        {
          path: "translations",
          meta: {
            label: 'Translations'
          },
          component: Translations,

        },





        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Icons library',
              component: CoreUIIcons
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/pages',
    //   redirect: '/pages/404',
    //   name: 'Pages',
    //   component: {
    //     render(c) { return c('router-view') }
    //   },
    //   children: [
    //     {
    //       path: '404',
    //       name: 'Page404',
    //       component: Page404
    //     },
    //     {
    //       path: '500',
    //       name: 'Page500',
    //       component: Page500
    //     },
    //     {
    //       path: 'login',
    //       name: 'PageLogin',
    //       component: Login
    //     },
    //     {
    //       path: 'register',
    //       name: 'PageSignUp',
    //       component: SignUp
    //     }
    //   ]
    // }
  ]
}

