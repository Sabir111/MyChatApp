class ApiResponse {
    constructor(
        statusCode,
        message = "Request successful",
        data ,
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };