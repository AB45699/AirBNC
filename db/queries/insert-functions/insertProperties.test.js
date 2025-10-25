const insertProperties = require("./insertProperties.js"); 

let inputs;

beforeEach(()=>{
    inputs = [{
    "name": "Modern Apartment in City Center",
    "property_type": "Apartment",
    "location": "London, UK",
    "price_per_night": 120.0,
    "description": "Description of Modern Apartment in City Center. A sleek apartment with all modern amenities.",
    "host_name": "Alice Johnson",
    "amenities": ["WiFi", "TV", "Kitchen", "Washing Machine"]
  },
 {
    "name": "Elegant City Apartment",
    "property_type": "Apartment",
    "location": "Birmingham, UK",
    "price_per_night": 110.0,
    "description": "Stylish apartment located in the heart of Birmingham, close to all attractions.",
    "host_name": "Emma Davis",
    "amenities": ["WiFi", "TV", "Kitchen", "Washing Machine", "Iron"]
  }]
});

describe("insertProperties", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertProperties({}, [{}]))).toBe(true);
    });
    test("returns a nested array", ()=>{
        expect(Array.isArray((insertProperties({}, [{}]))[0])).toBe(true);
    })
    test("host id is taken from the userRef object, for one host", ()=>{
        const testUserRef = {"Alice Johnson": 1};
        const testPropertyData = [{host_name: "Alice Johnson"}];

        expect((insertProperties(testUserRef, testPropertyData))[0][0]).toEqual(1);
    }); 
    test("host id is taken from the userRef object, for two hosts", ()=>{
        const testUserRef = {"Alice Johnson": 1, "Emma Davis": 2};
        const testPropertyData = [{host_name: "Alice Johnson"}, {host_name: "Emma Davis"}];

        expect((insertProperties(testUserRef, testPropertyData))[0][0]).toEqual(1);
        expect((insertProperties(testUserRef, testPropertyData))[1][0]).toEqual(2);
    }); 
    test("all other values of propertyData are returned unchanged", ()=>{
        const testUserRef = {"Alice Johnson": 1, "Emma Davis": 2};
        const testInput = inputs;

        expect((insertProperties(testUserRef, testInput))).toEqual([
            [
                1, 
                "Modern Apartment in City Center", 
                "London, UK", 
                "Apartment", 
                120.0, 
                "Description of Modern Apartment in City Center. A sleek apartment with all modern amenities."
            ], 
            [
                2, 
                "Elegant City Apartment", 
                "Birmingham, UK", 
                "Apartment", 
                110.0, 
                "Stylish apartment located in the heart of Birmingham, close to all attractions."
            ]
        ]);

    });
})