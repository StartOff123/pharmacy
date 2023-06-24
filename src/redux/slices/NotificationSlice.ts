import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TypeNotification = 'error' | 'success' | 'warning'

type Notification = {
    code: string
    typeNotification: TypeNotification
    description: string
}

interface NotificationSliceState {
    notification: Notification[]
}

const initialState: NotificationSliceState = {
    notification: []
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        getNotificarion: (state, action) => {
            state.notification = new Array(...state.notification, action.payload)
        },
        removeNotification: (state, action) => {
            state.notification = state.notification.filter(obj => obj.code !== action.payload)
        }
    }
})

export const { getNotificarion, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer