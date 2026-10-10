
const mongoose = require("mongoose");

const getApiError = (error) => {
    if (error instanceof mongoose.Error.ValidationError) {
        return {
            status: 400,
            message: "Invalid data"
        };
    }

    if (error instanceof mongoose.Error.CastError) {
        return {
            status: 400,
            message: "Invalid " + error.path
        };
    }

    return {
        status: 500,
        message: "Something went wrong"
    };
};

module.exports = { getApiError };
