
import { createLogger, transports, format } from "winston";
/**
 * @description logging of steps in application
 */
 
export const logger = createLogger({
  transports: [
    new transports.File({
      dirname: "testresults/logs",
      filename: "applicationlogs.log",
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, service }) => {
      return `[${timestamp}] ${service} ${level}: ${message}`;
    })
  ),
  defaultMeta: {
    service: "logs",
  },
});