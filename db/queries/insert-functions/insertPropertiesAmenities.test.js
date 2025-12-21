const insertPropertiesAmenities = require("./insertPropertiesAmenities.js"); 

let singlePropertyData, propertyData, singlePropertyRef, multiplePropertyRefs;

beforeEach(()=>{
    propertyData = [
        {
            "name": "Modern Apartment in City Center", 
            "amenities": ["WiFi","TV", "Kitchen"]
        },
        {
            "name": "Cosy Family House",
            "amenities": [ "TV", "Kitchen", "Parking", "Iron"]
        }
    ];

    multiplePropertyRefs = {
        "Modern Apartment in City Center": 1, 
        "Cosy Family House": 2
    };

    singlePropertyData = [
        {
            "name": "Modern Apartment in City Center", 
            "amenities": ["WiFi","TV", "Kitchen"]
        }
    ];

    singlePropertyRef = {
        "Modern Apartment in City Center": 1
    }
});

describe("insertPropertiesAmenities", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertPropertiesAmenities({}, []))).toBe(true);
    });
    test("returns a new empty array if passed an empty array of propertyData", ()=>{
        const emptyPropertyData = [];
        const output = insertPropertiesAmenities({}, emptyPropertyData);

        expect(output).toEqual([]);
        expect(output).not.toBe(emptyPropertyData);
    }); 
    test("the property id from singlePropertyRef (i.e. 1) is returned along with each amenity. Works for a single property and amenity", ()=>{
        const singlePropertyAmenityData = [
            {
                "name": "Modern Apartment in City Center", 
                "amenities": ["WiFi"]
            }
        ];

        expect(insertPropertiesAmenities(singlePropertyRef, singlePropertyAmenityData)).toEqual([[1, "WiFi"]]);
    });
    test("the property id from singlePropertyRef (i.e. 1) is returned along with each amenity. Works for a single property and multiple amenities", ()=>{
        expect(insertPropertiesAmenities(singlePropertyRef, singlePropertyData)).toEqual(
            [
                [1, "WiFi"],
                [1, "TV"],
                [1, "Kitchen"]
            ]
        );
    });
    test("the property ids for multiple properties are returned along with each amenity. Works for multiple properties and multiple amenities", ()=>{
        expect(insertPropertiesAmenities(multiplePropertyRefs, propertyData)).toEqual(
            [
                [1, "WiFi"],
                [1, "TV"],
                [1, "Kitchen"],
                [2, "TV"],
                [2, "Kitchen"],
                [2, "Parking"],
                [2, "Iron"]
            ]
        );
    });
    test("if propertyRef input is empty, property id is returned as undefined", ()=>{
        expect(insertPropertiesAmenities({}, singlePropertyData)).toEqual(
            [
                [undefined, "WiFi"], 
                [undefined, "TV"], 
                [undefined, "Kitchen"]
            ]
        );
    });
    test("if the properties in propertyRef and propertyData mismatch, property id is returned as undefined", ()=>{
        const mismatchedPropertyRef = {"Chic Studio Near the Beach": 4};

        expect(insertPropertiesAmenities(mismatchedPropertyRef, singlePropertyData)).toEqual(
            [
                [undefined, "WiFi"], 
                [undefined, "TV"], 
                [undefined, "Kitchen"]
            ]
        );
    });
    test("if amenities are empty, a new empty array is returned", ()=>{
        const emptyPropertyAmenities = [{"name": "Modern Apartment in City Center", "amenities": []}];
        const output = insertPropertiesAmenities(singlePropertyRef, emptyPropertyAmenities); 

        expect(output).toEqual([]);
        expect(output).not.toBe(emptyPropertyAmenities);
    });
    test("the inputted object is not mutated", ()=>{
        insertPropertiesAmenities(multiplePropertyRefs, propertyData);

        expect(multiplePropertyRefs).toEqual({
            "Modern Apartment in City Center": 1, 
            "Cosy Family House": 2
        });
    });
    test("the inputted array is not mutated", ()=>{
        insertPropertiesAmenities(multiplePropertyRefs, propertyData);

        expect(propertyData).toEqual(
            [
                {
                    "name": "Modern Apartment in City Center", 
                    "amenities": ["WiFi","TV", "Kitchen"]
                },
                {
                    "name": "Cosy Family House",
                    "amenities": [ "TV", "Kitchen", "Parking", "Iron"]
                }
            ]
        );
    });
    test("the array returned is new", ()=>{
        const output = insertPropertiesAmenities(multiplePropertyRefs, propertyData);

        expect(output).not.toBe(propertyData);
    });
});