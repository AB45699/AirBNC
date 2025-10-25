const capitaliseFirstLetter = require("./capitaliseFirstLetter.js"); 

describe("capitaliseFirstLetter", ()=>{
    test("returns a string", ()=>{
        expect(typeof capitaliseFirstLetter("abc")).toBe("string");
    }); 
    test("if input is an empty string, an empty string is returned", ()=>{
        expect(capitaliseFirstLetter("")).toBe("");
    });
    test("if input is one letter, it is returned capitalised", ()=>{
        expect(capitaliseFirstLetter("a")).toBe("A");
    })
    test("the first letter is capitalised for one word", ()=>{
        expect(capitaliseFirstLetter("abc")).toBe("Abc");
    }); 
    test("if string input is a number, it is returned unchanged", ()=>{
        expect(capitaliseFirstLetter("123")).toBe("123");
    }); 
    test("if first letter is already capitalised, string is returned unchanged", ()=>{
        expect(capitaliseFirstLetter("Abc")).toBe("Abc");
    }); 
    test("if the first char is a symbol, input string is returned unchanged", ()=>{
        expect(capitaliseFirstLetter("_abc")).toBe("_abc");
    }); 
    test("if string contains a special character, that does not affect first letter capitalisation", ()=>{
        expect(capitaliseFirstLetter("hello!")).toBe("Hello!");
    })
    test("if the first char is a space, input string is returned unchanged", ()=>{
        expect(capitaliseFirstLetter(" hello")).toBe(" hello");
    }); 
    test("if there a multiple words in the input string, first char is capitalised", ()=>{
        expect(capitaliseFirstLetter("hello there")).toBe("Hello there");
    }); 
    test("if chars after the first are capitalised, they are lowercased", ()=>{
        expect(capitaliseFirstLetter("aBBc")).toBe("Abbc");
    })
})