import { ModeAwareCache } from "typescript";

enum MODE {
  PROD = "production",
  DEV = "development",
}

type FieldTypes =
  | "log"
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "trace"
  | "time"
  | "timeEnd"
  | "timeStart"
  | "timeLog"
  | "timeStamp";

interface DevFields {
  log: (message?: any, ...optionalParams: any[]) => void;
  debug: (message?: any, ...optionalParams: any[]) => void;
  info: (message?: any, ...optionalParams: any[]) => void;
  warn: (message?: any, ...optionalParams: any[]) => void;
  error: (message?: any, ...optionalParams: any[]) => void;
  trace: (message?: any, ...optionalParams: any[]) => void;
  time: (message?: any, ...optionalParams: any[]) => void;
  timeEnd: (message?: any, ...optionalParams: any[]) => void;
  timeStart: (message?: any, ...optionalParams: any[]) => void;
  timeLog: (message?: any, ...optionalParams: any[]) => void;
  timeStamp: (message?: any, ...optionalParams: any[]) => void;
}

class Dev implements DevFields {
  private label: string;
  private mode: MODE = MODE.DEV;

  log: (message?: any, ...optionalParams: any[]) => void;
  debug: (message?: any, ...optionalParams: any[]) => void;
  info: (message?: any, ...optionalParams: any[]) => void;
  warn: (message?: any, ...optionalParams: any[]) => void;
  error: (message?: any, ...optionalParams: any[]) => void;
  trace: (message?: any, ...optionalParams: any[]) => void;
  time: (message?: any, ...optionalParams: any[]) => void;
  timeEnd: (message?: any, ...optionalParams: any[]) => void;
  timeStart: (message?: any, ...optionalParams: any[]) => void;
  timeLog: (message?: any, ...optionalParams: any[]) => void;
  timeStamp: (message?: any, ...optionalParams: any[]) => void;

  constructor(label?: string) {
    this.label = label || "[Dev mode console]";
    [
      "log",
      "debug",
      "info",
      "warn",
      "error",
      "trace",
      "time",
      "timeEnd",
      "timeStart",
      "timeLog",
      "timeStamp",
    ].forEach((name) => {
      this[name as FieldTypes] = (message?: any, ...optionalParams: any[]) => {
        if (this.mode === MODE.DEV) {
          console.log(`==========${this.label}==========`);
          console.log(message, optionalParams);
          console.log(`==========${new Date().toLocaleString("ko")}=========`);
        }
      };
    });
  }

  protected changeMode() {
    this.mode = this.mode === MODE.PROD ? MODE.DEV : MODE.PROD;
  }
}

export const dev = new Dev();

export default Dev;
