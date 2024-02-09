import { createSlice } from '@reduxjs/toolkit'
let tasks = JSON.parse( localStorage.getItem( 'entities' ) )
const initialState = {
    entities: tasks ?? [],
    status: null
}

const todosSlice = createSlice( {
    name: 'todos',
    initialState,
    reducers: {
        todoAdded( state, action ) {
            state.entities.push( action.payload )
            // console.log( "from redux", tasks, state.entities )
            localStorage.setItem( 'entities', JSON.stringify( [ ...state.entities ] ) );
        },
        todoEdit( state, action ) {
            state.entities.push( action.payload )
            console.log( "from redux", state.entities, action.payload )
        },
        todoToggled( state, action ) {
            const todo = state.entities.find( todo => todo.completed === action.payload )
            todo.completed = !todo.completed
        },
        todosLoading( state, action ) {
            return {
                ...state,
                status: 'loading'
            }
        }
    }
} )

export const { todoAdded, todoToggled, todosLoading } = todosSlice.actions
const todoReducer = todosSlice.reducer;
export default todoReducer