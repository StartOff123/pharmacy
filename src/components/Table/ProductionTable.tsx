import React from 'react'
import { Table, Button, Input, ConfigProvider, Empty } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useSelector, useDispatch } from 'react-redux'

import { getAllProducts } from '../../redux/slices/ProductSlice'
import { AppDispath } from '../../redux/store'
import { getNotificarion } from '../../redux/slices/NotificationSlice'

import './Table.scss'

interface DataType {
  id: number,
  title: string,
  price: string,
  quantity: number
}

const columns: ColumnsType<DataType> = [
  { title: '№', dataIndex: 'id', key: 'id' },
  { title: 'Название', dataIndex: 'title', key: 'title' },
  { title: 'Цена', dataIndex: 'price', key: 'price' },
  { title: 'Количество', dataIndex: 'quantity', key: 'quantity' },
  {
    title: 'Действия',
    dataIndex: '',
    key: 'x',
    render: () => <Button type='primary' danger><i className="bi bi-trash"></i></Button>,
  },
]

const ProductionTable: React.FC = () => {
  const dispath = useDispatch<AppDispath>()

  const { productData, error } = useSelector((state: any) => state.ProductSlice)

  if (error) dispath(getNotificarion([{ code: 'ERR_PRODUCT_TABLE', typeNotification: 'error', description: error.message }]))

  React.useEffect(() => { dispath(getAllProducts()) }, [])

  return (
    <div>
      <Input.Search placeholder='Поиск' style={{ marginBottom: '20px' }} />
      <ConfigProvider renderEmpty={() => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Таблица пуста" />}>
        <Table size='small' dataSource={productData} columns={columns} />
      </ConfigProvider>
    </div>
  )
}

export default ProductionTable