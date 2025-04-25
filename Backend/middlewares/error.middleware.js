const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
}
export default errorHandler;