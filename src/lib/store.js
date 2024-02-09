import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/todos/todosSlice'

export const makeStore = () => {
    return configureStore( {
        reducer: {
            entities: todoReducer,
        }
    } )
}