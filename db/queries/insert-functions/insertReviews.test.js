const insertReviews = require("./insertReviews.js");

let inputs;

beforeEach(()=>{
    inputs = [
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
]
});

describe("insertReviews", ()=>{
    test("returns an array", ()=>{
        expect(Array.isArray(insertReviews({}, {}, [{}]))).toBe(true);
    });
    test("returns a nested array", ()=>{
        expect(Array.isArray((insertReviews({}, {}, [{}]))[0])).toBe(true);
    }); 
    test("property id is taken from the propertiesRef object, for one property", ()=>{
        const testPropertyRef = {"Modern Apartment in City Center": 1};
        const testReviewData = [{property_name: "Modern Apartment in City Center"}];

        expect((insertReviews(testPropertyRef, {}, testReviewData))[0][0]).toEqual(1);
    }); 
    test("guest id is taken from the userRef object, for one guest", ()=>{
        const testUserRef = {"Bob Smith": 2};
        const testReviewData = [{guest_name: "Bob Smith"}];

        expect((insertReviews({}, testUserRef, testReviewData))[0][1]).toEqual(2);
    }); 
    test("property id is taken from the propertiesRef object, for multiple properties", ()=>{
        const testPropertyRef = {"Modern Apartment in City Center": 1, "Cosy Family House": 2};
        const testReviewData = [{property_name: "Modern Apartment in City Center"}, {property_name: "Cosy Family House"}];
        const output = (insertReviews(testPropertyRef, {}, testReviewData));

        expect(output[0][0]).toEqual(1);
        expect(output[1][0]).toEqual(2);
    }); 
    test("guest id is taken from the userRef object, for multiple guests", ()=>{
        const testUserRef = {"Bob Smith": 2, "Frank White": 3};
        const testReviewData = [{guest_name: "Bob Smith"}, {guest_name: "Frank White"}];
        const output = (insertReviews({}, testUserRef, testReviewData));

        expect(output[0][1]).toEqual(2);
        expect(output[1][1]).toEqual(3);
    }); 
      test("all other values of reviewData are returned unchanged", ()=>{
        const testUserRef = {"Bob Smith": 2, "Frank White": 3};
        const testPropertyRef = {"Modern Apartment in City Center" : 1, "Cosy Family House": 2}
        const testInput = inputs;

        expect((insertReviews(testPropertyRef, testUserRef, testInput))).toEqual([
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
    test("the inputed array is not mutated", ()=>{
        const testInput = inputs;
        const testUserRef = {"Bob Smith": 2, "Frank White": 3};
        const testPropertyRef = {"Modern Apartment in City Center" : 1, "Cosy Family House": 2};

        insertReviews(testPropertyRef, testUserRef, testInput); 

        expect(testInput).toEqual([
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
    test("the inputed objects are not mutated", ()=>{
        const testInput = inputs;
        const testUserRef = {"Bob Smith": 2, "Frank White": 3};
        const testPropertyRef = {"Modern Apartment in City Center" : 1, "Cosy Family House": 2};

        insertReviews(testPropertyRef, testUserRef, testInput); 

        expect(testUserRef).toEqual({"Bob Smith": 2, "Frank White": 3});
        expect(testPropertyRef).toEqual({"Modern Apartment in City Center" : 1, "Cosy Family House": 2});
    });
    test("the output is a new array", ()=>{
        const testInput = inputs;
        const testUserRef = {"Bob Smith": 2, "Frank White": 3};
        const testPropertyRef = {"Modern Apartment in City Center" : 1, "Cosy Family House": 2};

        const output = insertReviews(testPropertyRef, testUserRef, testInput); 

        expect(testInput).not.toBe(output);
    })
});