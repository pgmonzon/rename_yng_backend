const msj = {};

msj.sendSuccess = (res, message) => data => {
  res.status(200).json({success: true, message, data})
}

msj.sendError = (res, status, message) => error => {
  res.status(status || error.status).json({
    success: false,
    message: message || error.message,
    error
  })
}

module.exports = msj;
