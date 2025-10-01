const request = require("supertest"); 
const app = require("../app.js"); 
const db = require("../db/connection.js");

afterAll(()=>{
    db.end()
});

describe("app", ()=> {
    describe("GET /api/properties", ()=> {
        test("should respond with a status code of 200", async ()=> {
            await request(app).get("/api/properties").expect(200);
        });
        test("responds with an array on the key of properties", async ()=> {
            const { body } = await request(app).get("/api/properties");

            expect(Array.isArray(body.properties)).toBe(true);
        });
        test("each property object has property_id, property_name, location, price_per_night, and host keys", async () =>{
            const { body } = await request(app).get("/api/properties");

            body.properties.forEach((property)=>{
                expect(property).toHaveProperty("property_id");
                expect(property).toHaveProperty("property_name");
                expect(property).toHaveProperty("location");
                expect(property).toHaveProperty("price_per_night");
                expect(property).toHaveProperty("host");
            })
        })
    });
});