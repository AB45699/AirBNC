const insertBookings = require("./insertBookings.js"); 

let multiplePropertiesRef, multipleUsersRef, bookingsData, expectedOutcome; 

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

    expectedOutcome = [
        [
            1,
            2, 
            "2025-02-15",
            "2025-02-20"
        ]
    ];
});

describe("insertBookings", ()=> {
    test("returns an array", ()=>{
        expect(Array.isArray(insertBookings({}, {}, []))).toBe(true);
    }); 
    test("returns property_id and user_id correctly for single booking data", ()=>{
        const singlePropertyRef = {"Modern Apartment in City Center": 1}; 
        const singleUserRef = {"Bob Smith": 2};
        const singleBookingsData = [
            {
                "property_name": "Modern Apartment in City Center",
                "guest_name": "Bob Smith"
            }
        ];
        const output = insertBookings(singlePropertyRef, singleUserRef, singleBookingsData);

        expect(output[0][0]).toBe(1);
        expect(output[0][1]).toBe(2);
    });
    test("property id and user ids are returned correctly for multiple booking data", ()=>{
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
    test("inputting empty bookings data, returns a new empty array", ()=>{
        const emptyBookingsData = [];
        const output = insertBookings(multiplePropertiesRef, multipleUsersRef, emptyBookingsData);

        expect(output).toEqual([]);
        expect(output).not.toBe(emptyBookingsData);
    });
    test("empty ref objects return an empty array", ()=>{
        expect(insertBookings({}, multipleUsersRef, bookingsData)).toEqual([]);
        expect(insertBookings(multiplePropertiesRef, {}, bookingsData)).toEqual([]);
    });
    test("formatted booking data is not returned for a booking if property name doesn't exist in propertyRef", ()=>{
        const missingPropertyRef = {"Chic Studio Near the Beach": 9, "Modern Apartment in City Center": 1};

        expect(insertBookings(missingPropertyRef, multipleUsersRef, bookingsData)).toEqual(expectedOutcome);
    });
    test("formatted booking data is not returned for a booking if guest name doesn't exist in userRef", ()=>{
        const missingUserRef = {"Bob Smith": 2, "Rachel Cummings": 6};

        expect(insertBookings(multiplePropertiesRef, missingUserRef, bookingsData)).toEqual(expectedOutcome);
    });
    test("formatted booking data is not returned for a booking if booking has no property name key", ()=>{
        const noPropertyBooking = [
            {
                "guest_name": "Frank White",
                "check_in_date": "2025-03-01",
                "check_out_date": "2025-03-05"
            },
            {
                "property_name": "Modern Apartment in City Center",
                "guest_name": "Bob Smith",
                "check_in_date": "2025-02-15",
                "check_out_date": "2025-02-20"
            }
        ];

        expect(insertBookings(multiplePropertiesRef, multipleUsersRef, noPropertyBooking)).toEqual(expectedOutcome);
    });
    test("formatted booking data is not returned for a booking if booking has no guest name key", ()=>{
        const noGuestBooking = [
            {
                "property_name": "Cosy Family House",
                "check_in_date": "2025-03-01",
                "check_out_date": "2025-03-05"
            },
            {
                "property_name": "Modern Apartment in City Center",
                "guest_name": "Bob Smith",
                "check_in_date": "2025-02-15",
                "check_out_date": "2025-02-20"
            }
        ];

        expect(insertBookings(multiplePropertiesRef, multipleUsersRef, noGuestBooking)).toEqual(expectedOutcome);
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