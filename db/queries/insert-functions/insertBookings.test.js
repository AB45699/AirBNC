const insertBookings = require("./insertBookings.js"); 

let multiplePropertiesRef, multipleUsersRef, bookingsData; 

beforeEach(()=>{
    multiplePropertiesRef = {
        "Modern Apartment in City Center": 1, 
        "Cosy Family House": 2
    };

    multipleUsersRef = {
        "Bob Smith": 2, 
        "Frank White": 3
    };

    bookingsData = [
        {
            "property_name": "Modern Apartment in City Center",
            "guest_name": "Bob Smith",
            "check_in_date": "2025-02-15",
            "check_out_date": "2025-02-20"
        },
        {
            "property_name": "Cosy Family House",
            "guest_name": "Frank White",
            "check_in_date": "2025-03-01",
            "check_out_date": "2025-03-05"
        }
    ];
})

describe("insertBookings", ()=> {
    test("returns an array", ()=>{
        expect(Array.isArray(insertBookings({}, {}, []))).toBe(true);
    }); 
    test("returns the property id (i.e. 1) for a single property. Works for one property item", ()=>{
        const singlePropertyRef = {"Modern Apartment in City Center": 1}; 
        const singleBookingsData = [{"property_name": "Modern Apartment in City Center"}];
        const output = insertBookings(singlePropertyRef, {}, singleBookingsData);

        expect(output[0][0]).toBe(1);
    });
    test("returns the user id (i.e. 3) for a single user. Works for one user item", ()=>{
        const singleUserRef = {"Bob Smith": 3}; 
        const singleBookingsData = [{"guest_name": "Bob Smith"}];
        const output = insertBookings({}, singleUserRef, singleBookingsData);

        expect(output[0][1]).toBe(3);
    });
    test("property id and user ids are returned for multiple property/user items", ()=>{
        const output = insertBookings(multiplePropertiesRef, multipleUsersRef, bookingsData);

        expect(output[0][0]).toBe(1);
        expect(output[0][1]).toBe(2);

        expect(output[1][0]).toBe(2);
        expect(output[1][1]).toBe(3);
    });
    test("all other values of bookingsData remain unchanged", ()=>{
        expect(insertBookings(multiplePropertiesRef, multipleUsersRef, bookingsData)).toEqual([
            [
                1,
                2, 
                "2025-02-15",
                "2025-02-20"
            ],
            [
                2,
                3,
                "2025-03-01",
                "2025-03-05"
            ]
        ])
    });
    test("output is a nested array", ()=>{
        const output = insertBookings(multiplePropertiesRef, multipleUsersRef, bookingsData);

        output.forEach((nestedItem)=>{
            expect(Array.isArray(nestedItem)).toBe(true);
        });
    });
    test("the inputted objects are not mutated", ()=>{
        insertBookings(multiplePropertiesRef, multipleUsersRef, bookingsData);

        expect(multiplePropertiesRef).toEqual({"Modern Apartment in City Center": 1, "Cosy Family House": 2});
        expect(multipleUsersRef).toEqual({"Bob Smith": 2, "Frank White": 3});
    });
    test("the inputted array is not mutated", ()=>{
        insertBookings(multiplePropertiesRef, multipleUsersRef, bookingsData);

        expect(bookingsData).toEqual([
            {
                "property_name": "Modern Apartment in City Center",
                "guest_name": "Bob Smith",
                "check_in_date": "2025-02-15",
                "check_out_date": "2025-02-20"
            },
            {
                "property_name": "Cosy Family House",
                "guest_name": "Frank White",
                "check_in_date": "2025-03-01",
                "check_out_date": "2025-03-05"
            }
        ]);
    });
    test("the output is a new array", ()=>{
        const output = insertBookings(multiplePropertiesRef, multipleUsersRef, bookingsData);

        expect(bookingsData).not.toBe(output);
    })
})