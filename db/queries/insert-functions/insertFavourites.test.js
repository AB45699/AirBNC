const insertFavourites = require("./insertFavourites.js"); 

let singleFavouritesData, multipleFavouritesData, multipleUsersRef, multiplePropertiesRef; 

beforeEach(()=>{
    singleFavouritesData = [
        {
            "guest_name": "Bob Smith", 
            "property_name": "Cosy Country Cottage"
        }
    ];

    multipleFavouritesData = [
        {
            "guest_name": "Bob Smith", 
            "property_name": "Cosy Country Cottage"
        },
        {
            "guest_name": "Frank White", 
            "property_name": "Modern Apartment in City Center"
        }
    ]; 

    multipleUsersRef = {
        "Bob Smith": 2, 
        "Frank White": 3
    }; 

    multiplePropertiesRef = {
        "Cosy Country Cottage": 4, 
        "Modern Apartment in City Center": 6
    };

})
describe("insertFavourites", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertFavourites({}, {}, []))).toBe(true);
    });
    test("the user id from singleUserRef (i.e. 2) is returned. Works for a single user", ()=>{
        const singleUserRef = {"Bob Smith": 2}; 
        const output = insertFavourites(singleUserRef, {}, singleFavouritesData);

        expect(output[0][0]).toBe(2);
    });
    test("the property id from singlePropertyRef (i.e. 4) is returned. Works for a single property", ()=>{
        const singlePropertyRef = {"Cosy Country Cottage": 4}; 
        const output = insertFavourites({}, singlePropertyRef, singleFavouritesData); 

        expect(output[0][1]).toBe(4);
    });
    test("user ids and property ids are returned for multiple users and properties", ()=>{
        const output = insertFavourites(multipleUsersRef, multiplePropertiesRef, multipleFavouritesData);

        expect(output).toEqual([[2, 4], [3, 6]]);
    });
    test("output is a nested array", ()=>{
        const output = insertFavourites(multipleUsersRef, multiplePropertiesRef, multipleFavouritesData);

        output.forEach((nestedItem)=>{
            expect(Array.isArray(nestedItem)).toBe(true);
        });
    });
    test("the inputted objects are not mutated", ()=>{
        insertFavourites(multipleUsersRef, multiplePropertiesRef, multipleFavouritesData);

        expect(multipleUsersRef).toEqual({"Bob Smith": 2, "Frank White": 3});
        expect(multiplePropertiesRef).toEqual({"Cosy Country Cottage": 4, "Modern Apartment in City Center": 6});
    });
    test("the inputted array is not mutated", ()=>{
        insertFavourites(multipleUsersRef, multiplePropertiesRef, multipleFavouritesData);

        expect(multipleFavouritesData).toEqual([
            {
                "guest_name": "Bob Smith", 
                "property_name": "Cosy Country Cottage"
            },
            {
                "guest_name": "Frank White", 
                "property_name": "Modern Apartment in City Center"
            }
        ]);
    });
    test("the outputted array is new", ()=>{
        const output = insertFavourites(multipleUsersRef, multiplePropertiesRef, multipleFavouritesData);

        expect(multipleFavouritesData).not.toBe(output);
    })
})