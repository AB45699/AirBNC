const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");

afterAll(() => {
  db.end();
});

describe("app", () => {
  test("for an invalid path, responds with status code of 404 and error message", async () => {
    const { body } = await request(app).get("/invalid/path").expect(404);

    expect(body.msg).toBe("Path not found");
  });
  describe("GET /api/properties", () => {
    test("should respond with a status code of 200", async () => {
      await request(app).get("/api/properties").expect(200);
    });
    test("responds with an array on the key of properties", async () => {
      const { body } = await request(app).get("/api/properties");

      expect(Array.isArray(body.properties)).toBe(true);
    });
    test("each property object has property_id, property_name, location, price_per_night, and host keys", async () => {
      const { body } = await request(app).get("/api/properties");

      body.properties.forEach((property) => {
        expect(property).toHaveProperty("property_id");
        expect(property).toHaveProperty("property_name");
        expect(property).toHaveProperty("location");
        expect(property).toHaveProperty("price_per_night");
        expect(property).toHaveProperty("host");
      });
    });
    test("the length of the returned array should be 20 to reflect total number of properties", async () => {
      const { body } = await request(app).get("/api/properties");

      expect(body.properties.length).toBe(20);
    });
    test("responds with properties ordered by favourites and tied properties are ordered by id", async () => {
      const { body } = await request(app).get("/api/properties");
      const expectedOrder = [
        "Luxury Penthouse with View",
        "Quaint Cottage in the Hills",
        "Seafront Villa with Infinity Pool",
        "Lakeside Luxury Villa",
        "Elegant City Apartment",
        "Modern Apartment in City Center",
        "Mountain View Chalet",
        "Stylish Loft in Shoreditch",
        "Cosy Loft in the Heart of the City",
        "Cosy Country Cottage",
        "Cosy Family House",
        "Chic Studio Near the Beach",
        "Charming Studio Retreat",
        "Spacious Countryside House",
        "Seaside Studio Getaway",
        "Bright and Airy Studio",
        "Coastal Retreat with Garden",
        "Urban Loft with Modern Amenities",
        "Forest Hideaway Cabin",
        "Historic Castle Stay"
      ];

      body.properties.forEach((property, index) => {
        expect(property.property_name).toBe(expectedOrder[index]);
      });
    });
    describe("optional queries", ()=>{
        describe("sort queries", ()=>{
            test("price_per_night - properties ordered by price (high to low); tied are ordered by id", async () => {
                const { body } = await request(app).get("/api/properties?sort=price_per_night");
                 const pricePerNightToInt = body.properties.map((property) => ({
                    ...property, 
                    price_per_night: Number(property.price_per_night)
                }));

                expect(pricePerNightToInt).toBeSortedBy("price_per_night", {descending: true});
            });
            test("popularity - properties ordered by rating (high to low); tied are ordered by id", async () => {
                const { body } = await request(app).get("/api/properties?sort=popularity");
                const expectedOrder = [
                    "Modern Apartment in City Center",
                    "Charming Studio Retreat", 
                    "Luxury Penthouse with View", 
                    "Quaint Cottage in the Hills", 
                    "Cosy Family House", 
                    "Elegant City Apartment", 
                    "Spacious Countryside House", 
                    "Seaside Studio Getaway", 
                    "Chic Studio Near the Beach", 
                    "Cosy Loft in the Heart of the City", 
                    "Bright and Airy Studio", 
                    "Coastal Retreat with Garden", 
                    "Urban Loft with Modern Amenities", 
                    "Forest Hideaway Cabin", 
                    "Seafront Villa with Infinity Pool", 
                    "Mountain View Chalet", 
                    "Cosy Country Cottage", 
                    "Stylish Loft in Shoreditch", 
                    "Historic Castle Stay", 
                    "Lakeside Luxury Villa"
                ];

                body.properties.forEach((property, index) => {
                expect(property.property_name).toBe(expectedOrder[index]);
                });
            });
            test("400: invalid sort query", async ()=> {
                const  { body: { msg } } = await request(app).get("/api/properties?sort=invalid").expect(400);

                expect(msg).toBe("Invalid sort query");
            });
        });
        describe("order queries", ()=>{
            test("ascending (asc) - when used alone, properties are returned by favourities (low to high); tied are ordered by id", async ()=>{
                const { body } = await request(app).get("/api/properties?order=asc");
                const expectedOrder =  [
                    'Cosy Family House',
                    'Chic Studio Near the Beach',
                    'Charming Studio Retreat',
                    'Spacious Countryside House',
                    'Seaside Studio Getaway',
                    'Bright and Airy Studio',
                    'Coastal Retreat with Garden',
                    'Urban Loft with Modern Amenities',
                    'Forest Hideaway Cabin',
                    'Historic Castle Stay',
                    'Cosy Loft in the Heart of the City',
                    'Cosy Country Cottage',
                    'Modern Apartment in City Center',
                    'Mountain View Chalet',
                    'Stylish Loft in Shoreditch',
                    'Elegant City Apartment',
                    'Luxury Penthouse with View',
                    'Quaint Cottage in the Hills',
                    'Seafront Villa with Infinity Pool',
                    'Lakeside Luxury Villa'
                ];

                
                body.properties.forEach((property, index) => {
                expect(property.property_name).toBe(expectedOrder[index]);
                });
            });
            test("descending (desc) - when used alone, properties are returned by favourities (high to low); tied are ordered by id", async () => {
                const { body } = await request(app).get("/api/properties?order=desc");
                const expectedOrder = [
                    "Luxury Penthouse with View",
                    "Quaint Cottage in the Hills",
                    "Seafront Villa with Infinity Pool",
                    "Lakeside Luxury Villa",
                    "Elegant City Apartment",
                    "Modern Apartment in City Center",
                    "Mountain View Chalet",
                    "Stylish Loft in Shoreditch",
                    "Cosy Loft in the Heart of the City",
                    "Cosy Country Cottage",
                    "Cosy Family House",
                    "Chic Studio Near the Beach",
                    "Charming Studio Retreat",
                    "Spacious Countryside House",
                    "Seaside Studio Getaway",
                    "Bright and Airy Studio",
                    "Coastal Retreat with Garden",
                    "Urban Loft with Modern Amenities",
                    "Forest Hideaway Cabin",
                    "Historic Castle Stay"
                ];

                body.properties.forEach((property, index) => {
                expect(property.property_name).toBe(expectedOrder[index]);
                });
            });
            test("400: invalid order query", async ()=>{
                const  { body: { msg } } = await request(app).get("/api/properties?order=invalid").expect(400);

                expect(msg).toBe("Invalid order query")
            });
        });
        test("combined query: returns properties in asc order by price per night; tied are ordered by id", async ()=>{
                const { body } = await request(app).get("/api/properties?sort=price_per_night&order=asc");
                const pricePerNightToInt = body.properties.map((property) => ({
                    ...property, 
                    price_per_night: Number(property.price_per_night)
                }));

                expect(pricePerNightToInt).toBeSortedBy("price_per_night");
            });
    });


  });
  describe("GET /api/properties/:id", () => {
    test("should respond with a status code of 200", async () => {
        await request(app).get("/api/properties/2").expect(200);
    });
    test("responds with an object on the key of property", async () => {
        const { body } = await request(app).get("/api/properties/2");
        
        expect(typeof body.property).toBe("object");
        expect(Array.isArray(body.property)).toBe(false);
    });
    test.each([
        [4, "Elegant City Apartment"],
        [8, "Seaside Studio Getaway"],
    ])("id %i as the parameter returns the correct property name: %s", async (id, expectedPropertyName) => {
        const { body } = await request(app).get(`/api/properties/${id}`);
        
        expect(body.property.property_name).toBe(expectedPropertyName);
    });
    test("the object on the property key has property_id, property_name, location, price_per_night, description, host, host_avatar, and favourite_count keys", async () => {
        const { body } = await request(app).get("/api/properties/2");

        expect(body.property.property_id).toBe(2);
        expect(body.property.property_name).toBe("Cosy Family House");
        expect(body.property.location).toBe("Manchester, UK");
        expect(body.property.price_per_night).toBe("150");
        expect(body.property.description).toBe("A spacious home perfect for families looking to explore the city.");
        expect(body.property.host).toBe("Alice Johnson");
        expect(body.property.host_avatar).toBe("https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
        expect(body.property.favourite_count).toBe("0");
    });
    test("400: invalid property id", async () => {
        const { body } = await request(app).get("/api/properties/invalid-id").expect(400); 

        expect(body.msg).toBe("Bad request");
    });
    test("404: valid but non existent property id", async ()=>{
        const { body } = await request(app).get("/api/properties/938476").expect(404);

        expect(body.msg).toBe("Property not found");
    });
    describe("optional query - user_id", ()=>{
        test("when user_id query is used, the object on the property key has a 'favourited' key added", async () => {
            const { body } = await request(app).get("/api/properties/17?user_id=2");
           
            expect(body.property).toHaveProperty("favourited");
        });
        test("there is no favourited key on the object on the property key if user_id query is not used", async ()=>{
            const { body } = await request(app).get("/api/properties/17");

            expect(body.property).not.toHaveProperty("favourited");
        })
        test("the favourited key has a value of true for a user who favourited the specific property", async () => {
            const { body } = await request(app).get("/api/properties/17?user_id=2");

            expect(body.property.favourited).toBe("true");
        });
        test("the favourited key has a value of false for a user who did not favourite the specific property", async () => {
            const { body } = await request(app).get("/api/properties/19?user_id=2");

            expect(body.property.favourited).toBe("false");
        });
        test("400: invalid user_id", async () => {
        const { body } = await request(app).get("/api/properties/17?user_id=invalid").expect(400); 

        expect(body.msg).toBe("Bad request");
        });
        test("404: valid but non existent user_id", async ()=>{
        const { body } = await request(app).get("/api/properties/17?user_id=938476").expect(404);
      
        expect(body.msg).toBe("User not found");
        });
    })

  })
});
