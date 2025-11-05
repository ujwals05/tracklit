export const successResponse = (res, message, data = {}, status = 200) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(status)
    .cookie("accessToken", data.accessToken, options)
    .json({
      success: true,
      message,
      data,
    });
};

export const errorResponse = (res, message, error = "", status = 400) => {
  return res.status(status).json({
    success: false,
    message,
    error,
  });
};
