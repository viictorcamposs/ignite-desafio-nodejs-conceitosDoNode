const rewire = require("rewire")
const index = rewire("./index")
const checksExistsUserAccount = index.__get__("checksExistsUserAccount")
// @ponicode
describe("checksExistsUserAccount", () => {
    test("0", () => {
        let callFunction = () => {
            checksExistsUserAccount({ username: { username: "user123" }, headers: { Accept: "*/*", Accept-Encoding: "gzip, deflate", Host: "httpbin.org", User-Agent: "Chrome/83.0.4103.97 Safari/537.36", X-Amzn-Trace-Id: "Root=1-5ee7b614-d1d9a6e8106184eb3d66b108" } }, "This is an exception, voilà", 159)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            checksExistsUserAccount({ username: { username: "user_name" }, headers: "POST" }, "Error:", 142)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            checksExistsUserAccount({ username: { username: "username" }, headers: { Accept: "*/*", Accept-Encoding: "gzip, deflate", Host: "httpbin.org", User-Agent: "Chrome/83.0.4103.97 Safari/537.36", X-Amzn-Trace-Id: "Root=1-5ee7b614-d1d9a6e8106184eb3d66b108" } }, "Invalid [%s] value. %s", 224)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            checksExistsUserAccount({ username: { username: "user123" }, headers: { Accept: "*/*", Accept-Encoding: "gzip, deflate", Host: "httpbin.org", User-Agent: "Chrome/83.0.4103.97 Safari/537.36", X-Amzn-Trace-Id: "Root=1-5ee7b614-d1d9a6e8106184eb3d66b108" } }, "No error", 159)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            checksExistsUserAccount({ username: { username: "user-name" }, headers: { Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", Accept-Encoding: "gzip, deflate", Accept-Language: "en-GB,en-US;q=0.9,en;q=0.8", Dnt: 1, Host: "httpbin.org", Upgrade-Insecure-Requests: 1, User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36" } }, "Empty name specified", 202)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            checksExistsUserAccount({ username: { username: "" }, headers: "" }, undefined, Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
