const { createUsersRef, formatUsers } = require("./createUsersRefs.js");

describe("createUsersRef", () => {
  test("returns an object", () => {
    expect(typeof createUsersRef([])).toBe("object");
    expect(Array.isArray(createUsersRef([]))).toBe(false);
  });
  test("an empty input array returns an empty object", () => {
    expect(createUsersRef([])).toEqual({});
  });
  test("assigns first_name and surname (host name) as the key on the ref object for one user", () => {
    const user = [{ first_name: "Alice", surname: "Johnson", user_id: 1 }];
    const userRef = createUsersRef(user);

    expect(userRef).toHaveProperty("Alice Johnson");
  });
  test("assigns user_id as the value to the host name key for one user", () => {
    const user = [{ first_name: "Alice", surname: "Johnson", user_id: 1 }];
    const userRef = createUsersRef(user);

    expect(userRef["Alice Johnson"]).toBe(1);
  });
  test("assigns first_name and surname (host name) as the key on the ref object for multiple users", () => {
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
  test("the returned formatted user has its user_id as the host_id, for one user", () => {
    const userRef = {"Alice Johnson": 1};
    const testUserData = [
      { host_name: "Alice Johnson" }
    ] 

    expect(formatUsers(testUserData, userRef)[0][0]).toBe(1);
  });
  test("the returned formatted users has the user_id as the host_id, for multiple users", () => {
    const usersRef = createUsersRef([
      { first_name: "Alice", surname: "Johnson", user_id: 1 },
      { first_name: "Emma", surname: "Davis", user_id: 3 },
    ]);

    const testUserData = [
      { host_name: "Alice Johnson"},
      { host_name: "Emma Davis"}
    ]

    expect(formatUsers(testUserData, usersRef)[0][0]).toBe(1);
    expect(formatUsers(testUserData, usersRef)[1][0]).toBe(3);

  });
});
