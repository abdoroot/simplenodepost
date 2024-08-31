import { setup } from "../../setup"
import { CreateJwtToken, isValidToken } from "../../../src/utils/jwt"

describe("test jwt token", () => {

    beforeAll(() => {
        setup() //load dotenv file
    });

    let token = CreateJwtToken(1, "1h")

    it("should return token string", () => {
        expect(token.length).toBeGreaterThan(10)
    })

    it("should be true", () => {
        expect(isValidToken(token)).toEqual(true)
    })
})