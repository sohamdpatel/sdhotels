// src/redux/slices/authSlice.ts

// Types for API payloads
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupDataa {
  name: string;
  email: string;
  password: string;
}

interface Userr {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface AuthResponsee {
  token: string;
  user: User;
}
