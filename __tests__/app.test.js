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
                const expectedOrder = [
                    "Historic Castle Stay",
                    "Seafront Villa with Infinity Pool",
                    "Lakeside Luxury Villa",
                    "Luxury Penthouse with View",
                    "Stylish Loft in Shoreditch",
                    "Spacious Countryside House",
                    "Urban Loft with Modern Amenities",
                    "Quaint Cottage in the Hills",
                    "Coastal Retreat with Garden",
                    "Mountain View Chalet",
                    "Cosy Family House",
                    "Cosy Loft in the Heart of the City",
                    "Cosy Country Cottage",
                    "Modern Apartment in City Center",
                    "Forest Hideaway Cabin",
                    "Elegant City Apartment",
                    "Bright and Airy Studio",
                    "Seaside Studio Getaway",
                    "Chic Studio Near the Beach",
                    "Charming Studio Retreat"
                ];

                body.properties.forEach((property, index) => {
                expect(property.property_name).toBe(expectedOrder[index]);
                });  
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
            test("invalid sort queries - defaults to returning properties by favourites in descending order", async ()=>{
                const { body } = await request(app).get("/api/properties?sort=ab123");
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
            test("invalid order queries - defaults to returning properties by favourites in descending order", async () => {
                const { body } = await request(app).get("/api/properties?order=ab123");
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
            })
        })
        describe("combined queries", ()=>{
            test("returns price per night in low to high/asc order for a combined query; tied are ordered by id", async ()=>{
                const { body } = await request(app).get("/api/properties?sort=price_per_night&order=asc");
                const expectedOrder =    [
                    'Charming Studio Retreat',
                    'Chic Studio Near the Beach',
                    'Seaside Studio Getaway',
                    'Bright and Airy Studio',
                    'Elegant City Apartment',
                    'Modern Apartment in City Center',
                    'Forest Hideaway Cabin',
                    'Cosy Loft in the Heart of the City',
                    'Cosy Country Cottage',
                    'Cosy Family House',
                    'Mountain View Chalet',
                    'Coastal Retreat with Garden',
                    'Quaint Cottage in the Hills',
                    'Spacious Countryside House',
                    'Urban Loft with Modern Amenities',
                    'Stylish Loft in Shoreditch',
                    'Luxury Penthouse with View',
                    'Lakeside Luxury Villa',
                    'Seafront Villa with Infinity Pool',
                    'Historic Castle Stay'
                ];

                body.properties.forEach((property, index) => {
                expect(property.property_name).toBe(expectedOrder[index]);
                });
            });
            test("invalid sort with valid order returns properties sorted by favourites using the given order; tied ordered by id", async ()=>{
                const { body } = await request(app).get("/api/properties?sort=ab123&order=asc");
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
            test("valid sort with invalid order returns properties sorted by given sort in desc order; tied ordered by id", async () => {
                const { body } = await request(app).get("/api/properties?sort=popularity&order=ab123");
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
            test("invalid sort and order queries returns properties ordered by favourites in desc order; tied ordered by id", async ()=>{
                const { body } = await request(app).get("/api/properties?sort=xyz123&order=ab123");
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
            })

        })
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
    test("the object on the property key has property_id, property_name, location, price_per_night, description, host, host_avatar, and favourite_count keys", async () => {
        const { body } = await request(app).get("/api/properties/2");

        expect(body.property).toHaveProperty("property_id");
        expect(body.property).toHaveProperty("property_name");
        expect(body.property).toHaveProperty("location");
        expect(body.property).toHaveProperty("price_per_night");
        expect(body.property).toHaveProperty("description");
        expect(body.property).toHaveProperty("host");
        expect(body.property).toHaveProperty("host_avatar");
        expect(body.property).toHaveProperty("favourite_count");
    });
    test.each([
        [4, "Elegant City Apartment"],
        [8, "Seaside Studio Getaway"],
    ])("id %i as the parameter returns the correct property name: %s", async (id, expectedPropertyName) => {
        const { body } = await request(app).get(`/api/properties/${id}`);
        
        expect(body.property.property_name).toBe(expectedPropertyName);
    });
    describe("optional query - user_id", ()=>{
        test("when user_id query used, the object on the property key has a 'favourited' key added", async () => {
            const { body } = await request(app).get("/api/properties/2?user_id=3");

            expect(body.property).toHaveProperty("favourited");
        })
    })

  })
});
