import Guest from '@components/checkout/guest';
import Button from '@components/commons/button';
import { Row } from '@components/commons/common';
import { Input } from '@components/commons/input';
import PageBanner from '@components/pages/page-banner';
import styled from '@emotion/styled'
import { Divider, Modal } from 'antd'
import { Poppins, Source_Serif_4 } from 'next/font/google';
import React from 'react'
import { useForm } from 'react-hook-form';

const font = Poppins({
    weight: "400",
    subsets: ["latin"],
  });
  
  const secondaryFont = Source_Serif_4({
    weight: "800",
    subsets: ["latin"],
  });
  
const Container = styled(Row)`
// *{border: blue 1px solid;}
    color: #23432c;
    padding: 1rem;
 `

 const Label = styled.label`
    width: 100%;
 `

 export default function Checkout() {
    const [guest, setGuest] = React.useState<{name:string, age: string, nationality: string}[]>([])
    const [guestValue, setGuestValue] = React.useState<{name: string, age: string, nationality: string}>({name: '', age: '', nationality: ''})
    const {handleSubmit, control } = useForm()

    const valueGuestName = (e) => {setGuestValue((prev) => ({...prev, name: e.target.value }))}
    const valueGuestAge = (e) => {setGuestValue((prev) => ({...prev, age: e.target.value }))}
    const valueGuestNationality = (e) => {setGuestValue((prev) => ({...prev, nationality: e.target.value }))}

    const addGuest = () => {
        setGuest(prev => [...prev, guestValue])
        setGuestValue({name: '', age: '', nationality: ''})
        console.log(guest)
    }

  return (<div>
    <PageBanner title={'Checkout'} bannerImage={'https://lp-cms-production.imgix.net/2019-06/78349125.jpg?auto=format&w=1920&h=640&fit=crop&crop=faces,edges&q=75'} description={'Checkout your trips'}/>
            <Container className={font.className}>
            <h4 className={`text-2xl font-bold ${secondaryFont.className}`}>Checkout Details</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            <Divider/>
            <p className='text-lg font-bold'>Lead Guest Information</p>
            <br />
            <div className='flex gap-1 w-full'> 
            
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

            <p className='text-lg font-bold'>Guest/s Name Information</p>
            <br />
            <Guest onChange={(e) => {console.log(e)} }/>
          
            </Container>
        </div>
  )
}

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