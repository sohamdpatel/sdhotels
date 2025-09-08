import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Mock API calls (replace with your real API calls)
const fakeApi = {
  login: async (credentials: { email: string; password: string }) => {
    return new Promise<{ token: string; user: {id: number, name: string, email: string} }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            token: "fake_jwt_token",
            user: { id: 1, name: "John Doe", email: credentials.email },
          }),
        1000
      )
    );
  },
  signup: async (data: { name: string; email: string; password: string }) => {
    return new Promise<{ token: string; user: any }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            token: "fake_jwt_token",
            user: { id: 2, name: data.name, email: data.email },
          }),
        1000
      )
    );
  },
};

// -------------------- Async Thunks --------------------
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fakeApi.login(credentials);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fakeApi.signup(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Signup failed");
    }
  }
);

const loadFromLocalStorage = () => {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null,
    };
  } catch (err) {
    return { token: null, user: null };
  }
};

// -------------------- Slice -------------------- 
type AuthState = {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

const persisted = loadFromLocalStorage();

const initialState: AuthState = {
  user: persisted.user,
  token: persisted.token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // optional persistence
      localStorage.removeItem("user"); // optional persistence
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      
    });
    builder.addCase(login.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
    });

    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(signup.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Signup failed";
    });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
