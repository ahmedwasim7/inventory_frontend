import React, { useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { withRouter } from 'react-router-dom'
import './styles.scss'

import auth from 'auth'
import { Button, Heading, SubHeading } from 'components'
import { modalState } from 'store'
import { selectedInventory } from 'store/inventories'
import { InventoryTable } from 'containers'

const Dashboard = props => {
  let [, setIsOpen] = useRecoilState(modalState)
  let [, setInventory] = useRecoilState(selectedInventory)

  useLayoutEffect(() => {
    if (!auth.isSignedIn()) {
      props.history.push('login')
    }
  }, [])

  const handleNewInventoryClick = () => {
    setIsOpen(true)
    setInventory({})
  }

  return (
    <>
      <div className={'content-box'} name={'dashboard-main-container'}>
        <Heading>Dashboard</Heading>

        <SubHeading
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Track all of your Inventory
          <Button
            className={'m-0'}
            classType={'secondary'}
            text={
              <>
                <span>New</span>
                <span>Inventory</span>
              </>
            }
            onClick={() => handleNewInventoryClick()}
          />
        </SubHeading>

        <div className={'dashboard-tbl'} style={{ marginTop: 20 }}>
          <InventoryTable />
        </div>
      </div>
    </>
  )
}

export default withRouter(Dashboard)
