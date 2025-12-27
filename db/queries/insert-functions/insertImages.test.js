const insertImages = require("./insertImages.js"); 

let imagesData, multiplePropertiesRef;

beforeEach(()=>{
    imagesData = [
        {
            "property_name": "Modern Apartment in City Center",
            "image_url": "https://example.com/images/modern_apartment_1.jpg",
            "alt_tag": "Alt tag for Modern Apartment in City Center"
        },
        {
            "property_name": "Cosy Family House",
            "image_url": "https://example.com/images/cosy_family_house_1.jpg",
            "alt_tag": "Alt tag for Cosy Family House"
        }
    ];

    multiplePropertiesRef = {
        "Modern Apartment in City Center": 1, 
        "Cosy Family House": 2
    };
});

describe("insertImages", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertImages({}, [{}]))).toBe(true);
    }); 
    test("the property id is returned correctly for single images data", ()=>{
        const singlePropertyRef = {"Modern Apartment in City Center": 1};
        const singleImagesData = [
            {
                property_name: "Modern Apartment in City Center",
                image_url: "https://example.com/images/modern_apartment_1.jpg",
                alt_tag: "Alt tag for Modern Apartment in City Center"
            }
        ];

        expect((insertImages(singlePropertyRef, singleImagesData))[0][0]).toBe(1);
    }); 
    test("the property ids are returned correctly for multiple images data", ()=>{
        const output = (insertImages(multiplePropertiesRef, imagesData));

        expect(output[0][0]).toBe(1);
        expect(output[1][0]).toBe(2);
    }); 
    test("all other values of imagesData are returned unchanged", ()=>{
        expect(insertImages(multiplePropertiesRef, imagesData)).toEqual([
            [
                1,
                "https://example.com/images/modern_apartment_1.jpg",
                "Alt tag for Modern Apartment in City Center"
            ],
            [
                2,
                "https://example.com/images/cosy_family_house_1.jpg",
                "Alt tag for Cosy Family House"
            ]
        ])
    });
    test("an empty imagesData input returns a new empty array", ()=>{
        const emptyImagesData = [];
        const output = insertImages(multiplePropertiesRef, emptyImagesData);

        expect(output).toEqual([]);
        expect(output).not.toBe(emptyImagesData);
    });
    test("empty properties ref object returns empty array", ()=>{
        expect(insertImages({}, imagesData)).toEqual([]);
    });
    test("formatted images data is omitted if property name does not exist in propertyRef", ()=>{
        const missingPropertyRef = {"Cosy Family House": 2, "Chic Studio Near the Beach": 7};

        expect(insertImages(missingPropertyRef, imagesData)).toEqual([
            [
                2,
                "https://example.com/images/cosy_family_house_1.jpg",
                "Alt tag for Cosy Family House"
            ]
        ])
    });
    test("formatted images data is omitted if there is no property_name key in imagesData", ()=>{
        const noPropertyImagesData = [
            {
                "image_url": "https://example.com/images/modern_apartment_1.jpg",
                "alt_tag": "Alt tag for Modern Apartment in City Center"
            },
            {
                "property_name": "Cosy Family House",
                "image_url": "https://example.com/images/cosy_family_house_1.jpg",
                "alt_tag": "Alt tag for Cosy Family House"
            }
        ];

        expect(insertImages(multiplePropertiesRef, noPropertyImagesData)).toEqual([
            [
                2,
                "https://example.com/images/cosy_family_house_1.jpg",
                "Alt tag for Cosy Family House"
            ]
        ]);
    });
    test("the inputted array is not mutated", ()=>{
        insertImages(multiplePropertiesRef, imagesData); 

        expect(imagesData).toEqual([
            {
                "property_name": "Modern Apartment in City Center",
                "image_url": "https://example.com/images/modern_apartment_1.jpg",
                "alt_tag": "Alt tag for Modern Apartment in City Center"
            },
            {
                "property_name": "Cosy Family House",
                "image_url": "https://example.com/images/cosy_family_house_1.jpg",
                "alt_tag": "Alt tag for Cosy Family House"
            }
        ]);
    });
    test("the inputted object is not mutated", ()=>{
        insertImages(multiplePropertiesRef, imagesData);

        expect(multiplePropertiesRef).toEqual({"Modern Apartment in City Center": 1, "Cosy Family House": 2});
    });
    test("the output array is new", ()=>{
        const output = insertImages(multiplePropertiesRef, imagesData);

        expect(imagesData).not.toBe(output);
    });
});