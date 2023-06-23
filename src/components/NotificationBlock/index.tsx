import React from 'react'
import { Alert, Empty } from 'antd'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'

import './NotificationBlock.scss'
import { removeNotification } from '../../redux/slices/NotificationSlice'

const NotificationBlock = () => {
  const dispath = useDispatch()
  const { notification } = useAppSelector(state => state.NotificationSlice)

  const onRemoveNotification = (code: string) => dispath(removeNotification(code))

  return (
    <div className='notificationblock'>
      <div className='notificationblock--header'>
        <h1>Уведомления</h1>
        {notification.length > 0 &&
          <span>{notification.length}</span>
        }
      </div>
      <div className='notificationblock--body'>
        {
          notification.length > 0 ? notification.map(item =>
            <Alert
              key={item.code}
              type={item.typeNotification}
              description={item.description}
              closable
              showIcon
              onClose={() => onRemoveNotification(item.code)}
            />
          ) : <Empty description='Список уведомлений пуст' />
        }
      </div>
    </div>
  )
}

export default NotificationBlock