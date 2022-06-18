import React from "react";
import { Button, Col, Dropdown, Menu, Row } from "antd";
import { Link } from "react-router-dom";

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <a href="/">Home</a>,
        },
        {
          key: "2",
          label: <a href="/userbookings">Bookings</a>,
        },
        {
          key: "3",
          label: <a href="/admin">Dashboard</a>,
        },
        {
          key: "4",
          label: (
            <div
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <div>
      <div className="header box-shadow-1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <Link style={{ color: "orangered" }} to="/">
                    CarsRent
                  </Link>
                </b>
              </h1>

              <Dropdown overlay={menu} placement="bottom">
                <Button>{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>

      <div className="footer text-center">
        <hr />
        <p style={{ textAlign: "center" }}>Design&Developed By</p>
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          <b>Hanan</b>
        </p>
      </div>
    </div>
  );
};

export default DefaultLayout;
