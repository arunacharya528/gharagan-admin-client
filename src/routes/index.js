import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

const Product = lazy(() => import('../pages/Product/Product'))
const ProductAdd = lazy(() => import('../pages/Product/Add'))
const ProductView = lazy(() => import('../pages/Product/View'))
const ProductEdit = lazy(() => import('../pages/Product/Edit'))

const Category = lazy(() => import('../pages/Category/Category'))

const Brand = lazy(() => import('../pages/Brand/Brand'))

const File = lazy(() => import('../pages/File/File'))

const Advertisement = lazy(() => import('../pages/Advertisement/Advertisement'))
const AdvertisementAdd = lazy(() => import('../pages/Advertisement/Add'))
const AdvertisementEdit = lazy(() => import('../pages/Advertisement/Edit'))

const Order = lazy(() => import('../pages/Order/Order'))
const OrderView = lazy(() => import('../pages/Order/View'))

const Cart = lazy(() => import('../pages/Cart/Cart'))

const Discount = lazy(() => import('../pages/Discount/Discount'))


/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/product',
    component: Product
  },
  {
    path: '/product/add',
    component: ProductAdd
  },
  {
    path: '/product/:productId',
    component: ProductView
  },
  {
    path: '/product/:productId/edit',
    component: ProductEdit
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/brand',
    component: Brand
  },
  {
    path: '/file',
    component: File
  },
  {
    path: '/advertisement',
    component: Advertisement
  },
  {
    path: '/advertisement/add',
    component: AdvertisementAdd
  },
  {
    path: '/advertisement/:advertisementId/edit',
    component: AdvertisementEdit
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/order/:orderId/view',
    component: OrderView
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/discount',
    component: Discount
  },
]

export default routes
