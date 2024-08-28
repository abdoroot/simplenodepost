import { setup } from "../../setup"
import { CreateJwtToken, isValidToken } from "../../../src/handlers/userHandler"

describe("test jwt token", () => {

    beforeAll(() => {
        //load dotenv file
        setup()
    });

    let token = CreateJwtToken(1, "1h")

    it("should return token string", () => {
        expect(token.length).toBeGreaterThan(10)
    })

    it("should be true", () => {
        expect(isValidToken(token)).toEqual(true)
    })
})