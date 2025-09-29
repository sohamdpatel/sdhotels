import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Mock API calls (replace with your real API calls)
const fakeApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponsee> => {
    return new Promise<AuthResponsee>((resolve) =>
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
  signup: async (data: SignupDataa): Promise<AuthResponsee> => {
    return new Promise<AuthResponsee>((resolve) =>
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
export const login = createAsyncThunk<AuthResponsee, LoginCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await fakeApi.login(credentials);
    } catch (err) {
      console.error(err)
      return rejectWithValue("Login failed");
    }
  }
);

export const signup = createAsyncThunk<AuthResponsee, SignupDataa, { rejectValue: string }>(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      return await fakeApi.signup(data);
    } catch (err) {
      console.error(err)
      return rejectWithValue("Signup failed");
    }
  }
);

const loadFromLocalStorage = (): { token: string | null; user: Userr | null } => {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return {
      token: token || null,
      user: user ? (JSON.parse(user) as Userr) : null,
    };
  } catch {
    return { token: null, user: null };
  }
};

// -------------------- Slice -------------------- 
type AuthState = {
  user: Userr | null;
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponsee>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponsee>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;

