import Guest from '@components/checkout/guest';
import Button from '@components/commons/button';
import { Row } from '@components/commons/common';
import PageBanner from '@components/pages/page-banner';
import styled from '@emotion/styled'
import { DatePicker, Divider, Modal } from 'antd'
import { Poppins, Source_Serif_4 } from 'next/font/google';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import checkoutSchema from '@constants/validations/checkout';
import { addDays, format } from 'date-fns';
import dynamic from 'next/dynamic';
import { getItenerary } from '@app/services/checkout';
const Input = dynamic(() => import('@components/commons/input'), { ssr: false });

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

 const Label = ({...props}) => (
    <label className="flex-auto mt-4" {...props}>{props.children}</label>
 );

 const FieldGroup = ({additionalClass, ...props}: { additionalClass?: string, children: React.ReactNode }) => (
        <div className={`flex-auto flex flex-col gap-2 ${additionalClass}`}>
            {props.children}
        </div>
);
 
 export default function Checkout() {
    const { handleSubmit, control, formState: { errors }, watch } = useForm({
        resolver: yupResolver(checkoutSchema)
    });
    
    const handleSubmition = async (data) => {
        const link = await getItenerary(data) 
        console.log(link);
    }

  return (
    <>
        <PageBanner title={'Checkout'} bannerImage={'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/432045031_402711462374881_1912772286436138233_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH2heH57e3nCKm8xdpw7XF-6UqKIZgsjT3pSoohmCyNPcUS0B-jJHj_u3jOaMhrjuCTQaGr5PrjZNRI5NkYMCVi&_nc_ohc=UfTZXtV6lA0AX8FLHsy&_nc_ht=scontent.fmnl13-2.fna&cb_e2o_trans=t&oh=00_AfCCIp-HOHASv_kBpeKcbStrtYsOyLbTZZ-Z_31rWKVlZw&oe=65FE8F04'} description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}/>
            <Container className={font.className}>
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit(handleSubmition)}>
                    <h4 className={`text-2xl font-bold ${secondaryFont.className}`}>Checkout Details</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                    <Divider className="!my-2"/>
                    <p className='text-lg font-bold'>Lead Guest Information</p>
                    <div className='flex flex-auto space-x-2 w-full flex-col lg:flex-row'>
                        <FieldGroup>
                            <Label>First Name</Label>
                            <Controller 
                                control={control}
                                name="firstname"
                                render={({ field }) => <Input type='text' onChange={field.onChange} required/>}
                            />
                        </FieldGroup>
                        <FieldGroup additionalClass='lg:w-2 w-full'>
                            <Label>Middle Initial</Label>
                            <Controller 
                                control={control}
                                name="middleInitial"
                                render={({ field }) => <Input type='text' onChange={field.onChange} maxLength={2} />}
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <Label>Last Name</Label>
                            <Controller 
                                control={control}
                                name="lastname"
                                render={({ field }) => <Input type='text' onChange={field.onChange} required/>}
                            />
                        </FieldGroup>
                        <FieldGroup additionalClass='lg:w-2 w-full'>
                            <Label>Age</Label>
                            <Controller 
                                control={control}
                                name="age"
                                render={({ field }) => <Input type='number' onChange={field.onChange} required/>}
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <Label>Nationality</Label>
                            <Controller 
                                control={control}
                                name="nationality"
                                render={({ field }) => <Input type='text' onChange={field.onChange} required/>}
                            />
                        </FieldGroup>
                    </div>
                    <div className='flex flex-auto space-x-2 flex-col lg:flex-row'>
                        <FieldGroup>
                            <Label>Mobile Number 1</Label>
                            <Controller 
                                control={control}
                                name="mobileNumber1"
                                render={({ field }) => <Input type='number' onChange={field.onChange} required/>}
                            />
                        </FieldGroup>

                       
                        <FieldGroup>
                            <Label>Mobile Number 2</Label>
                            <Controller 
                                control={control}
                                name="mobileNumber2"
                                render={({ field }) => <Input type='number' onChange={field.onChange} />}
                            />
                        </FieldGroup>

                        <FieldGroup>
                            <Label>Email</Label>
                            <Controller 
                                control={control}
                                name="email"
                                render={({ field }) => <Input type='email' onChange={field.onChange} />}
                            />
                        </FieldGroup>

                        
                    </div>
                    <FieldGroup additionalClass='lg:w-1/4 w-full'>
                            <Label>Tour Date</Label>
                            <Controller 
                                control={control}
                                name="tour_date"
                                render={({ field }) => <DatePicker onChange={field.onChange} showToday={false} disabledDate={d => !d || d.isBefore(new Date())}  className="h-12" />}
                            />
                        </FieldGroup>


                    <Divider className="!my-5" />

                    <p className='text-lg font-bold mb-2'>Guest/s Name Information</p>

                    <div className="flex flex-auto space-x-2 w-full">
                        <FieldGroup additionalClass='!flex-row items-center justify-start'>
                            <Controller 
                                control={control}
                                name="isSameAsLeadGuest"
                                render={({ field }) => <Input type='checkbox' onChange={field.onChange} className='w-5' />}
                            />
                            <Label className="flex-auto !mt-0">Same as Lead Guest</Label>
                        </FieldGroup>
                    </div>

                        <Controller 
                                control={control}
                                name="guests"
                                render={({ field }) => <Guest onChange={field.onChange} clearGuests={watch('isSameAsLeadGuest')} helperText={errors?.guests?.message as string}/>}
                            />
                    
                    <div className="flex space-x-3 justify-center h-10">
                        <Button className='h-full'>View Itinerary</Button>
                        <Button className='h-full' type='primary' htmlType='submit'>Checkout</Button>
                    </div>
                </form>
            </Container>
    </>
  )
}

/*
 {
    "content": {
        "middleInitial": "R",
        "guest": [
            {
                "name": "Jane Smith",
                "age": 17,      
                "nationality": "Filipino"
            },          
            {
                "name": "Michael Johnson",
                "age": 18,
                "nationality": "American"
            }
        ],
        "email": "johndoe@gmail.com",
        "mobileNumber1": 9898978787,
        "mobileNumber2": 98989787872,
        "nationality": "American",
        "age": 17,
        "tour_date": "2024-04-15",
        "booked_tours": [
            {
                "date": "2024-04-20",
                "time": "11:00am",
                "description": "Firefly watching tour at Iwahig River.",
                "subtotal": "3000"
            },
            {
                "date": "2024-04-21",
                "time": "8:00am",
                "description": "Hiking adventure at Mt. Bloomfield.",
                "subtotal": "4200"
            },
            {
                "date": "2024-04-22",
                "time": "1:30pm",
                "description": "Kayaking expedition at Honda Bay.",
                "subtotal": "4400"
            }
        ]
    }
}
 */