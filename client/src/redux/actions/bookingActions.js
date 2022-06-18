import axios from "axios";
import { message } from "antd";

import { LOADING } from "../constants/alertsConstants";
import { GET_ALL_BOOKINGS } from "../constants/bookingsConstants";

export const bookCar = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    await axios.post("/api/bookings/bookcar", data);
    dispatch({ type: LOADING, payload: false });

    message.success("Car booked successfully");
    setTimeout(() => {
      window.location.href = "/userbookings";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
    message.error("Something went wrong");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get("/api/bookings/userbookings");
    dispatch({ type: GET_ALL_BOOKINGS, payload: response.data });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};
