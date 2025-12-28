const insertReviews = require("./insertReviews.js");

let reviewData, multiplePropertiesRef, multipleUsersRef, expectedOutcome;

beforeEach(()=>{
    reviewData = [
        {
            "guest_name": "Bob Smith",
            "property_name": "Modern Apartment in City Center",
            "rating": 2,
            "comment": "Comment about Modern Apartment in City Center",
            "created_at": "2024-04-12T14:45:00Z"
        },
        {
            "guest_name": "Frank White",
            "property_name": "Chic Studio Near the Beach",
            "rating": 3,
            "comment": "Comment about Chic Studio Near the Beach",
            "created_at": "2025-04-04T12:10:00Z"
        }
    ];

    multiplePropertiesRef = {
        "Modern Apartment in City Center": 1, 
        "Chic Studio Near the Beach": 2
    };

    multipleUsersRef = {
        "Bob Smith": 2, 
        "Frank White": 3
    };

    expectedOutcome = [
        [
            1, 
            2, 
            2, 
            "Comment about Modern Apartment in City Center",
            "2024-04-12T14:45:00Z"
        ]
    ]
});

describe("insertReviews", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertReviews({}, {}, []))).toBe(true);
    }); 
    test("returns property_id and user_id correctly for single review data", ()=>{
        const singlePropertyRef = {"Modern Apartment in City Center": 1};
        const singleUserRef = {"Bob Smith": 2};
        const singleReviewData = [
            {
                "guest_name": "Bob Smith",
                "property_name": "Modern Apartment in City Center",
                "rating": 2,
                "comment": "Comment about Modern Apartment in City Center",
                "created_at": "2024-04-12T14:45:00Z"
            }
        ];

        expect(insertReviews(singlePropertyRef, singleUserRef, singleReviewData)[0][0]).toBe(1);
    });  
    test("property id and user ids are returned correctly for multiple review data", ()=>{
        const output = insertReviews(multiplePropertiesRef, multipleUsersRef, reviewData);

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
                2, 
                "Comment about Modern Apartment in City Center",
                "2024-04-12T14:45:00Z"
            ], 
            [
                2, 
                3, 
                3, 
                "Comment about Chic Studio Near the Beach",
                "2025-04-04T12:10:00Z"
            ]
        ]);
    });
    test("a new empty array is returned if reviewData input is empty", ()=>{
        const emptyReviewData = [];
        const output = insertReviews(multiplePropertiesRef, multipleUsersRef, emptyReviewData);

        expect(output).toEqual([]);
        expect(output).not.toBe(emptyReviewData);
    }); 
    test("returns empty array if ref inputs are empty", ()=>{
        expect(insertReviews({}, multipleUsersRef, reviewData)).toEqual([]);
        expect(insertReviews(multiplePropertiesRef, {}, reviewData)).toEqual([]);
    });
    test("formatted review data is not returned for a review if property does not exist in propertyRef", ()=>{
        const missingPropertyRef = {"Modern Apartment in City Center": 1, "Luxury Penthouse with View": 4};

        expect(insertReviews(missingPropertyRef, multipleUsersRef, reviewData)).toEqual(expectedOutcome);
    });
    test("formatted review data is not returned for a review if user does not exist in userRef", ()=>{
        const missingUserRef = {"Bob Smith": 2, "Rachel Cummings": 8};

        expect(insertReviews(multiplePropertiesRef, missingUserRef, reviewData)).toEqual(expectedOutcome);
    });
    test("formatted review data is not returned for a review if its review data has no property_name key", ()=>{
        const noPropertyReview = [
            {
                "guest_name": "Bob Smith",
                "property_name": "Modern Apartment in City Center",
                "rating": 2,
                "comment": "Comment about Modern Apartment in City Center",
                "created_at": "2024-04-12T14:45:00Z"
            },
            {
                "guest_name": "Frank White",
                "rating": 3,
                "comment": "Comment about Chic Studio Near the Beach",
                "created_at": "2025-04-04T12:10:00Z"
            }
        ];

        expect(insertReviews(multiplePropertiesRef, multipleUsersRef, noPropertyReview)).toEqual(expectedOutcome);
    });
    test("formatted review data is not returned for a review if its review data has no guest_name key", ()=>{
        const noGuestReview = [
            {
                "guest_name": "Bob Smith",
                "property_name": "Modern Apartment in City Center",
                "rating": 2,
                "comment": "Comment about Modern Apartment in City Center",
                "created_at": "2024-04-12T14:45:00Z"
            },
            {
                "property_name": "Chic Studio Near the Beach",
                "rating": 3,
                "comment": "Comment about Chic Studio Near the Beach",
                "created_at": "2025-04-04T12:10:00Z"
            }
        ];

        expect(insertReviews(multiplePropertiesRef, multipleUsersRef, noGuestReview)).toEqual(expectedOutcome);
    });
    test("the inputted array is not mutated", ()=>{
        insertReviews(multiplePropertiesRef, multipleUsersRef, reviewData); 

        expect(reviewData).toEqual([
            {
                "guest_name": "Bob Smith",
                "property_name": "Modern Apartment in City Center",
                "rating": 2,
                "comment": "Comment about Modern Apartment in City Center",
                "created_at": "2024-04-12T14:45:00Z"
            },
            {
                "guest_name": "Frank White",
                "property_name": "Chic Studio Near the Beach",
                "rating": 3,
                "comment": "Comment about Chic Studio Near the Beach",
                "created_at": "2025-04-04T12:10:00Z"
            }
        ]);
    });
    test("the inputted objects are not mutated", ()=>{
        insertReviews(multiplePropertiesRef, multipleUsersRef, reviewData); 

        expect(multipleUsersRef).toEqual({"Bob Smith": 2, "Frank White": 3});
        expect(multiplePropertiesRef).toEqual({"Modern Apartment in City Center" : 1, "Chic Studio Near the Beach": 2});
    });
    test("the output is a new array", ()=>{
        const output = insertReviews(multiplePropertiesRef, multipleUsersRef, reviewData); 

        expect(reviewData).not.toBe(output);
    })
});