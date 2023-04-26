const tryCatch = <T>(fn: () => T) => {
  try {
    return fn();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { tryCatch };
