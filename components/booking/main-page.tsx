import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
`

const MainPageBooking = () => {
    return (
        <Container>
            <div>I want to go</div>
            <div>Check In</div>
            <div>Check Out</div>
            <div>Travellers</div>
            <div>Book</div>
        </Container>
    )
}

export default MainPageBooking;