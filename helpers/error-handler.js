const convertError = (error) => {
    switch(error.message) {
        default: 
            return {
                code: 400,
                message: error.message
            };
    }
};

module.exports = (logger) => {
    return (err, _req, res, _next) => {
        // console.error(JSON.stringify(err, null, 2));
        console.error(err);
        logger.error(err, 'ERROR HANDLING CATCHING');
        
        if (Array.isArray(err.errors)) {
            const messages = err.errors.map(function (item) {
                return item.messages;
            });
            return res.status(400).json({
                errors: messages
            });
        }

        const { code, message } = convertError(err);
        return res.status(code).json({
            message
        });
    }
};
