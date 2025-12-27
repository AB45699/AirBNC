const insertProperties = require("./insertProperties.js"); 

let propertyData, multipleUsersRef, expectedOutcome;

beforeEach(()=>{
    propertyData = [
        {
            "name": "Modern Apartment in City Center",
            "property_type": "Apartment",
            "location": "London, UK",
            "price_per_night": 120.0,
            "description": "Description of Modern Apartment in City Center.",
            "host_name": "Alice Johnson",
            "amenities": ["WiFi", "TV", "Kitchen"]
        },
        {
            "name": "Elegant City Apartment",
            "property_type": "Apartment",
            "location": "Birmingham, UK",
            "price_per_night": 110.0,
            "description": "Description of Elegant City Apartment.",
            "host_name": "Emma Davis",
            "amenities": ["TV", "Kitchen", "Washer"]
        }
    ];

    multipleUsersRef = {
        "Alice Johnson": 1, 
        "Emma Davis": 2
    };

    expectedOutcome = [
        [
            2, 
            "Elegant City Apartment", 
            "Birmingham, UK", 
            "Apartment", 
            110.0, 
            "Description of Elegant City Apartment."
        ]
    ];

});

describe("insertProperties", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertProperties({}, []))).toBe(true);
    });
    test("user id is returned correctly for single property data", ()=>{
        const singleUserRef = {"Alice Johnson": 1};
        const singlePropertyData = [
            {
                "name": "Modern Apartment in City Center",
                "property_type": "Apartment",
                "location": "London, UK",
                "price_per_night": 120.0,
                "description": "Description of Modern Apartment in City Center.",
                "host_name": "Alice Johnson",
                "amenities": ["WiFi", "TV", "Kitchen"]
            }
        ];

        expect(insertProperties(singleUserRef, singlePropertyData)[0][0]).toBe(1);
    }); 
    test("user ids are returned correctly for multiple properties data", ()=>{
        const output = insertProperties(multipleUsersRef, propertyData);

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
                "Description of Modern Apartment in City Center."
            ], 
            [
                2, 
                "Elegant City Apartment", 
                "Birmingham, UK", 
                "Apartment", 
                110.0, 
                "Description of Elegant City Apartment."
            ]
        ]);
    });
    test("an empty propertyData input returns a new empty array", ()=>{
        const emptyPropertyData = [];
        const output = insertProperties(multipleUsersRef, emptyPropertyData);

        expect(output).toEqual([]);
        expect(output).not.toBe(emptyPropertyData);
    });
    test("an empty userRef input returns an empty array", ()=>{
        expect(insertProperties({}, propertyData)).toEqual([]);
    });
    test("formatted property data is not returned if user (host) name does not exist in userRef", ()=>{
        const missingUserRef = {"Emma Davis": 2, "Rachel Cummings": 4}; 

        expect(insertProperties(missingUserRef, propertyData)).toEqual(expectedOutcome);
    });
    test("formatted property data is not returned if the data has no host_name key", ()=> {
        const noHostPropertyData = [
            {
                "name": "Modern Apartment in City Center",
                "property_type": "Apartment",
                "location": "London, UK",
                "price_per_night": 120.0,
                "description": "Description of Modern Apartment in City Center.",
                "amenities": ["WiFi", "TV", "Kitchen"]
            }, 
            {
                "name": "Elegant City Apartment",
                "property_type": "Apartment",
                "location": "Birmingham, UK",
                "price_per_night": 110.0,
                "description": "Description of Elegant City Apartment.",
                "host_name": "Emma Davis",
                "amenities": ["TV", "Kitchen", "Washer"]
            }
        ];

        expect(insertProperties(multipleUsersRef, noHostPropertyData)).toEqual(expectedOutcome);
    });
    test("the inputted array is not mutated", ()=>{
        insertProperties(multipleUsersRef, propertyData);

        expect(propertyData).toEqual([
            {
                "name": "Modern Apartment in City Center",
                "property_type": "Apartment",
                "location": "London, UK",
                "price_per_night": 120.0,
                "description": "Description of Modern Apartment in City Center.",
                "host_name": "Alice Johnson",
                "amenities": ["WiFi", "TV", "Kitchen"]
            },
            {
                "name": "Elegant City Apartment",
                "property_type": "Apartment",
                "location": "Birmingham, UK",
                "price_per_night": 110.0,
                "description": "Description of Elegant City Apartment.",
                "host_name": "Emma Davis",
                "amenities": ["TV", "Kitchen", "Washer"]
            }
        ]);
    });
    test("the inputed object is not mutated", ()=>{
        insertProperties(multipleUsersRef, propertyData);

        expect(multipleUsersRef).toEqual({"Alice Johnson": 1, "Emma Davis": 2});
    });
    test("the output array is a new array", ()=>{
        const output = insertProperties(multipleUsersRef, propertyData);

        expect(propertyData).not.toBe(output);
    });
});