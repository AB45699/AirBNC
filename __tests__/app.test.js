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
            test("price_per_night - properties ordered by price (high to low); tied are ordered by id", async ()=>{
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
                })  
            })
        })

    })
  });
});
