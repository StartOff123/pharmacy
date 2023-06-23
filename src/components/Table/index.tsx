import React from 'react'
import { Tabs } from 'antd'

import ProductionTable from './ProductionTable'
import { AddProduct } from '../'

import './Table.scss'

const Table = () => {
    return (
        <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab='Продукция'>
                <div className='table'>
                    <ProductionTable />
                    <AddProduct />
                </div>
            </Tabs.TabPane>
        </Tabs>
    )
}

export default Table