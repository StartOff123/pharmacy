import React from 'react'
import { Alert, Empty } from 'antd'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'

import './NotificationBlock.scss'
import { removeNotification } from '../../redux/slices/NotificationSlice'

const NotificationBlock = () => {
  const dispath = useDispatch()
  const { notifications } = useAppSelector(state => state.NotificationSlice)

  const onRemoveNotification = (code: number) => dispath(removeNotification(code))

  return (
    <div className='notificationblock'>
      <div className='notificationblock--header'>
        <h1>Уведомления</h1>
        {notifications.length > 0 &&
          <span>{notifications.length}</span>
        }
      </div>
      <div className='notificationblock--body'>
        {
          notifications.length > 0 ? notifications.map(item =>
            <Alert
              style={{ marginTop: '15px' }}
              key={item.uniqureCode}
              type={item.type}
              description={item.description}
              closable
              showIcon
              onClose={() => onRemoveNotification(item.uniqureCode)}
            />
          ).reverse() : <Empty style={{ marginTop: '15px' }} description='Список уведомлений пуст' />
        }
      </div>
    </div>
  )
}

export default NotificationBlock