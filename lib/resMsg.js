function msgSuccess(data = null, msg = null) {
  return {
    status: 'success',
    data,
    msg
  }
}
function msgFail(data = null, msg = null) {
  return {
    status: 'fail',
    data,
    msg
  }
}

module.exports = {
  msgSuccess,
  msgFail
}
