module.exports = {
    options: {
        enabled: process.env.LOGGER,
        prettyPrint: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss.l o'
        },
    },
    destination: './logs/log'
};
