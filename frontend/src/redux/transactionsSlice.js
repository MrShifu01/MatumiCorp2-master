import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    activeModalId: null,
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        openModal(state, action) {
            state.isModalOpen = true;
            state.activeModalId = action.payload;
        },

        closeCurrentModal(state) {
            state.isModalOpen = false;
            state.activeModalId = null;
        }
    }
});

export const { openModal, closeCurrentModal } = transactionsSlice.actions;

export default transactionsSlice.reducer;