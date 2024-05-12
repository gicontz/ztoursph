import { classNames } from "@app/utils/helpers";
import { Row } from "@components/commons/common";
import HeaderText from "@components/commons/header-text";
import Layout from "@components/pages/layout";
import PageBanner from "@components/pages/page-banner";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const SubSection = ({ children, className = "" }) => (
  <div className={classNames("pl-5 mt-5", className)}>{children}</div>
);

const Services = () => {
  const banner = {
    title: "Services",
    description:
      "When hospitality meets quality and excellence: Boost your experience with us, as Z Tours.ph's services ensure that your journey's expectations are met with quality and goes beyond ordinary with care and comfort. This is the section where we indicate all the services that we are offering. Scroll down to see variety of our offers. ",
    bannerImage: "/ztoursph-banner.png",
  };
  return (
    <Layout>
      <PageBanner {...banner} />
      <div className="py-4 mt-10">
        <Row>
          <HeaderText underline>Water Activities</HeaderText>
          <p className="mt-3">
            Immerse into the seawater realm! If you&apos;re up to an exciting
            and water-rific experience, these activities below are definitely
            suitable for you!
          </p>
          <SubSection>
            <HeaderText underline>Scuba Diving & Fun Diving</HeaderText>
            <div className="mt-3 relative h-80 w-full">
              <Image
                src="/scuba.jpg"
                alt="Scuba Diving"
                fill
                className="object-cover rounded"
              />
            </div>
            <p className="mt-3">
              Scuba diving is a mode of underwater diving where the diver uses a
              self-contained underwater breathing apparatus (scuba), which is
              completely independent of surface supply, to breathe underwater.
            </p>
            <div className="mt-5">
              <h3 className="font-bold text-md mt-3">
                Scuba Diving - For Beginners
              </h3>
              <p>2 Dives - Php5,000 per person</p>
              <p>3 Dives - Php6,500 per person</p>

              <h3 className="font-bold text-md mt-3">
                Fun Diving/Free diving - For Certified Divers
              </h3>
              <p>2 Dives - Php4,500 per person</p>
              <p>3 Dives - Php5,500 per person</p>
            </div>
          </SubSection>
          <SubSection>
            <HeaderText underline>Snorkeling</HeaderText>
            <p className="mt-3">
              Snorkeling is a popular recreational activity that allows you to
              observe underwater life in a natural setting without the
              complicated equipment and training required for scuba diving.
            </p>
            <p className="font-bold italic">
              Note: You can rent a Snorkel Mask for only Php 100.00.
            </p>
          </SubSection>
          <SubSection>
            <HeaderText underline>Kayaking</HeaderText>
            <div className="mt-3 relative h-80 w-full">
              <Image
                src="/kayaking.jpeg"
                alt="Kayaking"
                fill
                className="object-cover rounded"
                style={{ objectPosition: "0 65%" }}
              />
            </div>
            <p className="mt-3">
              If you want to get along and greet the calm waves while paddling,
              Z Tours.ph prepared a kayak rental activity that&apos;s best for
              you. Enjoy paddling across serene waters and discover the hidden
              caves and lagoons where it creates an intimate ripple of
              connection and core memories that lasts a lifetime.
            </p>
            <p className="font-bold italic">
              Note: You can avail our Kayak Paddle boat for only Php300.00 and
              it&apos;s already good for two (2) persons.
            </p>
          </SubSection>
        </Row>
        <Row className="!mt-10">
          <HeaderText underline>Van Transfer</HeaderText>
          <p className="mt-3">
            Book your transfers with us! We offer a comfortable and convenient
            private van transfer service to and from the airport, hotel, or any
            destination in Palawan. Our van transfer service is perfect for
            those who value their time and comfort. We provide a safe and
            reliable service that will get you to your destination on time and
            in style.
          </p>
          <div className="mt-3 relative h-80 w-full">
            <Image
              src="/vantransfer.jpeg"
              alt="Van Transfer"
              fill
              className="object-cover rounded"
              style={{ objectPosition: "0 75%" }}
            />
          </div>
          <SubSection className="space-y-2">
            <p className="flex space-x-2 items-center text-lg font-bold">
              <MapPinIcon className="w-4 h-4" />
              <span>Puerto Princesa to El Nido</span>
            </p>
            <p className="flex space-x-2 items-center text-lg font-bold">
              <MapPinIcon className="w-4 h-4" />
              <span>El Nido to Puerto Princesa</span>
            </p>
            <p className="flex space-x-2 items-center text-lg font-bold">
              <MapPinIcon className="w-4 h-4" />
              <span>Puerto Princesa to Port Barton</span>
            </p>
            <p className="flex space-x-2 items-center text-lg font-bold">
              <MapPinIcon className="w-4 h-4" />
              <span>El Nido to Port Barton</span>
            </p>
            <p className="flex space-x-2 items-center text-lg font-bold">
              <MapPinIcon className="w-4 h-4" />
              <span>Port Barton to El Nido</span>
            </p>
          </SubSection>
        </Row>
        <Row className="!mt-10">
          <HeaderText underline>Ferry</HeaderText>
          <p>
            Traveling by ferry is a great way to explore the islands of Palawan.
            It&apos;s a relaxing and scenic way to travel, and you can enjoy the
            beautiful views of the ocean and the surrounding islands. We offer
            ferry services to and from El Nido, Coron, and other destinations in
            Palawan. Our ferries are comfortable and spacious, and our staff are
            friendly and helpful. We also offer private charter services for
            groups and special events.
          </p>
          <div className="mt-3 relative h-80 w-full">
            <Image
              src="/ferry-to-coron.jpeg"
              alt="Ferry To Coron"
              fill
              className="object-cover rounded"
              style={{ objectPosition: "0 55%" }}
            />
          </div>
          <SubSection>
            <p className="flex space-x-2 items-center text-lg font-bold">
              <MapPinIcon className="w-4 h-4" />
              <span>El Nido to Coron</span>
            </p>
            <p>Everyday, Travel time: 3 hours & 30 minutes</p>
          </SubSection>
          <SubSection>
            <p className="flex space-x-2 items-center text-lg font-bold">
              <MapPinIcon className="w-4 h-4" />
              <span>Coron to El Nido</span>
            </p>
            <p>Schedule might vary</p>
          </SubSection>
        </Row>
        <Row className="!mt-10">
          <HeaderText underline>Car & Motorcycle Rental</HeaderText>
          <p>
            If you want to explore the island on your own, we offer car and
            motorcycle rental services. Our vehicles are well-maintained and
            reliable, and we offer competitive rates. Whether you want to
            explore the beaches, waterfalls, or other attractions, our rental
            vehicles will get you there in style and comfort.
          </p>
          <div className="mt-3 relative h-80 w-full">
            <Image
              src="/motorbike.jpeg"
              alt="Motorbike Rental"
              fill
              className="object-cover rounded"
              style={{ objectPosition: "0 65%" }}
            />
          </div>
        </Row>
        <Row className="!mt-10">
          <HeaderText underline>Inland Tours</HeaderText>
          <p>
            Explore the beauty of Palawan&apos;s inland attractions with our
            inland tour packages. Our tours are designed to showcase the natural
            beauty and cultural heritage of the island. Whether you want to
            visit the underground <strong>river</strong>, explore the{" "}
            <strong>waterfalls</strong>, or experience the local culture, our
            tours will take you on an unforgettable journey.
          </p>
          <div className="mt-5">
            <HeaderText>Popular Spots</HeaderText>
            <ul className="list mt-5">
              <li className="flex items-center space-x-1">
                <MapPinIcon className="w-6 h-6" />
                <span>Nacpan Beach</span>
              </li>
              <li className="flex items-center space-x-1">
                <MapPinIcon className="w-6 h-6" />
                <span>Duli Beach</span>
              </li>
              <li className="flex items-center space-x-1">
                <MapPinIcon className="w-6 h-6" />
                <span>Nagkalit-kalit Waterfalls</span>
              </li>
            </ul>
          </div>
        </Row>
        <Row className="!mt-10">
          <HeaderText underline>Flight Booking Assistance</HeaderText>
          <p>
            Book your flights with us! We offer flight booking assistance to
            help you find the best deals on flights to and from Palawan. Whether
            you&apos;re traveling for business or pleasure, we can help you find
            the perfect flight at the best price. Our team of travel experts
            will work with you to find the right flight for your needs and
            budget.
          </p>
          <div className="mt-3 relative h-80 w-full">
            <Image
              src="/flight.jpeg"
              alt="Flight Assistance"
              fill
              className="object-cover rounded"
              style={{ objectPosition: "0 45%" }}
            />
          </div>
        </Row>
      </div>
    </Layout>
  );
};

export default Services;
