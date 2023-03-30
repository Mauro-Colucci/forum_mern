const errorHandler = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong...";

  res.status(errorStatus).send(errorMessage);
};

export default errorHandler;
