import * as dotenv from "dotenv"

export function setup() {
    if (!dotenv.config()) {
        console.log("error loading env file")
        process.exit(1)
    }
}