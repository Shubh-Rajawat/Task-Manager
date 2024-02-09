"use client"
import { useAppSelector } from '@/lib/hooks'
import { Box, Button, Card, CardBody, CardHeader, Heading, Stack, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const TodoList = () => {
    const { entities } = useAppSelector( ( state ) => state.entities )
    const [ tasks, setTasks ] = useState( entities )
    useEffect( () => {
        console.log( "entities", entities )
        setTasks( entities )
    }, [ entities ] )

    return (
        <div className='w-full   mt-10 text-white px-28'  >
            <div className="w-full flex justify-between ">
                <Heading as='h3' size='lg'>
                    My Tasks
                </Heading>
                <Button colorScheme='gray' size='sm' onClick={ () => {
                    localStorage.clear()
                } } >
                    clear All
                </Button>
            </div>
            <div className="tasks h-[650px] overflow-y-scroll  text-start mt-10">
                <Stack spacing={ 4 }  >
                    {
                        tasks?.slice()?.sort( ( a, b ) => a.priority - b.priority )?.map( ( task ) => {
                            let priority = task.priority == 1 ? { name: 'High', color: 'bg-red-500' } : ( task.priority == 2 ? { name: 'Medium', color: 'bg-yellow-500' } : { name: 'Low', color: "bg-green-300" } );
                            return (
                                <Card key={ task } variant={ 'elevated' }>
                                    <CardBody>
                                        <Box>
                                            <Heading className='flex justify-between' size='xs' textTransform='uppercase'>
                                                { task.name }
                                                <Tooltip label={ priority.name }>
                                                    <span className={ `${ priority.color } rounded-full h-2 w-6` }  >&nbsp;</span>
                                                </Tooltip>
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                { task.desc }
                                            </Text>
                                        </Box>
                                    </CardBody>
                                </Card>
                            )
                        } )
                    }
                </Stack>
            </div>
        </div>
    )
}

export default TodoList;