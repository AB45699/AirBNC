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
    test("returns property id-amenity pair for a single property and amenity", ()=>{
        const singlePropertyAmenityData = [
            {
                "name": "Modern Apartment in City Center", 
                "amenities": ["WiFi"]
            }
        ];

        expect(insertPropertiesAmenities(singlePropertyRef, singlePropertyAmenityData)).toEqual([[1, "WiFi"]]);
    });
    test("returns property id-amenity pair for a single property and multiple amenities", ()=>{
        expect(insertPropertiesAmenities(singlePropertyRef, singlePropertyData)).toEqual(
            [
                [1, "WiFi"],
                [1, "TV"],
                [1, "Kitchen"]
            ]
        );
    });
    test("returns property id-amenity pair for multiple properties and amenities", ()=>{
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
    test("if propertyRef input is empty, a new empty array is returned", ()=>{
        const output = insertPropertiesAmenities({}, propertyData); 

        expect(output).toEqual([]);
        expect(output).not.toBe(propertyData);
    });
    test("a property id-amenity pair is ommitted if there is no propertyRef for a property in propertyData", ()=>{
        const propertyRef = {"Chic Studio Near the Beach": 4, "Cosy Family House": 3};

        expect(insertPropertiesAmenities(propertyRef, propertyData)).toEqual(
            [
                [3, "TV"], 
                [3, "Kitchen"], 
                [3, "Parking"], 
                [3, "Iron"]
            ]
        );
    });
    test("if amenities are empty, a new empty array is returned", ()=>{
        const noAmenitiesPropertyData = [{"name": "Modern Apartment in City Center", "amenities": []}];
        const output = insertPropertiesAmenities(singlePropertyRef, noAmenitiesPropertyData); 

        expect(output).toEqual([]);
        expect(output).not.toBe(noAmenitiesPropertyData);
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