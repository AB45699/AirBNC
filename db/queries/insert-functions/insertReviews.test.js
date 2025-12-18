const insertReviews = require("./insertReviews.js");

let reviewData, multiplePropertiesRef, multipleUsersRef;

beforeEach(()=>{
    reviewData = [
        {
            "property_name": "Modern Apartment in City Center",
            "guest_name": "Bob Smith",
            "rating": 5,
            "comment": "Great place to stay! The apartment was clean, modern, and very comfortable. Its location in the heart of the city made it extremely convenient to explore nearby attractions, restaurants, and shops. Would definitely stay here again.",
            "created_at": "2024-03-15T10:24:00Z"
        },
        {
            "property_name": "Cosy Family House",
            "guest_name": "Frank White",
            "rating": 4,
            "comment": "Lovely house that was just perfect for our family getaway. It had all the amenities we needed and the surrounding neighborhood was quiet and safe. We enjoyed spending evenings in the garden and cooking meals together in the spacious kitchen.",
            "created_at": "2024-05-20T15:42:00Z"
        }
    ];

    multiplePropertiesRef = {
        "Modern Apartment in City Center": 1, 
        "Cosy Family House": 2
    };

    multipleUsersRef = {
        "Bob Smith": 2, 
        "Frank White": 3
    };
});

describe("insertReviews", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertReviews({}, {}, [{}]))).toBe(true);
    }); 
    test("the property id from singlePropertyRef (i.e. 1) is returned. Works for a single property", ()=>{
        const singlePropertyRef = {"Modern Apartment in City Center": 1};
        const singleReviewData = [{property_name: "Modern Apartment in City Center"}];

        expect((insertReviews(singlePropertyRef, {}, singleReviewData))[0][0]).toBe(1);
    }); 
    test("the user id from singleUserRef (i.e. 2) is returned. Works for a single user", ()=>{
        const singleUserRef = {"Bob Smith": 2};
        const singleReviewData = [{guest_name: "Bob Smith"}];

        expect((insertReviews({}, singleUserRef, singleReviewData))[0][1]).toBe(2);
    }); 
    test("property id and user ids are returned for multiple property/user items", ()=>{
        const testReviewData = [
            {guest_name: "Bob Smith", property_name: "Modern Apartment in City Center"}, 
            {guest_name: "Frank White", property_name: "Cosy Family House"}
        ];
        const output = (insertReviews(multiplePropertiesRef, multipleUsersRef, testReviewData));

        expect(output[0][0]).toBe(1);
        expect(output[0][1]).toBe(2);

        expect(output[1][0]).toBe(2);
        expect(output[1][1]).toBe(3);
    });  
      test("all other values of reviewData are returned unchanged", ()=>{
        expect((insertReviews(multiplePropertiesRef, multipleUsersRef, reviewData))).toEqual([
            [
                1, 
                2, 
                5, 
                "Great place to stay! The apartment was clean, modern, and very comfortable. Its location in the heart of the city made it extremely convenient to explore nearby attractions, restaurants, and shops. Would definitely stay here again.", 
                "2024-03-15T10:24:00Z"
            ], 
            [
                2, 
                3, 
                4, 
                "Lovely house that was just perfect for our family getaway. It had all the amenities we needed and the surrounding neighborhood was quiet and safe. We enjoyed spending evenings in the garden and cooking meals together in the spacious kitchen.",  
                "2024-05-20T15:42:00Z"
            ]
        ]);
    });
    test("output is a nested array", ()=>{
        const output = insertReviews(multiplePropertiesRef, multipleUsersRef, reviewData);

        output.forEach((nestedItem)=>{
            expect(Array.isArray(nestedItem)).toBe(true);
        });
    });
    test("the inputted array is not mutated", ()=>{
        insertReviews(multiplePropertiesRef, multipleUsersRef, reviewData); 

        expect(reviewData).toEqual([
            {
                "property_name": "Modern Apartment in City Center",
                "guest_name": "Bob Smith",
                "rating": 5,
                "comment": "Great place to stay! The apartment was clean, modern, and very comfortable. Its location in the heart of the city made it extremely convenient to explore nearby attractions, restaurants, and shops. Would definitely stay here again.",
                "created_at": "2024-03-15T10:24:00Z"
            },
            {
                "property_name": "Cosy Family House",
                "guest_name": "Frank White",
                "rating": 4,
                "comment": "Lovely house that was just perfect for our family getaway. It had all the amenities we needed and the surrounding neighborhood was quiet and safe. We enjoyed spending evenings in the garden and cooking meals together in the spacious kitchen.",
                "created_at": "2024-05-20T15:42:00Z"
            }
        ]);
    });
    test("the inputted objects are not mutated", ()=>{
        insertReviews(multiplePropertiesRef, multipleUsersRef, reviewData); 

        expect(multipleUsersRef).toEqual({"Bob Smith": 2, "Frank White": 3});
        expect(multiplePropertiesRef).toEqual({"Modern Apartment in City Center" : 1, "Cosy Family House": 2});
    });
    test("the output is a new array", ()=>{
        const output = insertReviews(multiplePropertiesRef, multipleUsersRef, reviewData); 

        expect(reviewData).not.toBe(output);
    })
});