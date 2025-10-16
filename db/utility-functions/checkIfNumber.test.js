const checkIfNumber = require("../utility-functions/checkIfNumber.js");

describe("checkIfNumber", ()=>{
    test("returns a boolean value", ()=>{
        expect(typeof checkIfNumber(0)).toBe("boolean");
    });
    test("returns false if the input string is not a valid number", ()=>{
        expect(checkIfNumber("12AB3")).toBe(false);
        expect(checkIfNumber("invalid")).toBe(false);
    });
    test("returns false if the input is not a string", ()=>{
        expect(checkIfNumber(123)).toBe(false);
    })
    test("returns true if the input string is a valid number", ()=>{
        expect(checkIfNumber("123")).toBe(true);
    });
    test("returns false for null or undefined input", ()=>{
        expect(checkIfNumber(null)).toBe(false);
        expect(checkIfNumber(undefined)).toBe(false);
    })
})