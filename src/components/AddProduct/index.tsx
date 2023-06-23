import React from 'react'
import { Form, Input, Button, InputNumber } from 'antd'

import './AddProduct.scss'

const AddProduct = () => {
    const onFinish = (values: any) => {
        console.log(values)
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
                        <Button type="primary" htmlType="submit">
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AddProduct