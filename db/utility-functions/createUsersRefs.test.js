const createUsersRef = require("./createUsersRefs.js");

let userOne, userTwo; 

beforeEach(()=>{
    userOne = {
      first_name: "Alice", 
      surname: "Johnson", 
      user_id: 1
    };

    userTwo = {
      first_name: "Emma", 
      surname: "Davis", 
      user_id: 3
    };
});

describe("createUsersRef", () => {
  test("returns an object", () => {
    expect(typeof createUsersRef([])).toBe("object");
    expect(Array.isArray(createUsersRef([]))).toBe(false);
  });
  test("an empty input array returns an empty object", () => {
    expect(createUsersRef([])).toEqual({});
  });
  test("creates a ref mapping host full name to user_id, for one user", () => {
    const userRef = createUsersRef([userOne]);

    expect(userRef).toHaveProperty("Alice Johnson");
    expect(userRef["Alice Johnson"]).toBe(1);
  });
  test("creates a ref mapping host full name to user_id, for multiple users", () => {
    const usersRef = createUsersRef([userOne, userTwo]);

    expect(usersRef).toHaveProperty("Alice Johnson");
    expect(usersRef).toHaveProperty("Emma Davis");

    expect(usersRef["Alice Johnson"]).toBe(1);
    expect(usersRef["Emma Davis"]).toBe(3);
  });
  test("a ref is not created for a user that does not have a first_name key", ()=>{
    noFirstNameUserData = [
      {surname: "Johnson", user_id: 1},
      {first_name: "Emma", surname: "Davis", user_id: 3}
    ];

    expect(createUsersRef(noFirstNameUserData)).toEqual({"Emma Davis": 3});
  });
  test("a ref is not created for a user that does not have a surname key", ()=>{
    noSurnameUserData = [
      {first_name: "Alice", user_id: 1},
      {first_name: "Emma", surname: "Davis", user_id: 3}
    ];

    expect(createUsersRef(noSurnameUserData)).toEqual({"Emma Davis": 3});
  });
  test("a ref is not created for a user that does not have a user_id key", ()=>{
    noUserIDUserData = [
      {first_name: "Alice", surname: "Johnson"},
      {first_name: "Emma", surname: "Davis", user_id: 3}
    ];
    
    expect(createUsersRef(noUserIDUserData)).toEqual({"Emma Davis": 3});
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