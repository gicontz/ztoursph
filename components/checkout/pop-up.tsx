import Input from '@components/commons/input';
import styled from '@emotion/styled'
import { Divider, Modal } from 'antd'
import { Poppins } from 'next/font/google';
import React from 'react'

const font = Poppins({
    weight: "400",
    subsets: ["latin"],
  });
  
const Container = styled.div`
    color: #23432c;
 `

 const Label = styled.label`
 `


const PopUp = ({open = false}) => {
  return (
    <Modal open={open} footer={false} closable={false}>
        <Container className={font.className}>
        <h4 className='text-xl font-bold'>Checkout Details</h4>

        <p className='text-lg'>Lead guest</p>
        <div className='flex gap-1'> 
        <Label>
            Lead Guest Name
            <Input name='leadGuest' type='text'/>
        </Label>
        <Label>
            Age
            <Input name='leadGuestAge' type='text'/>
        </Label>
        <Label>
            Nationality
            <Input name='leadGuestNationality' type='text'/>
        </Label>
        </div>
       

        <Label>
            Telephone 1
            <Input name='tel1' type='text'/>
        </Label>

        <Label>
        Telephone 2
            <Input name='tel2' type='text'/>
        </Label>

        <Label>
        Email
            <Input name='tel2' type='email'/>
        </Label>
        <Divider/>

        <p className='text-lg'>Guest&apos;s</p>
        <br />
        <div className='flex gap-1'> 
        <Label>
            Guest&apos;s Name
            <Input name='leadGuest' type='text'/>
        </Label>
        <Label>
            Age
            <Input name='guestAge' type='text'/>
        </Label>
        <Label>
            Nationality
            <Input name='leadGuestNationality' type='text'/>
        </Label>
        </div>



        </Container>
    </Modal>
  )
}

export default PopUp

/**
 * Lead Guest input 
 * Age
 * Nationality
 * Contact number x2 
 * email
 * 
 * 
 * Other Guest
 * name, age, nationality
 * 
 * 
 * 
 * 
*/
