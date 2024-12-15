/* eslint-disable @typescript-eslint/no-explicit-any */
// Helper for setting loading state
export const handlePending = (state: any) => {
  state.loading = true;
  state.error = null;
  state.successMessage = null;
};

// Helper for setting error state
export const handleRejected = (state: any, action: any) => {
  state.loading = false;
  state.error = action.payload || "An error occurred";
};

// Helper for setting success state
export const handleFulfilled = (
  state: any,
  action: any,
  successMessage: string = ""
) => {
  state.loading = false;
  state.successMessage = successMessage || "Operation successful";
};
