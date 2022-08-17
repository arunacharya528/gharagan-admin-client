import React from 'react'
import InfoCard from '../components/Cards/InfoCard'
import PageTitle from '../components/Typography/PageTitle'
import { CartIcon, PeopleIcon, AdvertisementIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import {
  Button
} from '@windmill/react-ui'

import Order from './Order/Order'
import Rating from './Rating/Rating'
import QuesitonAnswer from './QuestionAnswer/QuestionAnswer'
import { useContext } from 'react'
import { UserListContext } from '../context/UserListContext'
import { ProductContext } from '../context/ProductContext'
import { AdvertisementContext } from '../context/AdvertisementContext'
import { Link } from 'react-router-dom'

function Dashboard() {

  const { users } = useContext(UserListContext)
  const { products } = useContext(ProductContext)
  const { advertisements } = useContext(AdvertisementContext)

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-3">
        <InfoCard title="Total Users" value={users.length} link={<Button tag={Link} to="/app/user" layout="link">View more</Button>}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Products" value={products.length} link={<Button tag={Link} to="/app/product" layout="link">View more</Button>}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Advertisements" value={advertisements.length} link={<Button tag={Link} to="/app/advertisement" layout="link">View more</Button>}>
          <RoundIcon
            icon={AdvertisementIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <Order count={10} />
        </div>
        <div>
          <Rating count={5} />
          <QuesitonAnswer count={5} />
        </div>
      </div>
    </>
  )
}

export default Dashboard
