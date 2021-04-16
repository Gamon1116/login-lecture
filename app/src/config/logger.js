//winston 모듈안에서 쓸것만 빼옴
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf, simple, colorize, label } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file: combine(
        label({
            label: "백엔드맛보기",
        }),
        // 파일에 저장시에 colorize는 빼줌 컬러주는문자가 포함되서
        // colorize(),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd"
        }),
        printFormat
    ),
    console: combine(
        colorize(),
        simple(),
    )
};

const opts = {
    file:
        // 파일에출력
        new transports.File({
            filename: "access.log",
            dirname: "./logs",
            level: "info",
            format: printLogFormat.file,
        }),
    console:
        // 콘솔에출력
        new transports.Console({
            level: "info",
            format: printLogFormat.console,
        }),
}

const logger = createLogger({
    transports: [opts.file],
});

//실제서비스중인 서버가 아니면
if (process.env.NODE_ENV !== "production") {
    logger.add(opts.console)
};

module.exports = logger;