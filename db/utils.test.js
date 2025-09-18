const createUsersRef = require("./utils.js");

describe("createUsersRef", ()=>{
    test("returns an object", ()=>{
        expect(typeof createUsersRef([])).toBe("object");
        expect(Array.isArray(createUsersRef([]))).toBe(false);
    });
    test("an empty input array returns an empty object", ()=>{
        expect(createUsersRef([])).toEqual({})
    });
    test("assigns first_name and surname as the key on the ref object for one user", ()=>{
        const user = [{ first_name: 'Alice', surname: 'Johnson', user_id: 1, is_host: true }];
        const userRef = createUsersRef(user)

        expect(userRef).toHaveProperty("Alice Johnson");
    });
    test("assigns users_id as the value to the full name key for one user", ()=>{
        const user = [{ first_name: 'Alice', surname: 'Johnson', user_id: 1, is_host: true }];
        const userRef = createUsersRef(user)

        expect(userRef["Alice Johnson"]).toBe(1);
    });
    test("assigns first_name and surname as the key on the ref object for multiple users", ()=>{
        const user = [
            { first_name: 'Alice', surname: 'Johnson', user_id: 1, is_host: true },
            { first_name: 'Emma', surname: 'Davis', user_id: 3, is_host: true }

        ];
        const userRef = createUsersRef(user)

        expect(userRef).toHaveProperty("Alice Johnson");
        expect(userRef).toHaveProperty("Emma Davis");
    });
    test("assigns users_id as the value to the full name key for multiple users", ()=>{
        const user = [
            { first_name: 'Alice', surname: 'Johnson', user_id: 1, is_host: true },
            { first_name: 'Emma', surname: 'Davis', user_id: 3, is_host: true }

        ];
        const userRef = createUsersRef(user)

        expect(userRef["Alice Johnson"]).toBe(1);
        expect(userRef["Emma Davis"]).toBe(3);
    });
    test("the input array is not mutated", ()=>{
        const input = [
            { first_name: 'Alice', surname: 'Johnson', user_id: 1, is_host: true },
            { first_name: 'Emma', surname: 'Davis', user_id: 3, is_host: true }

        ];

        createUsersRef(input);
        expect(input).toEqual([
            { first_name: 'Alice', surname: 'Johnson', user_id: 1, is_host: true },
            { first_name: 'Emma', surname: 'Davis', user_id: 3, is_host: true }

        ])
    });
    test("the objects within the output object are new", ()=>{
        //
    })
})