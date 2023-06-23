import React from 'react'
import { Table, Button, Input } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useSelector, useDispatch } from 'react-redux'

import { getAllProducts } from '../../redux/slices/ProductSlice'
import { AppDispath } from '../../redux/store'

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
    render: () => <Button  type='primary' danger><i className="bi bi-trash"></i></Button>,
  },
]

const ProductionTable: React.FC = () => {
  const dispath = useDispatch<AppDispath>()

  const { productData } = useSelector((state: any) => state.product)

  console.log(productData)

  React.useEffect(() => {
    dispath(getAllProducts())
  }, [])

  return (
    <div>
      <Input.Search placeholder='Поиск' style={{ marginBottom: '20px' }}/>
      <Table size='small' dataSource={productData} columns={columns} />
    </div>
  )
}

export default ProductionTable