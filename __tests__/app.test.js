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
            });
        });
        test("the length of the returned array should be 10 to reflect total number of properties", async ()=>{
            const { body } = await request(app).get("/api/properties");

            expect(body.properties.length).toBe(10);
        });
        test("the properties are ordered by how many favourites they have, in descending order", async () =>{
            const { body } = await request(app).get("/api/properties");
            const expectedOrder = [
                "Luxury Penthouse with View", 
                "Seafront Villa with Infinity Pool", 
                "Lakeside Luxury Villa", 
                "Quaint Cottage in the Hills", 
                "Elegant City Apartment", 
                "Mountain View Chalet", 
                "Modern Apartment in City Center", 
                "Stylish Loft in Shoreditch", 
                "Cosy Country Cottage", 
                "Cosy Loft in the Heart of the City"
            ]; 

            body.properties.forEach((property, index) => {
                expect(property.property_name).toBe(expectedOrder[index]);
            });

        })
    });
});