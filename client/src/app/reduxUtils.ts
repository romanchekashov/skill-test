export const handleThunkError = async <T extends unknown>(
  thunkAPI: any,
  promise: Promise<T>
) => {
  try {
    return await promise;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
