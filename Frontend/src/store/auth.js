import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    role: 'user',
    user: null, // Now expects { id, role }
    token: null,
  },
  reducers: {
    login(state, action) {
      if (!action.payload || !action.payload.user || !action.payload.token) {
        console.error("Error: Missing user data in action.payload", action);
        return state; // Prevent crash
      }

      state.isLoggedIn = true;
      state.user = action.payload.user; // Now expects { id, role }
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    changeRole(state, action) {
      if (!state.user) {
        console.error("Error: Cannot change role, user is undefined");
        return;
      }
      state.role = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;