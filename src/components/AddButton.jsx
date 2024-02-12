"use client";
import { Box, Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import SubmitButton from './SubmitButton';
import { useDispatch } from 'react-redux';
import { todoAdded } from '@/lib/features/todos/todosSlice';
import { useAppSelector } from '@/lib/hooks';

const AddButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const { entities } = useAppSelector( ( state ) => state.entities );
    const [ item, setItem ] = useState( {
        name: "",
        date: "",
        desc: "",
        completed: false,
        priority: "3"
    } );


    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${ year }-${ month < 10 ? "0" + month : month }-${ day }`;
    // console.log( currentDate, ">>>", Date.now() )


    const handleChange = ( e ) => {
        setItem( { ...item, [ e.target.name ]: e.target.value } )
    }
    const handleDateChange = ( e ) => {
        if ( e.target.value < currentDate ) {
            alert( "this date has passed" )
        } else {
            setItem( { ...item, [ e.target.name ]: e.target.value } )
        }
    }


    const handleSubmit = ( e ) => {
        e.preventDefault();
        console.log( "item", item )
        dispatch( todoAdded( { ...item } ) )
        // localStorage.setItem( 'entities', JSON.stringify( [ ...entities, item ] ) )
        modalClose()
    }
    const modalClose = () => {
        setItem( {
            name: "",
            date: "",
            desc: "",
            completed: false,
            priority: "3"
        } )
        onClose();

    }
    return (
        <>
            <span className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-black transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group cursor-pointer"
                onClick={ onOpen }
            >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-white group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </span>
                <span className="absolute left-2 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200 text-[28px] w-5 text-indigo-600">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>

                </span>
                <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-indigo-600
                text-[20px]
                ">ADD</span>
            </span>

            {/* Task Add Modal */ }
            <Modal onClose={ modalClose } isOpen={ isOpen } isCentered className="bg-black" >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a New Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={ handleSubmit } >
                            <div className='my-5' >
                                <FormLabel>Title</FormLabel>
                                <Input placeholder='Title' name='name' value={ item.name } onChange={ handleChange } />
                            </div>
                            <div className='my-5' >
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder='Here is a sample placeholder'
                                    size='lg'
                                    rows={ 6 }
                                    resize={ `none` }
                                    value={ item.desc }
                                    name='desc'
                                    onChange={ handleChange }
                                />
                            </div>
                            <div className='my-5' >
                                <FormLabel>Select Date</FormLabel>
                                <Input
                                    placeholder="Select Date"
                                    size="md"
                                    type="date"
                                    value={ item.date }
                                    name='date'
                                    onChange={ handleDateChange }
                                />
                            </div>
                            <div className='my-8 mb-12 '  >
                                <FormLabel>Priority</FormLabel>
                                <RadioGroup className='ms-5' value={ item.priority } onChange={ ( e ) => {
                                    setItem( { ...item, priority: e } )
                                } } >
                                    <Stack direction='row'>
                                        <Radio value='3'>Low</Radio>
                                        <Radio value='2'>Medium</Radio>
                                        <Radio value='1'>High</Radio>
                                    </Stack>
                                </RadioGroup>
                            </div>
                            {/* <div className='my-5' >
                                <FormLabel>Select Time</FormLabel>
                                <Input
                                    placeholder="Select Date and Time"
                                    size="md"
                                    type="time"
                                />
                            </div> */}
                            <div className='w-full text-center' >
                                <SubmitButton />
                            </div>
                        </form>
                    </ModalBody>

                </ModalContent>

            </Modal>
        </>


    )
}

export default AddButton