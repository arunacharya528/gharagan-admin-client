/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  // {
  //   path: '/app/forms',
  //   icon: 'FormsIcon',
  //   name: 'Forms',
  // },
  // {
  //   path: '/app/cards',
  //   icon: 'CardsIcon',
  //   name: 'Cards',
  // },
  // {
  //   path: '/app/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/app/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/app/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/app/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',
  // },
  {
    path: '/app/product',
    icon: 'TablesIcon',
    name: 'Products',
  },
  {
    path: '/app/category',
    icon: 'TablesIcon',
    name: 'Categories',
  },

  {
    path: '/app/brand',
    icon: 'TablesIcon',
    name: 'Brands',
  },

  {
    path: '/app/discount',
    icon: 'TablesIcon',
    name: 'Discounts',
  },
  {
    path: '/app/file',
    icon: 'TablesIcon',
    name: 'File Manager',
  },
  {
    path: '/app/advertisement',
    icon: 'TablesIcon',
    name: 'Advertisement Manager',
  },
  {
    path: '/app/order',
    icon: 'TablesIcon',
    name: 'Order Manager',
  },
  {
    path: '/app/cart',
    icon: 'TablesIcon',
    name: 'Cart Manager',
  }
  // {
  //   icon: 'PagesIcon',
  //   name: 'Pages',
  //   routes: [
  //     // submenu
  //     {
  //       path: '/login',
  //       name: 'Login',
  //     },
  //     {
  //       path: '/create-account',
  //       name: 'Create account',
  //     },
  //     {
  //       path: '/forgot-password',
  //       name: 'Forgot password',
  //     },
  //     {
  //       path: '/app/404',
  //       name: '404',
  //     },
  //     {
  //       path: '/app/blank',
  //       name: 'Blank',
  //     },
  //   ],
  // },
]

export default routes
