const getAverageRating = require("./getAverageRating.js");

describe("getAverageRating", ()=>{
    test("returns 0 for an empty reviews array", ()=>{
        const reviews = [];
        expect(getAverageRating(reviews)).toBe(0);
    });
    test("returns the same number as the rating for one review", ()=>{
        const reviews = [{
                review_id: 5, 
                comment: "test", 
                rating: 4,
                created_at: "test", 
                guest: "test-name", 
                guest_avatar: "test"
            }];

        expect(getAverageRating(reviews)).toBe(4);
    });
    test("returns the average as the rating for >1 review", ()=>{
        const reviews = [{
                review_id: 5, 
                comment: "test", 
                rating: 4,
                created_at: "test", 
                guest: "test-name", 
                guest_avatar: "test"
            },
            {
                review_id: 5, 
                comment: "test", 
                rating: 3,
                created_at: "test", 
                guest: "test-name", 
                guest_avatar: "test"
            }
        ];

        expect(getAverageRating(reviews)).toBe(3.5);
    });

})