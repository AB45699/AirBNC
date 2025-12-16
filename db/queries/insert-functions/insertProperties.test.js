const insertProperties = require("./insertProperties.js"); 

let propertyData, multipleUsersRef;

beforeEach(()=>{
    propertyData = [
        {
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
        }
    ];

    multipleUsersRef = {
        "Alice Johnson": 1, 
        "Emma Davis": 2
    };

});

describe("insertProperties", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertProperties({}, [{}]))).toBe(true);
    });
    test("returns a nested array", ()=>{
        expect(Array.isArray((insertProperties({}, [{}]))[0])).toBe(true);
    })
    test("host id from singleUserRef (i.e. 1) is returned. Works for one host", ()=>{
        const singleUserRef = {"Alice Johnson": 1};
        const singlePropertyData = [{host_name: "Alice Johnson"}];

        expect((insertProperties(singleUserRef, singlePropertyData))[0][0]).toBe(1);
    }); 
    test("host ids are returned for > 1 property. Works for multiple hosts.", ()=>{
        const multiplePropertiesData = [{host_name: "Alice Johnson"}, {host_name: "Emma Davis"}];
        const output = (insertProperties(multipleUsersRef, multiplePropertiesData));

        expect(output[0][0]).toBe(1);
        expect(output[1][0]).toBe(2);
    }); 
    test("all other values of propertyData are returned unchanged", ()=>{
        expect((insertProperties(multipleUsersRef, propertyData))).toEqual([
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
    test("the inputed array is not mutated", ()=>{
        insertProperties(multipleUsersRef, propertyData)

        expect(propertyData).toEqual([
            {
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
            }
        ]);
    });
    test("the inputed object is not mutated", ()=>{
        insertProperties(multipleUsersRef, propertyData)

        expect(multipleUsersRef).toEqual({"Alice Johnson": 1, "Emma Davis": 2});
    });
     test("the output array is a new array", ()=>{
        const output = insertProperties(multipleUsersRef, propertyData)

        expect(propertyData).not.toBe(output);
    });
})