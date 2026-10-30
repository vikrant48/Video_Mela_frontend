import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    status: false,
    userData: null,
    // True once the startup session check (getCurrentUser) has finished, either way. Until then
    // "not logged in" is unknown, so protected routes wait instead of flashing the login prompt.
    authChecked: false,
};

export const createAccount = createAsyncThunk("register", async (data) => {
    const formData = new FormData();

    // Add avatar file
    if (data.avatar && data.avatar[0]) {
        formData.append("avatar", data.avatar[0]);
    }

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);

    // Add cover image if provided
    if (data.coverImage && data.coverImage[0]) {
        formData.append("coverImage", data.coverImage[0]);
    }

    try {
        const response = await axiosInstance.post("/users/register", formData);        toast.success("Registered successfully!!!");
        return response.data;
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error?.response?.data?.error || error?.message || "Registration failed";
        toast.error(errorMsg);
        throw error;
    }
});

export const userLogin = createAsyncThunk("login", async (data) => {
    try {
        // Auth tokens arrive as httpOnly cookies the browser manages; page scripts never see them
        const response = await axiosInstance.post("/users/login", data);
        if (response.data?.data?.user) {
            localStorage.setItem("userData", JSON.stringify(response.data.data.user));
        }
        return response.data.data.user;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const userLogout = createAsyncThunk("logout", async () => {
    try {
        const response = await axiosInstance.post("/users/logout");
        localStorage.removeItem("userData");
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        localStorage.removeItem("userData");
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const refreshAccessToken = createAsyncThunk(
    "refreshAccessToken",
    async (data) => {
        try {
            const response = await axiosInstance.post(
                "/users/refresh_token",
                data
            );
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const changePassword = createAsyncThunk(
    "changePassword",
    async (data) => {
        try {
            const response = await axiosInstance.post(
                "/users/change_password",
                data
            );
            // Other sessions are revoked server-side; this device gets fresh cookies in the response
            toast.success(response.data?.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
    const response = await axiosInstance.get("/users/current_user");
    return response.data.data;
});

export const updateAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
    try {
        const response = await axiosInstance.patch(
            "/users/avatar",
            avatar
        );
        toast.success("Updated details successfully!!!");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const updateCoverImg = createAsyncThunk(
    "updateCoverImg",
    async (coverImage) => {
        try {
            const response = await axiosInstance.patch(
                "/users/coverImage",
                coverImage
            );
            toast.success(response.data?.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const updateUserDetails = createAsyncThunk(
    "updateUserDetails",
    async (data) => {
        try {
            const response = await axiosInstance.patch(
                "/users/update_account",
                data
            );
            // Message differs when an email change is pending confirmation
            toast.success(response.data?.message || "Updated details successfully!!!");
            if (response.data?.data) {
                localStorage.setItem("userData", JSON.stringify(response.data.data));
            }
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "Failed to update details");
            throw error;
        }
    }
);

export const verifyEmailChange = createAsyncThunk(
    "verifyEmailChange",
    async (otp) => {
        try {
            const response = await axiosInstance.post("/users/verify-email-change", { otp });
            toast.success(response.data?.message || "Email updated successfully");
            if (response.data?.data) {
                localStorage.setItem("userData", JSON.stringify(response.data.data));
            }
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error || error?.response?.data?.message || "Failed to verify code");
            throw error;
        }
    }
);

export const requestForgotPasswordOTP = createAsyncThunk(
    "requestForgotPasswordOTP",
    async ({ email }) => {
        try {
            const response = await axiosInstance.post("/users/forgot-password", { email });
            toast.success(response.data?.message || "OTP sent successfully to your email!");
            return response.data;
        } catch (error) {
            const errorMsg =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Failed to send OTP";
            toast.error(errorMsg);
            throw error;
        }
    }
);

export const verifyForgotPasswordOTP = createAsyncThunk(
    "verifyForgotPasswordOTP",
    async ({ email, otp }) => {
        try {
            const response = await axiosInstance.post("/users/verify-otp", { email, otp });
            toast.success(response.data?.message || "OTP verified successfully!");
            return response.data?.data; // returns { resetToken, email }
        } catch (error) {
            const errorMsg =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "OTP verification failed";
            toast.error(errorMsg);
            throw error;
        }
    }
);

export const submitResetPassword = createAsyncThunk(
    "submitResetPassword",
    async ({ resetToken, newPassword }) => {
        try {
            const response = await axiosInstance.post("/users/reset-password", {
                resetToken,
                newPassword,
            });
            toast.success(response.data?.message || "Password reset successfully!");
            return response.data;
        } catch (error) {
            const errorMsg =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Failed to reset password";
            toast.error(errorMsg);
            throw error;
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAccount.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.authChecked = true;
            state.userData = action.payload;
        });
        builder.addCase(userLogin.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(createAccount.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(userLogout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogout.fulfilled, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.authChecked = true;
            state.userData = action.payload;
            if (action.payload) {
                localStorage.setItem("userData", JSON.stringify(action.payload));
            }
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false;
            state.status = false;
            state.authChecked = true;
            state.userData = null;
            localStorage.removeItem("userData");
        });
        builder.addCase(updateAvatar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAvatar.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            if (action.payload) {
                localStorage.setItem("userData", JSON.stringify(action.payload));
            }
        });
        builder.addCase(updateAvatar.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateCoverImg.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCoverImg.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            if (action.payload) {
                localStorage.setItem("userData", JSON.stringify(action.payload));
            }
        });
        builder.addCase(updateCoverImg.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateUserDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        // Without this a failed save left the form stuck on "Saving..."
        builder.addCase(updateUserDetails.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(verifyEmailChange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyEmailChange.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        });
        builder.addCase(verifyEmailChange.rejected, (state) => {
            state.loading = false;
        });
    },
});

// export const { updateUser } = authSlice.actions;

export default authSlice.reducer;