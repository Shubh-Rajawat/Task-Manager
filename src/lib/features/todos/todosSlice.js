import { createSlice } from '@reduxjs/toolkit'
let tasks = localStorage.getItem( 'entities' )
const initialState = {
    entities: JSON.parse( tasks ) ?? [],
    status: null
}

const todosSlice = createSlice( {
    name: 'todos',
    initialState,
    reducers: {
        todoAdded( state, action ) {
            state.entities.push( action.payload )
            localStorage.setItem( 'entities', JSON.stringify( [ ...state.entities ] ) );
        },
        todoClear( state, action ) {
            state.entities = JSON.parse( localStorage.getItem( 'entities' ) ) ?? []
            localStorage.setItem( 'entities', JSON.stringify( [ ...state.entities ] ) );
        },
        todoDelete( state, action ) {
            state.entities = state.entities.filter( ( el, index ) => {
                return index != action.payload
            } )
            localStorage.setItem( 'entities', JSON.stringify( [ ...state.entities ] ) );
        },
        todoEdit( state, action ) {
            state.entities = action.payload
            localStorage.setItem( 'entities', JSON.stringify( [ ...state.entities ] ) );
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

export const { todoAdded, todoToggled, todosLoading, todoClear, todoEdit, todoDelete } = todosSlice.actions
const todoReducer = todosSlice.reducer;
export default todoReducer