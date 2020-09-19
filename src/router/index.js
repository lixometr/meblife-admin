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
          name: "ProductNew",
          path: "product/new",
          component: Product,
          props: {
            isNew: true
          }
        },
        {
          name: "Product",
          path: "product/:id",
          component: Product,
        },
        {
          name: "Products",
          path: "products",
          component: Products,
        },
        {
          name: "ManufacturerNew",
          path: "manufacturer/new",
          component: Manufacturer,
          props: {
            isNew: true
          }
        },
        {
          name: "Manufacturer",
          path: "manufacturer/:id",
          component: Manufacturer,
        },
        {
          name: "Manufacturers",
          path: "manufacturers",
          component: Manufacturers,
        },
        {
          name: "CategoryNew",
          path: "category/new",
          component: Category,
          props: {
            isNew: true
          }
        },
        {
          name: "Category",
          path: "category/:id",
          component: Category,
        },
        {
          name: "Categories",
          path: "categories",
          component: Categories,
        },
        {
          name: "AttributeNew",
          path: "attribute/new",
          component: Attribute,
          props: {
            isNew: true
          }
        },
        {
          name: "Attribute",
          path: "attribute/:id",
          component: Attribute,
        },
        {
          name: "Attributes",
          path: "attributes",
          component: Attributes,
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
          name: "Looks",
          path: "looks",
          component: Looks,
        },
        {
          name: "LookNew",
          path: "look/new",
          component: Look,
          props: {
            isNew: true
          }
        },
        {
          name: "Look",
          path: "look/:id",
          component: Look,
        },
        {
          name: "Inspirations",
          path: "inspirations",
          component: Inspirations,
        },
        {
          name: "InspirationNew",
          path: "inspiration/new",
          component: Inspiration,
          props: {
            isNew: true
          }
        },
        {
          name: "Inspiration",
          path: "inspiration/:id",
          component: Inspiration,
        },
        {
          name: "ModuleGroups",
          path: "module-groups",
          component: ModuleGroups,
        },
        {
          name: "ModuleGroupNew",
          path: "module-group/new",
          component: ModuleGroup,
          props: {
            isNew: true
          }
        },
        {
          name: "ModuleGroupEditorNew",
          path: "module-group/:id/module//new",
          component: ModuleEditor,
          props: {
            isNew: true
          }
        },
        {
          name: "ModuleGroupEditor",
          path: "module-group/:id/module/:module_id",
          component: ModuleEditor,
        },
        {
          name: "ModuleGroup",
          path: "module-group/:id",
          component: ModuleGroup,
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
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'PageLogin',
          component: Login
        },
        {
          path: 'register',
          name: 'PageSignUp',
          component: SignUp
        }
      ]
    }
  ]
}

