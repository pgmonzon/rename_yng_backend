const eH = {};

eH.throwError = (code, errorType, errorMessage) => error => {
  if (!error) error = new Error(errorMessage || '¡¡¡ Upsss !!!, algo anda mal')
  error.status = code
  error.type = errorType
  throw error
}

eH.throwIf = (fn, code, errorType, errorMessage) => result => {
  if (fn(result)) {
    return eH.throwError(code, errorType, errorMessage)()
  }
  return result
}

module.exports = eH;
