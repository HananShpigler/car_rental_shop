import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars, deleteCar } from "../redux/actions/carsActions";

import { Row, Col } from "antd";
import Spinner from "../components/Spinner";
import { Link, Navigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

const AdminDashboard = ({ user }) => {
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

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-3">
        <Col lg={20} sm={24} xs={24}>
          <div className="text-right">
            <Link className="button1" to="/addcar">
              Add New Car
            </Link>
          </div>
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

                  <div className="mr-3">
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined className="mr-3 anticon-edit" />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this car ?"
                      onConfirm={() => {
                        dispatch(deleteCar({ carid: car._id }));
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined className="anticon-delete" />
                    </Popconfirm>
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

export default AdminDashboard;
