import * as dotenv from 'dotenv';

export function setup() {
    const result = dotenv.config();
    if (result.error) {
        console.error("Error loading .env file:", result.error.message);
        process.exit(1);
    }
}
