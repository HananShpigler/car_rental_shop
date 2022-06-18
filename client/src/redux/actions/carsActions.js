import axios from "axios";
import { message } from "antd";

import { LOADING } from "../constants/alertsConstants";
import { GET_ALL_CARS } from "../constants/carConstants";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get("/api/cars/getallcars");
    dispatch({ type: GET_ALL_CARS, payload: response.data });
    dispatch({ type: LOADING, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};

export const addCar = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    await axios.post("/api/cars/addcar", data);
    dispatch({ type: LOADING, payload: false });

    message.success("Car added successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};

export const editCar = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    await axios.post("/api/cars/editcar", data);
    dispatch({ type: LOADING, payload: false });

    message.success("Car edited successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};

export const deleteCar = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    await axios.post("/api/cars/deletecar", data);
    dispatch({ type: LOADING, payload: false });

    message.success("Car deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOADING, payload: false });
  }
};
