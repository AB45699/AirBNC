const insertImages = require("./insertImages.js"); 

let inputs;

beforeEach(()=>{
    inputs = [
        {
            "property_name": "Modern Apartment in City Center",
            "image_url": "https://images.unsplash.com/photo-1471086569966-db3eebc25a59?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "alt_tag": "Plant cutting in a clear glass vase filled with water."
        },
        {
            "property_name": "Cosy Family House",
            "image_url": "https://images.unsplash.com/photo-1613545325268-9265e1609167?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "alt_tag": "Modern minimalist living room with stone fireplace, large windows, and neutral furnishings."
        }
    ]
});

describe("insertImages", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertImages({}, [{}]))).toBe(true);
    });
    test("returns a nested array", ()=>{
        expect(Array.isArray((insertImages({}, [{}]))[0])).toBe(true);
    }); 
    test("property id is taken from the propertiesRef object, for one property", ()=>{
        const testPropertyRef = {"Modern Apartment in City Center": 1};
        const testImagesData = [{property_name: "Modern Apartment in City Center"}];

        expect((insertImages(testPropertyRef, testImagesData))[0][0]).toEqual(1);
    }); 
    test("property id is taken from the propertiesRef object, for multiple properties", ()=>{
        const testPropertyRef = {"Modern Apartment in City Center": 1, "Cosy Family House": 2};
        const testImagesData = [{property_name: "Modern Apartment in City Center"}, {property_name: "Cosy Family House"}];
        const output = (insertImages(testPropertyRef, testImagesData));

        expect(output[0][0]).toEqual(1);
        expect(output[1][0]).toEqual(2);
    }); 
    test("all other values of imagesData are returned unchanged", ()=>{
        const testPropertyRef = {"Modern Apartment in City Center": 1, "Cosy Family House": 2};
        const testInput = inputs; 

        expect(insertImages(testPropertyRef, testInput)).toEqual([
            [
                1,
                "https://images.unsplash.com/photo-1471086569966-db3eebc25a59?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "Plant cutting in a clear glass vase filled with water."
            ],
            [
                2,
                "https://images.unsplash.com/photo-1613545325268-9265e1609167?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "Modern minimalist living room with stone fireplace, large windows, and neutral furnishings."
            ]
        ])
    });
    test("the inputted array is not mutated", ()=>{
        const testPropertyRef = {"Modern Apartment in City Center": 1, "Cosy Family House": 2};
        const testInput = inputs; 

        insertImages(testPropertyRef, testInput); 

        expect(testInput).toEqual([
            {
                "property_name": "Modern Apartment in City Center",
                "image_url": "https://images.unsplash.com/photo-1471086569966-db3eebc25a59?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "alt_tag": "Plant cutting in a clear glass vase filled with water."
            },
            {
                "property_name": "Cosy Family House",
                "image_url": "https://images.unsplash.com/photo-1613545325268-9265e1609167?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "alt_tag": "Modern minimalist living room with stone fireplace, large windows, and neutral furnishings."
            }
        ])
    });
    test("the inputted object is not mutated", ()=>{
        const testPropertyRef = {"Modern Apartment in City Center": 1, "Cosy Family House": 2};
        const testInput = inputs; 

        insertImages(testPropertyRef, testInput);

        expect(testPropertyRef).toEqual({"Modern Apartment in City Center": 1, "Cosy Family House": 2});
    });
    test("the output array is new", ()=>{
        const testPropertyRef = {"Modern Apartment in City Center": 1, "Cosy Family House": 2};
        const testInput = inputs; 

        const output = insertImages(testPropertyRef, testInput);

        expect(testInput).not.toBe(output);
    })
});