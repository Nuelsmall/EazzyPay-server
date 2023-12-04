class JSONResponse {
  constructor({ data = null, message = null, errorMessage = null } = {}) {
    this.success = errorMessage ? false : true; // If there's no error message, consider it a success
    this.data = data || {};
    this.message = this.success
      ? message || "Request successful"
      : errorMessage;
  }

  // Get the response object
  getResponse() {
    return {
      success: this.success,
      data: this.data,
      message: this.message,
    };
  }

  // Build and return the response object
  build() {
    return this.getResponse();
  }
}

module.exports = JSONResponse;
