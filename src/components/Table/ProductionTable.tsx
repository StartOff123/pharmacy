import React from 'react'
import { Table, Button, Input, ConfigProvider, Empty, Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { useSelector, useDispatch } from 'react-redux'

import { getNotificarion } from '../../redux/slices/NotificationSlice'
import { deleteProduct, getAllProducts } from '../../redux/slices/ProductSlice'
import { AppDispath } from '../../redux/store'

import './Table.scss'

interface DataType {
  id: number,
  title: string,
  price: string,
  quantity: number
}

const ProductionTable: React.FC = () => {
  const dispath = useDispatch<AppDispath>()
  const [isLoadingRemove, setIsLoadingRemove] = React.useState(false)

  const { productData, errors } = useSelector((state: any) => state.ProductSlice)

  // if (errors.find((error: any) => error.code === 'ERR_PRODUCT_TABLE')) {
  //   const currentError = errors.find((error: any) => error.code === 'ERR_PRODUCT_TABLE')
  //   dispath(getNotificarion({ code: currentError.code, type: 'error', description: currentError.message }))
  // }

  const columns: ColumnsType<DataType> = [
    { title: '№', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'title', key: 'title' },
    { title: 'Цена (руб)', dataIndex: 'price', key: 'price' },
    { title: 'Количество', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Действия',
      dataIndex: '',
      key: 'x',
      render: (product) => <Button type='primary' danger onClick={() => deleteConfirm(product.id)}><i className="bi bi-trash"></i></Button>,
    },
  ]

  const deleteConfirm = (id: number) => {
    Modal.confirm({
      title: 'Удаление продукта',
      icon: <ExclamationCircleFilled />,
      content: 'Вы действительно хотите удалить этот продукт?',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      okButtonProps: {
        loading: isLoadingRemove
      },
      onOk() { onRemove(id) },
    })
  }

  const onRemove = async (id: number) => {
    setIsLoadingRemove(true)
    await dispath(deleteProduct(id)).then(() => setIsLoadingRemove(false))
    dispath(getNotificarion({ code: 'SUCCESS_DELETE_PRODUCT', uniqureCode: Math.floor(Math.random() * 1000000), type: 'success', description: 'Продукт был удален из таблицы.' }))
  }

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