"use client"
import { todoClear, todoDelete, todoEdit } from '@/lib/features/todos/todosSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Box, Button, Card, CardBody, CardHeader, Checkbox, Divider, Heading, Stack, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const TodoList = () => {
    const { entities } = useAppSelector( ( state ) => state.entities )
    const [ tasks, setTasks ] = useState( entities )
    const [ completed, setCompleted ] = useState( false )
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${ year }-${ month < 10 ? "0" + month : month }-${ day }`;
    const dispatch = useDispatch()
    useEffect( () => {
        setTasks( entities?.slice()?.sort( ( a, b ) => new Date( a?.date ) - new Date( b?.date ) ) )
    }, [ entities ] )

    const handleChecked = ( e, index ) => {
        // dispatch( todoDelete( index ) )
        let updatedarray = tasks.map( ( todo, i ) => {
            if ( i === index ) {
                // Update the completed status for the specific index element
                return { ...todo, completed: e.target.checked };
            } else {
                return todo;
            }
        } )
        dispatch( todoEdit( updatedarray ) )
    }

    return (
        <div className=' w-full   mt-10 text-white px-auto'>
            <div className=" w-full items-center flex justify-around ">
                <Heading as='h3' size='lg'>
                    My Tasks
                </Heading>
                <Button colorScheme='gray' size='sm' onClick={ () => {
                    localStorage.clear()
                    dispatch( todoClear( {} ) )
                } } >
                    clear All
                </Button>
            </div>
            <div className="tasks h-[650px] overflow-y-auto  text-start mt-10 mx-[10%]">
                { tasks.length ?
                    <Stack spacing={ 4 }  >
                        { tasks?.map( ( task, index ) => {
                            let priority = task?.priority == 1 ? { name: 'High', color: 'bg-red-500' } : ( task?.priority == 2 ? { name: 'Medium', color: 'bg-yellow-500' } : { name: 'Low', color: "bg-green-300" } );
                            return (
                                <Card key={ task.name } variant={ task?.completed ? 'outline' : 'elevated' }
                                    size={ task?.completed ? "sm" : "md" }
                                    className={ `relative` } border={ task?.date == currentDate && !task?.completed && "2px" } borderColor={ task?.date == currentDate && !task?.completed && "red.300" }
                                >
                                    <CardBody>
                                        <Box>
                                            <Heading className='flex justify-between' size='xs' textTransform='uppercase'>
                                                { task?.name }
                                                <span className={ `rounded-full h-2 w-auto ${ task?.date == currentDate && !task?.completed && "text-red-500" } ` }  >{ task?.date }</span>
                                                {/* <Tooltip label={ priority.name }>
                                                    <span className={ `${ priority.color } rounded-full h-2 w-6` }  >&nbsp;</span>
                                                </Tooltip> */}
                                            </Heading>
                                            <span className='flex justify-between align-baseline relative '  >
                                                <Text pt='2' fontSize='md'>
                                                    { task?.desc }
                                                </Text>
                                                <Checkbox size='lg' colorScheme='green' className='absolute bottom-0'
                                                    isChecked={ task?.completed } onChange={ ( e ) => handleChecked( e, index ) }
                                                >
                                                </Checkbox>
                                            </span>
                                        </Box>
                                    </CardBody>
                                </Card>
                            )
                        } ) }
                    </Stack>
                    :
                    <Heading className='grid place-items-center  h-full ' size='sm' textTransform='uppercase' >
                        No Tasks
                    </Heading>
                }
            </div>
        </div>
    )
}

export default TodoList;