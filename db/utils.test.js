const createHostsRef = require("./utils.js");

describe("createHostsRef", () => {
  test("returns an object", () => {
    expect(typeof createHostsRef([])).toBe("object");
    expect(Array.isArray(createHostsRef([]))).toBe(false);
  });
  test("an empty input array returns an empty object", () => {
    expect(createHostsRef([])).toEqual({});
  });
  test("assigns first_name and surname as the key on the ref object for one user", () => {
    const user = [
      { first_name: "Alice", surname: "Johnson", user_id: 1, is_host: true },
    ];
    const hostRef = createHostsRef(user);

    expect(hostRef).toHaveProperty("Alice Johnson");
  });
  test("assigns user_id as the value to the host name key for one user", () => {
    const user = [
      { first_name: "Alice", surname: "Johnson", user_id: 1, is_host: true },
    ];
    const hostRef = createHostsRef(user);

    expect(hostRef["Alice Johnson"]).toBe(1);
  });
  test("if is_host property is false, an empty object is returned, for one user", () => {
    const user = [
      { first_name: "Alice", surname: "Johnson", user_id: 1, is_host: false },
    ];

    expect(createHostsRef(user)).toEqual({});
  });
  test("assigns first_name and surname as the key on the ref object for multiple users", () => {
    const users = [
      { first_name: "Alice", surname: "Johnson", user_id: 1, is_host: true },
      { first_name: "Emma", surname: "Davis", user_id: 3, is_host: true },
    ];
    const hostRef = createHostsRef(users);

    expect(hostRef).toHaveProperty("Alice Johnson");
    expect(hostRef).toHaveProperty("Emma Davis");
  });
  test("assigns user_id as the value to the host name key for multiple users", () => {
    const users = [
      { first_name: "Alice", surname: "Johnson", user_id: 1, is_host: true },
      { first_name: "Emma", surname: "Davis", user_id: 3, is_host: true },
    ];
    const hostRef = createHostsRef(users);

    expect(hostRef["Alice Johnson"]).toBe(1);
    expect(hostRef["Emma Davis"]).toBe(3);
  });
  test("with multiple users, only hosts are returned in the reference object", () => {
    const users = [
      { first_name: "Alice", surname: "Johnson", user_id: 1, is_host: true },
      { first_name: "Bob", surname: "Smith", user_id: 2, is_host: false },
      { first_name: "Emma", surname: "Davis", user_id: 3, is_host: true },
    ];
    const hostRef = createHostsRef(users);

    expect(hostRef).toHaveProperty("Alice Johnson");
    expect(hostRef).not.toHaveProperty("Bob Smith");
    expect(hostRef).toHaveProperty("Emma Davis");
  });
  test("the input array is not mutated", () => {
    const input = [
      { first_name: "Alice", surname: "Johnson", user_id: 1, is_host: true },
      { first_name: "Emma", surname: "Davis", user_id: 3, is_host: true },
    ];

    createHostsRef(input);
    expect(input).toEqual([
      { first_name: "Alice", surname: "Johnson", user_id: 1, is_host: true },
      { first_name: "Emma", surname: "Davis", user_id: 3, is_host: true },
    ]);
  });
});
