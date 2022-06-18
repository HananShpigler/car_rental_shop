import { Col, Row, Form, Input, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import DefaultLayout from "../components/DefaultLayout";
import { addCar } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";

function AddCar({ user }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alertsReducer);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const onFinish = (values) => {
    if (
      values.capacity === undefined ||
      "" ||
      values.fuelType === undefined ||
      "" ||
      values.image === undefined ||
      "" ||
      values.name === undefined ||
      "" ||
      values.rentPerHour === undefined ||
      ""
    ) {
      message.error("Please fill all the fields");
    } else {
      values.bookedTimeSlots = [];
      dispatch(addCar(values));
    }
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" className="mt-5">
        <Col lg={12} sm={24} xs={22}>
          <Form
            className="box-shadow-1 p-2"
            layout="vertical"
            onFinish={onFinish}
          >
            <h1>Add New Car</h1>
            <hr />
            <Form.Item name="name" label="Car name">
              <Input placeholder="Car Name" />
            </Form.Item>

            <Form.Item name="image" label="Image url">
              <Input placeholder="Image URL" />
            </Form.Item>

            <Form.Item name="rentPerHour" label="Rent per hour">
              <Input placeholder="Rent Per Hour" />
            </Form.Item>

            <Form.Item name="capacity" label="Capacity">
              <Input placeholder="Capacity" />
            </Form.Item>

            <Form.Item name="fuelType" label="Fuel Type">
              <Input placeholder="Fuel Type" />
            </Form.Item>

            <div className="text-right">
              <button className="button1 mr-1">Add Car</button>
              <button className="button1">
                <Link to="/admin">Cancel</Link>
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddCar;
