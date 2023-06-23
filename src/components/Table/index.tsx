import React from 'react'
import { Tabs } from 'antd'

import ProductionTable from './ProductionTable'
import { AddProduct, NotificationBlock } from '../'

import './Table.scss'

const Table = () => {
    return (
        <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab='Продукция'>
                <div className='table'>
                    <ProductionTable />
                    <div className='table--right'>
                        <AddProduct />
                        <NotificationBlock />
                    </div>
                </div>
            </Tabs.TabPane>
        </Tabs>
    )
}

export default Table