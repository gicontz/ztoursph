import React from "react";
import styled from "@emotion/styled";
import { Row } from "@components/commons/common";
import {
  MainFont,
  primaryColor,
  secondaryFont,
} from "@app/layouts/fonts/fonts";
import { SuccesfulRecieptIcon } from "@components/commons/icons";
import Link from "next/link";
import Button from "@components/commons/button";

const Container = styled(Row)`
  * {
    // border: blue 1px solid;
  }
  padding: 1rem;
`;

function BookingConfirmation() {
  return (
    <Container
      className={`${MainFont.className} h-screen relative flex justify-center align-middle items-center`}>
      <Link href={"/"} className="absolute top-2 left-2">
        Back to homepage
      </Link>
      <div className="h-1/2 flex flex-col items-center space-y-5">
        <div className="w-fit h-fit flex flex-col align-center justify-self-center items-center space-y-2">
          <SuccesfulRecieptIcon />
          <h4
            className={`text-3xl w-fit text-[${primaryColor}] ${secondaryFont.className}`}>
            Booking is {`Successful`}
          </h4>

          <p className={`w-2/3 text-center ${MainFont.className}`}>
            Booking is successful. Your booking reference is{" "}
            <span className="italic ">{`FE05E27f`}</span> other details will be
            found below.{" "}
            <Link href={"/tours"} className="underline">
              Book more tours?
            </Link>
          </p>
        </div>
        <div className="w-fit flex justify-center">
          <Button type="link">Send to Email</Button>
          <Button type="primary">Download</Button>
        </div>
        <div className="w-full">
          <object
            data="https://ztoursphcontent.s3.ap-southeast-1.amazonaws.com/Itinerary-1711381466367-Doe.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaDmFwLXNvdXRoZWFzdC0yIkcwRQIhAI5JL8XSG3uA4WvkG4l535AZyCaZ4DSlnIjoESZaf8iMAiBchIlkJciZjzRjxDEPDjlOg5rMmFjebpGxJlFZbf%2BK3irkAghhEAAaDDYzNzQyMzQ1NzU3MiIME7o4wjmOMt0alywMKsECP4qVQhWghVjvyT3m6n65MZaDZ25TWlWf6OuBvH3p3Q3Q6Jt2I64SWjfpzbZ%2FvkV0KnR3kNRihCdkOX9pkALFIKpbRcRNpG7Q%2BGTV6YrEHhXu%2F%2FqPF4Qz7aK0Z5pqEHmSAUPjD%2F%2FI89pyZaScKUdVV0qOnY1od7eeKCEtCEuxlsesPzjLYKhc02unzbNE4w6o%2BfNu1G7qNYAA6YMR%2FqeVVezX7kPrCMw4Sjg4dfqCVJQfHNL4DhJtq4iLsh1eTzFs238OwQmTJT58b0YgmlFnUVPU%2BGOLg9vAceDGl6rbWsFWsXKnOzn3k%2FgczgqoUAyRKynKHSeINx%2FMg2wCS5HN5czC7mlPDaDT4BF4RH0KwVIFo6upmUdJU7QuiC3zj5DN3Mrx0EV6v0PIGNVirzx9Q8xDlWYHSEPt9uFCPTjUNBA9MPKr5bAGOrMC4TV4UQozuIaQ0VcdmIGTXMR0pL6sTBm9vqZZfCQZ3fhDxrD1hziGPlaD7xzEO6YhrtOd6ktj6JB%2FnVtZSySQiePz9lyyo3Ud2i16rBXrnxGG1t6PdoRPJFstLtRh%2Bqm%2F98Reg%2BINTG0wZ6PAN1GtniJT6xsBWCFxUMnRjbmwUzWVbjo9b7oiTcNLWvSUFJCSpKaz2UOSJJJHhB7b1gXBG52gGq%2Bu5gyv7zTj1JE5sE1nxtqasCqRPMJDuV%2B%2F7ARn%2BTZRw52Yg5qhgtupHPTeMUG8SHflyP7WRdhuy5ir8tz6W4OvjgLbJEDOePlQbKjUWJz%2FEX8XBrnp0vuxVU%2B43nPItRgquBytrMhOnFsb6SoVbxI%2B98BhsYAu5X75AY7B21F19XOL8wOfUZ3AzzEfHn31iw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240412T155042Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAZI2LGCUSATVLJFOG%2F20240412%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=cf44cacc21f95e725afd9fb27af596935bc4e8f875a6ab0e732ada01d81abd42"
            type="application/pdf"
            width="100%"
            height="600px"
          />
        </div>
      </div>
    </Container>
  );
}

export default BookingConfirmation;
