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
  {
    icon: "FormsIcon",
    name: "Catalog",
    routes: [
      {
        path: '/app/product',
        name: 'Products'
      }, {
        path: '/app/category',
        name: 'Categories'
      },
      {
        path: '/app/brand',
        name: 'Brands'
      }
    ]
  },

  {
    path: '/app/discount',
    icon: 'PercentIcon',
    name: 'Discounts',
  },
  {
    path: '/app/file',
    icon: 'FileIcon',
    name: 'File Manager',
  },
  {
    icon: 'StarIcon',
    name: "Reviews",
    routes: [
      {
        name: "Ratings",
        path: "/app/rating"
      },
      {
        name: "QAs",
        path: "/app/qa"
      }
    ]
  },
  {
    path: '/app/advertisement',
    icon: 'AdvertisementIcon',
    name: 'Advertisements',
  },
  {
    path: '/app/order',
    icon: 'OrderIcon',
    name: 'Orders',
  },
  {
    path: '/app/cart',
    icon: 'BagShoppingIcon',
    name: 'Sessions',
  },
  {
    path: '/app/user',
    icon: 'PeopleIcon',
    name: 'Users',
  },
  {
    icon: "FormsIcon",
    name: "Page",
    routes: [
      {
        path: '/app/page',
        name: 'Pages'
      }, {
        path: '/app/pageLink',
        name: 'Page Link'
      }
    ]
  },
  {
    path: '/app/setting',
    icon: 'PeopleIcon',
    name: 'Setting',
  },
]

export default routes
