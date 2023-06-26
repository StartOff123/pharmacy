import React from 'react'
import { BellOutlined } from '@ant-design/icons'
import { Badge, Popover, Alert, Empty } from 'antd'
import { useAppSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { removeNotification } from '../../redux/slices/NotificationSlice'

import './Header.scss'

const Header = () => {
  const dispath = useDispatch()

  const { notifications } = useAppSelector((state: any) => state.NotificationSlice)

  const onRemoveNotification = (code: number) => dispath(removeNotification(code))

  return (
    <div className='header'>
      <div className='container'>
        <div className='header--inner'>
          <h1>Аптека</h1>
          <div className='header--inner__notification'>
            <Popover
              content={
                notifications.length > 0 ? notifications.map((item: any) =>
                  <Alert
                    style={{ marginTop: '15px', maxWidth: '320px' }}
                    key={item.uniqureCode}
                    type={item.type}
                    description={item.description}
                    closable
                    showIcon
                    onClose={() => onRemoveNotification(item.uniqureCode)}
                  />
                ).reverse() : <Empty style={{ marginTop: '15px' }} description='Список уведомлений пуст' />
              }
              title='Уведомления'
              trigger='click'
            >
              <Badge count={notifications.length} style={{ boxShadow: 'none' }}>
                <BellOutlined className='header--inner__notification-svg' />
              </Badge>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header