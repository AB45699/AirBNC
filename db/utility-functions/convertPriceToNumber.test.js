const convertPriceToNumber = require("./convertPriceToNumber.js");

let inputs; 

beforeEach(()=>{
    inputs = [{
            property_id: 1, 
            property_name: "test_property_name", 
            location: "test-location", 
            price_per_night: "150", 
            host: "test-name"
        },
        {
            property_id: 2, 
            property_name: "test_property_name_2", 
            location: "test-location_2", 
            price_per_night: "200", 
            host: "test-name_2"
        }];
});

describe("convertPriceToNumber", ()=>{
    test("returns an array", ()=>{
        expect(typeof convertPriceToNumber([])).toBe("object");
        expect(Array.isArray(convertPriceToNumber([]))).toBe(true);
    });
    test("empty input array returns empty array", ()=>{
        expect(convertPriceToNumber([])).toEqual([]);
    });
    test("can convert a string at the price_per_night key into a number for one entry", ()=>{
        const testInput = [{price_per_night: "150"}];
        const output = convertPriceToNumber(testInput);

        expect(output[0].price_per_night).toBe(150);
    });
    test("can convert a string at the price_per_night key into a number for multiple entries", ()=>{
        const testInput = [{price_per_night: "150"}, {price_per_night: "200"}, {price_per_night: "250"},];
        const output = convertPriceToNumber(testInput);

        expect(output[0].price_per_night).toBe(150);
        expect(output[1].price_per_night).toBe(200);
        expect(output[2].price_per_night).toBe(250);
    });
     test("other keys of the property remain unchanged", ()=>{
        const testInputs = inputs;
        const output = convertPriceToNumber(testInputs);

        expect(output[0]).toMatchObject({
            property_id: 1, 
            property_name: "test_property_name", 
            location: "test-location", 
            price_per_night: 150, 
            host: "test-name"
        });
        expect(output[1]).toMatchObject({
            property_id: 2, 
            property_name: "test_property_name_2", 
            location: "test-location_2", 
            price_per_night: 200, 
            host: "test-name_2"
        });
    });
    test("the array returned is new", ()=>{
        const testInputs = inputs; 
        const output = convertPriceToNumber(testInputs);

        expect(testInputs).not.toBe(output);
    });
    test("the input array is not mutated", ()=>{
        const testInputs = inputs; 
        expect(testInputs).toEqual([{
            property_id: 1, 
            property_name: "test_property_name", 
            location: "test-location", 
            price_per_night: "150", 
            host: "test-name"
        },
        {
            property_id: 2, 
            property_name: "test_property_name_2", 
            location: "test-location_2", 
            price_per_night: "200", 
            host: "test-name_2"
        }])
    })
    

})