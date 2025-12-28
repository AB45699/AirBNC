const insertPropertiesAmenities = require("./insertPropertiesAmenities.js"); 

let propertyData, singlePropertyRef, multiplePropertyRefs, expectedOutcome;

beforeEach(()=>{
    propertyData = [
        {"name": "Modern Apartment in City Center", "amenities": ["WiFi","TV", "Kitchen"]},
        {"name": "Cosy Family House","amenities": [ "TV", "Kitchen", "Parking", "Iron"]}
    ];

    multiplePropertyRefs = {
        "Modern Apartment in City Center": 1, 
        "Cosy Family House": 2
    };

    singlePropertyRef = {
        "Modern Apartment in City Center": 1
    };

    expectedOutcome = [
        [2, "TV"], 
        [2, "Kitchen"], 
        [2, "Parking"], 
        [2, "Iron"]
    ];
});

describe("insertPropertiesAmenities", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertPropertiesAmenities({}, []))).toBe(true);
    });
    test("returns a property id-amenity pair for a single property and amenity", ()=>{
        const singlePropertyAmenityData = [{"name": "Modern Apartment in City Center", "amenities": ["WiFi"]}];

        expect(insertPropertiesAmenities(singlePropertyRef, singlePropertyAmenityData)).toEqual([[1, "WiFi"]]);
    });
    test("returns a property id-amenity pair for a single property and multiple amenities", ()=>{
        const singlePropertyData = [{"name": "Modern Apartment in City Center", "amenities": ["WiFi","TV", "Kitchen"]}];

        expect(insertPropertiesAmenities(singlePropertyRef, singlePropertyData)).toEqual(
            [
                [1, "WiFi"],
                [1, "TV"],
                [1, "Kitchen"]
            ]
        );
    });
    test("returns a property id-amenity pair for multiple properties and amenities", ()=>{
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
    test("the inputted object is not mutated", ()=>{
        insertPropertiesAmenities(multiplePropertyRefs, propertyData);

        expect(multiplePropertyRefs).toEqual({"Modern Apartment in City Center": 1, "Cosy Family House": 2});
    });
    test("the inputted array is not mutated", ()=>{
        insertPropertiesAmenities(multiplePropertyRefs, propertyData);

        expect(propertyData).toEqual(
            [
                {"name": "Modern Apartment in City Center", "amenities": ["WiFi","TV", "Kitchen"]},
                {"name": "Cosy Family House","amenities": [ "TV", "Kitchen", "Parking", "Iron"]}
            ]
        );
    });
    test("the array returned is new", ()=>{
        const output = insertPropertiesAmenities(multiplePropertyRefs, propertyData);

        expect(output).not.toBe(propertyData);
    });
    describe("error cases", ()=>{
        test("returns a new empty array if passed an empty array of propertyData", ()=>{
            const emptyPropertyData = [];
            const output = insertPropertiesAmenities(multiplePropertyRefs, emptyPropertyData);

            expect(output).toEqual([]);
            expect(output).not.toBe(emptyPropertyData);
        }); 
        test("returns an empty array if passed an empty propertyRef object", ()=>{
            expect(insertPropertiesAmenities({}, propertyData)).toEqual([]);
        });
        test("property id-amenity pairs are omitted if there is no amenity key for a property in propertyData", ()=>{
            const noAmenitiesPropertyData = [
                {"name": "Modern Apartment in City Center"},
                {"name": "Cosy Family House","amenities": [ "TV", "Kitchen", "Parking", "Iron"]}
            ];
            const output = insertPropertiesAmenities(multiplePropertyRefs, noAmenitiesPropertyData); 

            expect(output).toEqual(expectedOutcome);
        });
        test("property id-amenity pairs are omitted if the property's amenities is empty", ()=>{
            const emptyAmenitiesPropertyData = [
                {"name": "Modern Apartment in City Center", "amenities": []}, 
                {"name": "Cosy Family House", "amenities": [ "TV", "Kitchen", "Parking", "Iron"]}
            ];
            const output = insertPropertiesAmenities(multiplePropertyRefs, emptyAmenitiesPropertyData); 

            expect(output).toEqual(expectedOutcome);
        });
        test("property id-amenity pairs are omitted if propertyRef is missing a ref for a property that is in propertyData", ()=>{
            const missingPropertyRef = {"Chic Studio Near the Beach": 5, "Cosy Family House": 2};

            expect(insertPropertiesAmenities(missingPropertyRef, propertyData)).toEqual(expectedOutcome);
        });
        test("property id-amenity pairs are only included if amenities key is a valid array", ()=>{
            const invalidAmenitiesPropertyData = [
                {"name": "Modern Apartment in City Center", "amenities": 123},
                {"name": "Chic Studio Near the Beach", "amenities": {}},
                {"name": "Cosy Family House","amenities": [ "TV", "Kitchen", "Parking", "Iron"]}
            ];
            const propertyRef = {"Modern Apartment in City Center": 1, "Cosy Family House": 2, "Chic Studio Near the Beach": 3};
            const output = insertPropertiesAmenities(propertyRef, invalidAmenitiesPropertyData);

            expect(output).toEqual(expectedOutcome);
        });
        test("property id-amenity pairs are omitted if propertyData does not have a name key", ()=>{
            const noNamePropertyData = [
                {"amenities": ["WiFi", "TV"]},
                {"name": "Chic Studio Near the Beach", "amenities": ["Parking", "Iron"]},
                {"name": "Cosy Family House","amenities": [ "TV", "Kitchen"]}
            ];
            const propertyRef = {"Modern Apartment in City Center": 1, "Cosy Family House": 2, "Chic Studio Near the Beach": 3};
            const output = insertPropertiesAmenities(propertyRef, noNamePropertyData);

            expect(output).toEqual([
                [3, "Parking"], 
                [3, "Iron"], 
                [2, "TV"], 
                [2, "Kitchen"]
            ])
        })
    });
});