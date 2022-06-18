import { Col, Divider, Row, DatePicker, Checkbox, Modal } from "antd";
import StripeCheckout from "react-stripe-checkout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import moment from "moment";

import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import { bookCar } from "../redux/actions/bookingActions";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const { RangePicker } = DatePicker;

const BookingCar = ({ user }) => {
  const [car, setCar] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const { carid } = useParams();

  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    setTotalAmount(car.rentPerHour * totalHours + (driver && totalHours * 30));
  }, [driver, totalHours, totalAmount, car.rentPerHour]);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((car) => car._id === carid));
    }
  }, [dispatch, cars, carid]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const selectedDates = (dates) => {
    if (dates) {
      setFrom(moment(dates[0]).format("DD-MMM-YYYY HH:mm"));
      setTo(moment(dates[1]).format("DD-MMM-YYYY HH:mm"));
      setTotalHours(moment(dates[1]).diff(moment(dates[0]), "hours"));
    }
  };

  const onToken = (token) => {
    const data = {
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
      token,
    };
    dispatch(bookCar(data));
    setFrom();
    setTo();
    setTotalHours(0);
    setDriver(false);
    setTotalAmount(0);
  };

  if (document.body.clientWidth < 400) {
    const viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=0.75, user-scalable=0"
    );
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            data-aos="flip-left"
            data-aos-duration="2000"
            alt="car_image_booking"
            src={car.image}
            className="car-image-booking box-shadow-1 w-100"
          />
        </Col>

        <Col lg={10} sm={24} xs={24}>
          <Divider type="horizontal" style={{ borderColor: "#000" }} dashed>
            Car Info
          </Divider>
          <div>
            <p className="p-right">{car.name}</p>
            <p className="p-right">{car.rentPerHour}$ Rent Per Hour</p>
            <p className="p-right">Fuel : {car.fuelType}</p>
            <p className="p-right">Max Persons : {car.capacity}</p>
          </div>

          <Divider type="horizontal" style={{ borderColor: "#000" }} dashed>
            Select Dates / Times
          </Divider>
          <RangePicker
            style={{ float: "right" }}
            showTime={{ format: "HH:mm" }}
            format="DD MMM yyyy HH:mm"
            onChange={selectedDates}
          />
          <br />
          <br />
          <button
            className="button1"
            style={{ float: "right" }}
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          <br />
          {from && to && (
            <div>
              <p className="p-right mt-3">
                Total Hours : <b>{totalHours}</b>
              </p>
              <p className="p-right">
                Rent Per Hour : <b>{car.rentPerHour}$</b>
              </p>
              <Checkbox
                style={{ float: "right" }}
                onChange={(e) => {
                  if (e.target.checked) {
                    setDriver(true);
                  } else {
                    setDriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>
              <br />
              <h3 className="p-right">
                Total Amount : <b>{totalAmount}$</b>
              </h3>

              <StripeCheckout
                shippingAddress
                billingAddress
                token={onToken}
                currency="USD"
                amount={totalAmount * 100}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
              >
                <button className="button1" style={{ float: "right" }}>
                  Book Now
                </button>
              </StripeCheckout>
            </div>
          )}
        </Col>
      </Row>
      {car.name && (
        <Modal
          visible={showModal}
          closable={false}
          footer={false}
          title="Booked Time Slots"
        >
          <div className="p-2">
            {car.bookedTimeSlots.map((slot) => {
              return (
                <button className="button1 mt-2" key={slot._id}>
                  {slot.from} - {slot.to}
                </button>
              );
            })}

            <div className="text-right mt-5">
              <button
                className="button1"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BookingCar;
