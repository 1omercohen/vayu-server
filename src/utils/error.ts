class ErrorResponse extends Error {
    message: string;
    code: number;
    status: string;

    constructor(status: string, code: number, message: string) {
        super();
        this.message = message;
        this.code = code;
        this.status = status;
    }
}

export { ErrorResponse };
