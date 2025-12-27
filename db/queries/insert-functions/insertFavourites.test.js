const insertFavourites = require("./insertFavourites.js"); 

let favouritesData, multipleUsersRef, multiplePropertiesRef; 

beforeEach(()=>{

    favouritesData = [
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
    test("property id-user id pair is returned correctly for single favourites data", ()=>{
        const singleUserRef = {"Bob Smith": 2}; 
        const singlePropertyRef = {"Cosy Country Cottage": 4}; 
        const singleFavouritesData = [
            {
                "guest_name": "Bob Smith", 
                "property_name": "Cosy Country Cottage"
            }
        ];

        const output = insertFavourites(singleUserRef, singlePropertyRef, singleFavouritesData);

        expect(output).toEqual([[2, 4]]);
    });
    test("property id-user id pairs are returned correctly for multiple users and properties", ()=>{
        const output = insertFavourites(multipleUsersRef, multiplePropertiesRef, favouritesData);

        expect(output).toEqual([[2, 4], [3, 6]]);
    });
    test("an empty favouritesData input returns a new empty array", ()=>{
        const emptyFavouritesData = [];
        const output = insertFavourites(multipleUsersRef, multiplePropertiesRef, emptyFavouritesData);

        expect(output).toEqual([]);
        expect(output).not.toBe(emptyFavouritesData);
    });
    test("empty ref object input returns an empty array", ()=>{
        expect(insertFavourites({}, multiplePropertiesRef, favouritesData)).toEqual([]);
        expect(insertFavourites(multipleUsersRef, {}, favouritesData)).toEqual([]);
    });
    test("property id-user id pairs are omitted if user (guest) name does not exist in userRef", ()=>{
        const missingUserRef = {"Frank White": 3, "Rachel Cummings": 4};

        expect(insertFavourites(missingUserRef, multiplePropertiesRef, favouritesData)).toEqual([[3, 6]]);
    });
    test("property id-user id pairs are omitted if property name does not exist in propertyRef", ()=>{
        const missingPropertyRef = {"Modern Apartment in City Center": 6, "Chic Studio Near the Beach": 8};

        expect(insertFavourites(multipleUsersRef, missingPropertyRef, favouritesData)).toEqual([[3, 6]]);
    });
    test("property id-user id pair is omitted if favourites data has no guest name key", ()=>{
        const noGuestFavouritesData = [
            {
                "property_name": "Cosy Country Cottage"
            },
            {
                "guest_name": "Frank White", 
                "property_name": "Modern Apartment in City Center"
            }
        ];

        expect(insertFavourites(multipleUsersRef, multiplePropertiesRef, noGuestFavouritesData)).toEqual([[3, 6]]);
    });
    test("property id-user id pair is omitted if favourites data has no property name key", ()=>{
        const noPropertyFavouritesData = [
            {
                "guest_name": "Bob Smith"
            },
            {
                "guest_name": "Frank White", 
                "property_name": "Modern Apartment in City Center"
            }
        ];

        expect(insertFavourites(multipleUsersRef, multiplePropertiesRef, noPropertyFavouritesData)).toEqual([[3, 6]]);
    });
    test("the inputted objects are not mutated", ()=>{
        insertFavourites(multipleUsersRef, multiplePropertiesRef, favouritesData);

        expect(multipleUsersRef).toEqual({"Bob Smith": 2, "Frank White": 3});
        expect(multiplePropertiesRef).toEqual({"Cosy Country Cottage": 4, "Modern Apartment in City Center": 6});
    });
    test("the inputted array is not mutated", ()=>{
        insertFavourites(multipleUsersRef, multiplePropertiesRef, favouritesData);

        expect(favouritesData).toEqual([
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
        const output = insertFavourites(multipleUsersRef, multiplePropertiesRef, favouritesData);

        expect(favouritesData).not.toBe(output);
    })
})