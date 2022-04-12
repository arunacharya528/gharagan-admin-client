import React, { useState, useEffect } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import CTA from '../components/CTA'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../icons'

import response from '../utils/demo/productData'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Tables() {

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1)

  // setup data for every table
  const [dataTable, setDataTable] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChangeTable(p) {
    setPageTable(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
  }, [pageTable])


  return (
    <>
      <PageTitle>Products</PageTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Action</TableCell>

            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((product, i) => (
              <TableRow key={i}>
                <TableCell>
                  {product.name}
                </TableCell>
                <TableCell>
                  {product.price}
                </TableCell>
                <TableCell>
                  {product.SKU}
                </TableCell>
                <TableCell>
                  {product.category.name}
                </TableCell>
                <TableCell>
                  {product.brand.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Tables
