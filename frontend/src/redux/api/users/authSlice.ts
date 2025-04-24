import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  errorAuth: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoadingAuth: false,
  errorAuth: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setLoadingAuth: (state, action: PayloadAction<boolean>) => {
      state.isLoadingAuth = action.payload;
    },
    setErrorAuth: (state, action: PayloadAction<string | null>) => {
      state.errorAuth = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  // extraReducers נוכל להוסיף כאן טיפול בפעולות אסינכרוניות בהמשך
});

export const { setAuthToken, setIsAuthenticated, setLoadingAuth, setErrorAuth, logout } = authSlice.actions;

export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoadingAuth = (state: { auth: AuthState }) => state.auth.isLoadingAuth;
export const selectErrorAuth = (state: { auth: AuthState }) => state.auth.errorAuth;

export default authSlice.reducer;