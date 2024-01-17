import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
`

const MainPageBooking = () => {
    return (
        <div className="flex">
            <div>I want to go</div>
            <div>Check In</div>
            <div>Check Out</div>
            <div>Travellers</div>
            <div>Book</div>
        </div>
    )
}

export default MainPageBooking;