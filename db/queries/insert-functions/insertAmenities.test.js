const insertAmenities = require("./insertAmenities.js"); 

describe("insertAmenities", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertAmenities([]))).toBe(true);
    });
    test("returns a new empty array if passed an empty array of propertyData", ()=>{
        const emptyPropertyInput = []; 
        const output = insertAmenities(emptyPropertyInput);

        expect(output).toEqual([]);
        expect(output).not.toBe(emptyPropertyInput);
    });  
    test("nests a single amenity within the returned array, for a single property", ()=>{
        const singleAmenity = [{amenities: ["Wifi"]}];
        const output = insertAmenities(singleAmenity);

        expect(output).toEqual([["Wifi"]]);
    });
    test("nests multiple amenities within the returned array, for a single property", ()=>{
        const multipleAmenities = [{amenities: ["Wifi", "TV", "Kitchen"]}];
        const output = insertAmenities(multipleAmenities);

        expect(output).toEqual([["Wifi"], ["TV"], ["Kitchen"]]);
    });
    test("for a single property, nests multiple amenities within the returned array; duplicates are omitted", ()=>{
        const multipleAmenities = [{amenities: ["Wifi", "Wifi", "TV", "Kitchen"]}];
        const output = insertAmenities(multipleAmenities);

        expect(output).toEqual([["Wifi"], ["TV"], ["Kitchen"]]);
    });
    test("nests unique amenities into one array, for multiple properties", ()=>{
        const multiplePropertiesAmenities = [
            {amenities: ["WiFi", "TV", "Kitchen"]},
            {amenities: ["Parking", "Iron", "WiFi"]}
        ];
        const output = insertAmenities(multiplePropertiesAmenities);
      
        expect(output).toEqual([["WiFi"], ["TV"], ["Kitchen"], ["Parking"], ["Iron"]]);
    });
    test("if amenities are empty for a property, those for the other are returned", ()=>{
        const multiplePropertiesAmenities = [
            {amenities: []},
            {amenities: ["Parking", "Iron", "WiFi"]}
        ];
        const output = insertAmenities(multiplePropertiesAmenities);
      
        expect(output).toEqual([["Parking"], ["Iron"], ["WiFi"]]);
    });
    test("only amenities for a valid amenities array are returned", ()=>{
        const multiplePropertiesAmenities = [
            {amenities: 123},
            {amenities: {}},
            {amenities: ["Parking", "Iron", "WiFi"]}
        ];
        const output = insertAmenities(multiplePropertiesAmenities);

        expect(output).toEqual([["Parking"], ["Iron"], ["WiFi"]]);
    })
    test("amenities are returned for properties with an amenities key", ()=>{
        const multiplePropertiesAmenities = [
            {amenities: ["Iron", "Coffee maker", "WiFi"]},
            { }
        ];
        const output = insertAmenities(multiplePropertiesAmenities);
      
        expect(output).toEqual([["Iron"], ["Coffee maker"], ["WiFi"]]);
    });
    test("the output array is new", ()=>{
        const multiplePropertiesAmenities = [
            {amenities: ["WiFi", "TV", "Kitchen"]},
            {amenities: ["Parking", "Iron", "WiFi"]}
        ];
        const output = insertAmenities(multiplePropertiesAmenities);

        expect(multiplePropertiesAmenities).not.toBe(output);
    });
    test("the inputted array is not mutated", ()=>{
        const multiplePropertiesAmenities = [
            {amenities: ["WiFi", "TV", "Kitchen"]},
            {amenities: ["Parking", "Iron", "WiFi"]}
        ];
        insertAmenities(multiplePropertiesAmenities);

        expect(multiplePropertiesAmenities).toEqual([
            {amenities: ["WiFi", "TV", "Kitchen"]},
            {amenities: ["Parking", "Iron", "WiFi"]}
        ]);
    });
}) 