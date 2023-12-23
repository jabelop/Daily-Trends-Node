import { HTTPError } from "./HTTPError";

export class BadRequestError implements HTTPError {


    getStatus(): number {
        return 400;
    }
    getMessage(): string {
        return "Bad request";
    }
}