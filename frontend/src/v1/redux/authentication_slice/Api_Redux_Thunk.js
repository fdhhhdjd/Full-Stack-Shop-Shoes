import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_USERS from "../../configs/Apis/User_Api/Api_Users";
export const Login_Email_Phone_Initial = createAsyncThunk(
  "Users/Login/Email/Phone",
  async ({ email, password, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_USERS.LOGIN_EMAIL_PHONE}`, {
        email_phone: email,
        password,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const Login_Phone_Otp_Initial = createAsyncThunk(
  "Users/Login/Mobile/Phone",
  async (phone_number, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_USERS.LOGIN_PHONE_OTP}`, {
        phone_number,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const Login_Google_Initial = createAsyncThunk(
  "Users/Login/Google",
  async (response_google, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_USERS.LOGIN_GOOGLE}`, {
        tokenId: response_google.tokenId,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const Login_Facebook_Initial = createAsyncThunk(
  "Users/Login/Facebook",
  async (response_facebook, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_USERS.LOGIN_FACEBOOK}`, {
        accessToken: response_facebook.accessToken,
        userID: response_facebook.userID,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const New_Accept_Token_Initial = createAsyncThunk(
  "Users/New/Accept/Token",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_USERS.NEW_ACCESS_TOKEN}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const Logout_Users_Initial = createAsyncThunk(
  "Users/Logout",
  async (token, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Bearer Token ${token}` },
    };
    try {
      const response = await axios.get(`${API_USERS.LOGOUT_USERS}`, config);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const Profile_Users_Initial = createAsyncThunk(
  "Users/Profile",
  async ({ token }, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(`${API_USERS.GET_PROFILE_USER}`, config);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);