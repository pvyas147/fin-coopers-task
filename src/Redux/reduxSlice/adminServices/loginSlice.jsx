import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../../Services/adminServices/adminAuthServices";

const initialState = {
  loading: false,
  adminLoginData: {},
  error: "",
};

export const loginFormService = createAsyncThunk(
  "login/loginform",
  async (formData) => {
    const response = await loginService(formData)
    return response;
  }
);

export const adminLogoutService = createAsyncThunk(
  "userlogout/USerlogoutservice",
  async () => {
    return {};
  }
);

const loginFromSlice = createSlice({
  name: "loginFormData",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.loading = false;
      state.adminLoginData = {};
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginFormService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginFormService.fulfilled, (state, action) => {
      state.loading = false;
      state.adminLoginData = action.payload?.data;
      state.error = "";
    });
    builder.addCase(loginFormService.rejected, (state, action) => {
      state.loading = false;
      state.adminLoginData = {};
      state.error = action.error.message;
    });
  },
});

export const { resetForm } = loginFromSlice.actions;
export default loginFromSlice.reducer;