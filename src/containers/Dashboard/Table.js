import { confirmAlert } from 'react-confirm-alert'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useRecoilState } from 'recoil'
import { withRouter } from 'react-router-dom'

import { createInventory, fetchInventories, deleteInventory, updateInventory } from 'api/inventory'
import { inventoriesState, setPerPageState, setPageState, setTotalState } from 'store/inventories'
import Form from 'containers/Inventory/Form'
import { loadingState, modalState } from 'store'
import { Modal } from 'components'
import { selectedInventory } from 'store/inventories'
import { Table } from 'components'
import { toster } from 'util/Toaster'

const InventoriesTable = () => {
  const [inventories, setInventories] = useRecoilState(inventoriesState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [totalCount, setTotalCount] = useRecoilState(setTotalState)
  const [perPage, setPerPage] = useRecoilState(setPerPageState)
  const [page, setPage] = useRecoilState(setPageState)
  let [isOpen, setIsOpen] = useRecoilState(modalState)
  let [inventory, setInventory] = useRecoilState(selectedInventory)

  useEffect(async () => {
    setLoading(true)

    let result = await fetchInventories(page, perPage)

    setInventories(result.data)
    setTotalCount(result.total)

    setLoading(false)
  }, [page, perPage])

  const columns = [
    { name: 'Barcode', selector: 'barcode', minWidth: '120px', maxWidth: '120px' },
    { name: 'Serial No', selector: 'serial_no', minWidth: '150px', maxWidth: '150px' },
    { name: 'Name', selector: 'name' },
    { name: 'Description', selector: 'description' },
    { name: 'Price', selector: 'price', minWidth: '100px', maxWidth: '100px' },
    {
      name: 'Purchase Date',
      selector: 'purchase_date',
      cell: row => <div>{moment(row.purchase_date, 'YYYY-MM-DD').format('LL')}</div>
    },
    { name: 'Quantity', selector: 'quantity', minWidth: '100px', maxWidth: '100px' },
    { name: 'Creator', selector: 'created_by' },
    {
      name: 'Created At',
      selector: 'created_at',
      cell: row => <div>{moment(row.created_at, 'YYYY-MM-DD').format('LL')}</div>
    },
    {
      name: '',
      cell: row => (
        <div className={'btnclose'}>
          <FontAwesomeIcon
            icon={faPen}
            style={{ marginRight: 15 }}
            onClick={() => handleUpdate(row)}
          />
          <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(row.id)} />
        </div>
      ),
      minWidth: '80px',
      maxWidth: '80px'
    }
  ]

  const handleUpdate = row => {
    setInventory({
      id: row.id,
      serialNumber: row.serial_no,
      name: row.name,
      description: row.description,
      price: row.price,
      quantity: row.quantity,
      purchaseDate: row.purchase_date
    })

    setIsOpen(true)
  }

  const handleDelete = id => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            let response = await deleteInventory(id)

            if (response.id) {
              toster('Inventory Deleted Successfully!')

              let result = await fetchInventories(page, perPage)

              setInventories(result.data)
              setTotalCount(result.total)
            } else {
              toster('Failed to Delete Inventory', 'fail')
            }
          }
        },
        { label: 'No' }
      ]
    })
  }

  const onSubmit = async values => {
    let response = undefined

    if (inventory.id) {
      response = await updateInventory(inventory.id, values)

      if (response.id) {
        toster('Inventory Updated Successfully!')
      }
    } else {
      response = await createInventory(values)

      if (response.id) {
        toster('Inventory Created Successfully!')
      }
    }

    if (response.id) {
      let result = await fetchInventories(page, perPage)

      setInventories(result.data)
      setTotalCount(result.total)

      setIsOpen(false)
    }
  }

  const closeModal = () => {
    setInventory({})
    setIsOpen(false)
  }

  return (
    <>
      {!loading ? (
        <Table
          name={'dashboard-inventories-table'}
          data={inventories}
          columns={columns}
          pagination
          paginationServer
          paginationTotalRows={totalCount}
          paginationDefaultPage={page}
          paginationPerPage={perPage}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          onChangeRowsPerPage={perPage => setPerPage(perPage)}
          onChangePage={page => setPage(page)}
          highlightOnHover={true}
          pointerOnHover={true}
        />
      ) : (
        <Skeleton height={800} />
      )}

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel={'New Inventory'}
          height={650}
        >
          <>
            <div className={'modal-head'}>
              <div className={'modal-heading'}>
                <h1>New Inventory</h1>
              </div>

              <div className={'modal-close'} onClick={closeModal}>
                +
              </div>
            </div>

            <div className={'inventory-form-main-container'}>
              <Form
                onSubmit={onSubmit}
                closeModal={closeModal}
                initialValues={inventory.name ? inventory : undefined}
              />
            </div>
          </>
        </Modal>
      )}
    </>
  )
}

export default withRouter(InventoriesTable)
