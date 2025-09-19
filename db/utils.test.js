const { createUsersRef, formatUsers } = require("./utils.js");

let testUserData;

beforeEach(() => {
  testUserData = [
    {
      name: "Modern Apartment in City Center",
      property_type: "Apartment",
      location: "London, UK",
      price_per_night: 120.0,
      description:
        "Description of Modern Apartment in City Center. A sleek apartment with all modern amenities.",
      host_name: "Alice Johnson",
    },
    {
      name: "Cosy Family House",
      property_type: "House",
      location: "Manchester, UK",
      price_per_night: 150.0,
      description:
        "A spacious home perfect for families looking to explore the city.",
      host_name: "Emma Davis",
    },
  ];
});

describe("createUsersRef", () => {
  test("returns an object", () => {
    expect(typeof createUsersRef([])).toBe("object");
    expect(Array.isArray(createUsersRef([]))).toBe(false);
  });
  test("an empty input array returns an empty object", () => {
    expect(createUsersRef([])).toEqual({});
  });
  test("assigns first_name and surname as the key on the ref object for one user", () => {
    const user = [{ first_name: "Alice", surname: "Johnson", user_id: 1 }];
    const userRef = createUsersRef(user);

    expect(userRef).toHaveProperty("Alice Johnson");
  });
  test("assigns user_id as the value to the host name key for one user", () => {
    const user = [{ first_name: "Alice", surname: "Johnson", user_id: 1 }];
    const userRef = createUsersRef(user);

    expect(userRef["Alice Johnson"]).toBe(1);
  });
  test("assigns first_name and surname as the key on the ref object for multiple users", () => {
    const users = [
      { first_name: "Alice", surname: "Johnson", user_id: 1 },
      { first_name: "Emma", surname: "Davis", user_id: 3 },
    ];
    const usersRef = createUsersRef(users);

    expect(usersRef).toHaveProperty("Alice Johnson");
    expect(usersRef).toHaveProperty("Emma Davis");
  });
  test("assigns user_id as the value to the host name key for multiple users", () => {
    const users = [
      { first_name: "Alice", surname: "Johnson", user_id: 1 },
      { first_name: "Emma", surname: "Davis", user_id: 3 },
    ];
    const usersRef = createUsersRef(users);

    expect(usersRef["Alice Johnson"]).toBe(1);
    expect(usersRef["Emma Davis"]).toBe(3);
  });
  test("the input array is not mutated", () => {
    const input = [
      { first_name: "Alice", surname: "Johnson", user_id: 1 },
      { first_name: "Emma", surname: "Davis", user_id: 3 },
    ];

    createUsersRef(input);
    expect(input).toEqual([
      { first_name: "Alice", surname: "Johnson", user_id: 1 },
      { first_name: "Emma", surname: "Davis", user_id: 3 },
    ]);
  });
});

describe("formatUsers", () => {
  test("returns an array", () => {
    const userRef = createUsersRef([
      { first_name: "Alice", surname: "Johnson", user_id: 1 },
    ]);

    expect(typeof formatUsers(testUserData, userRef)).toBe("object");
    expect(Array.isArray(formatUsers([], {}))).toBe(true);
  });
  test("the returned formatted user has its id as the host_id for one user", () => {
    const userRef = createUsersRef([
      { first_name: "Alice", surname: "Johnson", user_id: 1 },
    ]);

    expect(formatUsers([testUserData[0]], userRef)).toEqual([
      [
        1,
        "Modern Apartment in City Center",
        "London, UK",
        "Apartment",
        120.0,
        "Description of Modern Apartment in City Center. A sleek apartment with all modern amenities.",
      ],
    ]);
  });
  test("the returned formatted user has its id as the host_id for multiple users", () => {
    const usersRef = createUsersRef([
      { first_name: "Alice", surname: "Johnson", user_id: 1 },
      { first_name: "Emma", surname: "Davis", user_id: 3 },
    ]);

    expect(formatUsers(testUserData, usersRef)).toEqual([
      [
        1,
        "Modern Apartment in City Center",
        "London, UK",
        "Apartment",
        120.0,
        "Description of Modern Apartment in City Center. A sleek apartment with all modern amenities.",
      ],
      [
        3, 
        "Cosy Family House", 
        "Manchester, UK", 
        "House", 
        150.0, 
        "A spacious home perfect for families looking to explore the city.",

      ]
    ]);
  });
});
