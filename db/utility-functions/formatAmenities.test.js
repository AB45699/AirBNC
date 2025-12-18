const formatAmenities = require("./formatAmenities.js"); 

describe("formatAmenities", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(formatAmenities([]))).toBe(true);
    });
    test("returns an empty array if passed an empty array", ()=>{
        const input = []; 

        expect(formatAmenities(input)).toEqual([]);
    }); 
    test("the empty array returned when input is empty, is new", ()=>{
        const input = []; 
        const output = formatAmenities(input);

        expect(input).not.toBe(output);
    }); 
    test("if amenities are empty for a single property input, an empty array is returned", ()=>{
        const singleAmenity = [{amenities: []}];

        expect(formatAmenities(singleAmenity)).toEqual([]);
    })
    test("nests a single amenity within the returned array", ()=>{
        const singleAmenity = [{amenities: ["Wifi"]}];
        const output = formatAmenities(singleAmenity);

        expect(output).toEqual([["Wifi"]]);
    });
    test("nests multiple unique amenities within the returned array", ()=>{
        const multipleAmenities = [{amenities: ["Wifi", "TV", "Kitchen"]}];
        const output = formatAmenities(multipleAmenities);

        expect(output).toEqual([["Wifi"], ["TV"], ["Kitchen"]]);
    });
    test("nests multiple amenities within the returned array, duplicates are ommitted", ()=>{
        const multipleAmenities = [{amenities: ["Wifi", "Wifi", "TV", "Kitchen"]}];
        const output = formatAmenities(multipleAmenities);

        expect(output).toEqual([["Wifi"], ["TV"], ["Kitchen"]]);
    });
    test("nests unqiue amenities into one array, for multiple properties", ()=>{
        const multiplePropertiesAmenities = [
            {
                amenities: ["WiFi", "TV", "Kitchen"]
            },
            {
                amenities: ["Parking", "Iron", "WiFi"]
            }
        ];
        const output = formatAmenities(multiplePropertiesAmenities);
      
        expect(output).toEqual([["WiFi"], ["TV"], ["Kitchen"], ["Parking"], ["Iron"]]);
    });
    test("if amenities are empty for one property, those for the other are returned", ()=>{
        const multiplePropertiesAmenities = [
            {
                amenities: []
            },
            {
                amenities: ["Parking", "Iron", "WiFi"]
            }
        ];
        const output = formatAmenities(multiplePropertiesAmenities);
      
        expect(output).toEqual([["Parking"], ["Iron"], ["WiFi"]]);
    })
}) 