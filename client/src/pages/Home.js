import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";

import { Row, Col, DatePicker } from "antd";
import Spinner from "../components/Spinner";
import { Link, Navigate } from "react-router-dom";
import moment from "moment";

const { RangePicker } = DatePicker;
const Home = ({ user }) => {
  const [totalCars, setTotalCars] = useState([]);

  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const setFilter = (dates) => {
    if (dates) {
      moment.suppressDeprecationWarnings = true;

      const selectedFrom = moment(dates[0], "DD MMM yyyy HH:mm");
      const selectedTo = moment(dates[1], "DD MMM yyyy HH:mm");

      const temp = [];

      for (let car of cars) {
        if (car.bookedTimeSlots.length === 0) {
          temp.push(car);
        } else {
          for (let booking of car.bookedTimeSlots) {
            if (
              selectedFrom.isBetween(booking.from, booking.to) ||
              selectedTo.isBetween(booking.from, booking.to) ||
              moment(booking.from).isBetween(selectedFrom, selectedTo) ||
              moment(booking.to).isBetween(selectedFrom, selectedTo)
            ) {
            } else {
              temp.push(car);
            }
          }
        }
      }
      setTotalCars(temp);
    } else {
      window.location.reload();
    }
  };

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} xs={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="DD MMM yyyy HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row>

      {loading && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24} key={car._id}>
              <div className="car p-2 box-shadow-1">
                <img src={car.image} alt={car.name} className="car-image" />
                <div className="car-content d-flex align-items-center justify-content-between">
                  <div>
                    <p>{car.name}</p>
                    <p>{car.rentPerHour}$ Rent Per Hour</p>
                  </div>
                  <div>
                    <button className="button1 mr-2">
                      <Link to={`/booking/${car._id}`}>Book Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
};

export default Home;
