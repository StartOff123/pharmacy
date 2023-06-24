import React from 'react'
import { Form, Input, Button, InputNumber } from 'antd'
import { useDispatch } from 'react-redux'
import { getAllProducts, postAddProduct } from '../../redux/slices/ProductSlice'
import { AppDispath } from '../../redux/store'
import { getNotificarion } from '../../redux/slices/NotificationSlice'
import { useAppSelector } from '../../redux/hooks'

import './AddProduct.scss'

const AddProduct = () => {
    const dispath = useDispatch<AppDispath>()

    const [isLoading, setIsLoading] = React.useState(false)

    const onFinish = async (values: { title: string, price: number, quantity: string }) => {
        try {
            setIsLoading(true)
            await dispath(postAddProduct(values))
            dispath(getAllProducts())
            dispath(getNotificarion({ 
                code: 'SUCCESS_ADD_PRODUCT', 
                uniqureCode: Math.floor(Math.random() * 1000000000),
                type: 'success', 
                description: `Продукт '${values.title}' успешно добавлен.` 
            }))
            setIsLoading(false)
        } catch (err) {
        }

    }

    return (
        <div className='addproduct'>
            <div className='addproduct--header'>
                <h1>Добавить продукт</h1>
            </div>
            <div className='addproduct--form'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Пожалуйста заполните это поле!' }]}
                    >
                        <Input placeholder='Название' />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        rules={[{ required: true, message: 'Пожалуйста заполните это поле!' }]}
                    >
                        <Input prefix="₽" suffix="RUB" placeholder='Цена' type='number' />
                    </Form.Item>

                    <Form.Item
                        name="quantity"
                        rules={[{ required: true, message: 'Пожалуйста заполните это поле!' }]}
                    >
                        <InputNumber min={1} placeholder='Количество' style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item style={{ margin: 0 }}>
                        <Button loading={isLoading} type="primary" htmlType="submit">
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AddProduct