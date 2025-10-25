const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seed.js");
const { propertyTypesData, usersData, propertiesData, reviewsData, imagesData, favouritesData, bookingsData } = require("../db/data/dev/index.js");
const pricerPerNightToInt = require("../db/utility-functions/pricePerNightToInt.js");

beforeEach(async () => {
  await seed( propertyTypesData, usersData, propertiesData, reviewsData, imagesData, favouritesData, bookingsData);
});

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
        "Historic Castle Stay",
      ];

      body.properties.forEach((property, index) => {
        expect(property.property_name).toBe(expectedOrder[index]);
      });
    });
    describe("optional queries", () => {
      describe("sort queries", () => {
        test("price_per_night - properties ordered by price (high to low)", async () => {
          const { body } = await request(app).get("/api/properties?sort=price_per_night");
          const convertedPropertyPrices = pricerPerNightToInt(body.properties);

          expect(convertedPropertyPrices).toBeSortedBy("price_per_night", { descending: true });
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
            "Lakeside Luxury Villa",
          ];

          body.properties.forEach((property, index) => {
            expect(property.property_name).toBe(expectedOrder[index]);
          });
        });
        test("400: invalid sort query", async () => {
          const { body } = await request(app).get("/api/properties?sort=invalid").expect(400);

          expect(body.msg).toBe("Invalid sort query");
        });
        test("sort queries are case insensitive", async ()=>{
          await request(app).get("/api/properties?sort=PrIcE_peR_nIGht").expect(200);
          await request(app).get("/api/properties?sort=pOPULariTY").expect(200);
        })
      });
      describe("order queries", () => {
        test("ascending (asc) - properties are returned by favourities (low to high); tied are ordered by id", async () => {
          const { body } = await request(app).get("/api/properties?order=asc");
          const expectedOrder = [
            "Cosy Family House",
            "Chic Studio Near the Beach",
            "Charming Studio Retreat",
            "Spacious Countryside House",
            "Seaside Studio Getaway",
            "Bright and Airy Studio",
            "Coastal Retreat with Garden",
            "Urban Loft with Modern Amenities",
            "Forest Hideaway Cabin",
            "Historic Castle Stay",
            "Cosy Loft in the Heart of the City",
            "Cosy Country Cottage",
            "Modern Apartment in City Center",
            "Mountain View Chalet",
            "Stylish Loft in Shoreditch",
            "Elegant City Apartment",
            "Luxury Penthouse with View",
            "Quaint Cottage in the Hills",
            "Seafront Villa with Infinity Pool",
            "Lakeside Luxury Villa",
          ];

          body.properties.forEach((property, index) => {
            expect(property.property_name).toBe(expectedOrder[index]);
          });
        });
        test("descending (desc) - properties are returned by favourities (high to low); tied are ordered by id", async () => {
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
            "Historic Castle Stay",
          ];

          body.properties.forEach((property, index) => {
            expect(property.property_name).toBe(expectedOrder[index]);
          });
        });
        test("400: invalid order query", async () => {
          const { body } = await request(app).get("/api/properties?order=invalid").expect(400);

          expect(body.msg).toBe("Invalid order query");
        });
      });
      describe("limit by price query", () => {
        describe("maxprice", () => {
          test("should return all properties with a price_per_night less than or equal to maxprice value", async () => {
            const { body } = await request(app).get("/api/properties?maxprice=200");
            const convertedPropertyPrices = pricerPerNightToInt(body.properties);

            convertedPropertyPrices.forEach((property) => {
              expect(property.price_per_night).toBeLessThanOrEqual(200);
            });
          });
          test("returns 200 and an empty array if no properties are available with the condition", async () => {
            const { body } = await request(app).get("/api/properties?maxprice=0").expect(200);

            expect(body.properties).toEqual([]);
          });
          test("400: invalid price queries", async () => {
            const { body } = await request(app).get("/api/properties?maxprice=invalid").expect(400);

            expect(body.msg).toBe("Bad request");
          });
        });
        describe("minprice", () => {
          test("minprice: should return all properties with a price_per_night more than or equal to minprice value", async () => {
            const { body } = await request(app).get("/api/properties?minprice=250");
            const convertedPropertyPrices = pricerPerNightToInt(body.properties);

            convertedPropertyPrices.forEach((property) => {
              expect(property.price_per_night).toBeGreaterThanOrEqual(250);
            });
          });
          test("returns 200 and an empty array if no properties are available with the condition", async () => {
            const { body } = await request(app).get("/api/properties?minprice=20000").expect(200);

            expect(body.properties).toEqual([]);
          });
          test("400: invalid price queries", async () => {
            const { body } = await request(app).get("/api/properties?minprice=invalid").expect(400);

            expect(body.msg).toBe("Bad request");
          });
        });
      });
      describe("property type query", () => {
        const expectedApartmentOrder = [
          "Luxury Penthouse with View",
          "Elegant City Apartment",
          "Modern Apartment in City Center",
          "Cosy Loft in the Heart of the City",
        ];
        const expectedVillaOrder = [
          "Seafront Villa with Infinity Pool",
          "Lakeside Luxury Villa",
        ];
        const expectedLoftOrder = [
          "Stylish Loft in Shoreditch",
          "Urban Loft with Modern Amenities",
        ];
        test.each([
          ["Apartment", expectedApartmentOrder],
          ["Villa", expectedVillaOrder],
          ["Loft", expectedLoftOrder],
        ])(
          "property type query %s as the parameter returns the correct properties, in desc. order by favourites",
          async (propertyType, expectedOrder) => {
            const { body } = await request(app).get(`/api/properties?property_type=${propertyType}`);

            expectedOrder.forEach((expectedProperty, index) => {
              expect(body.properties[index].property_name).toBe(expectedProperty);
            });
          }
        );
        test("responds with 200 and an empty array for a property type with zero properties", async () => {
          const { body } = await request(app).get("/api/properties?property_type=Bungalow").expect(200);

          expect(body.properties).toEqual([]);
        });
        test("404: non-existent property type", async () => {
          const { body } = await request(app).get("/api/properties?property_type=non-existent").expect(404);

          expect(body.msg).toBe("Property type not found");
        });
      });
      describe("combined queries", () => {
        test("returns properties in asc order by price per night", async () => {
          const { body } = await request(app).get("/api/properties?sort=price_per_night&order=asc");
          const convertedPropertyPrices = pricerPerNightToInt(body.properties);

          expect(convertedPropertyPrices).toBeSortedBy("price_per_night");
        });
        test("returns properties in asc order by price per night and minimum price is 300", async () => {
          const { body } = await request(app).get("/api/properties?sort=price_per_night&minprice=300&order=asc");
          const convertedPropertyPrices = pricerPerNightToInt(body.properties);

          expect(convertedPropertyPrices).toBeSortedBy("price_per_night");

          convertedPropertyPrices.forEach((property) => {
            expect(property.price_per_night).toBeGreaterThanOrEqual(300);
          });
        });
        test("returns properties in asc order by price per night, minprice 120, and property type is apartment", async () => {
          const { body } = await request(app).get("/api/properties?sort=price_per_night&minprice=120&order=asc&property_type=Apartment");
          const convertedPropertyPrices = pricerPerNightToInt(body.properties);
          const expectedOrder = ["Modern Apartment in City Center", "Cosy Loft in the Heart of the City", "Luxury Penthouse with View"];

          expect(convertedPropertyPrices).toBeSortedBy("price_per_night");

          convertedPropertyPrices.forEach((property, index) => {
            expect(property.price_per_night).toBeGreaterThanOrEqual(120);
            expect(property.property_name).toBe(expectedOrder[index]);
          });
        });
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
    ])(
      "id %i as the parameter returns the correct property name: %s",
      async (id, expectedPropertyName) => {
        const { body } = await request(app).get(`/api/properties/${id}`);

        expect(body.property.property_name).toBe(expectedPropertyName);
      }
    );
    test("the object on the property key has property_id, property_name, location, price_per_night, description, host, host_avatar, and favourite_count keys", async () => {
      const { body } = await request(app).get("/api/properties/2");

      expect(body.property.property_id).toBe(2);
      expect(body.property.property_name).toBe("Cosy Family House");
      expect(body.property.location).toBe("Manchester, UK");
      expect(body.property.price_per_night).toBe("150");
      expect(body.property.description).toBe(
        "A spacious home perfect for families looking to explore the city."
      );
      expect(body.property.host).toBe("Alice Johnson");
      expect(body.property.host_avatar).toBe(
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
      expect(body.property.favourite_count).toBe("0");
    });
    test("400: invalid property id", async () => {
      const { body } = await request(app)
        .get("/api/properties/invalid-id")
        .expect(400);

      expect(body.msg).toBe("Bad request");
    });
    test("404: valid but non existent property id", async () => {
      const { body } = await request(app)
        .get("/api/properties/938476")
        .expect(404);

      expect(body.msg).toBe("Property not found");
    });
    describe("optional query - user_id", () => {
      test("when user_id query is used, the object on the property key has a 'favourited' key added", async () => {
        const { body } = await request(app).get("/api/properties/17?user_id=2");

        expect(body.property).toHaveProperty("favourited");
      });
      test("there is no favourited key on the object on the property key if user_id query is not used", async () => {
        const { body } = await request(app).get("/api/properties/17");

        expect(body.property).not.toHaveProperty("favourited");
      });
      test("the favourited key has a value of true for a user who favourited the specific property", async () => {
        const { body } = await request(app).get("/api/properties/17?user_id=2");

        expect(body.property.favourited).toBe("true");
      });
      test("the favourited key has a value of false for a user who did not favourite the specific property", async () => {
        const { body } = await request(app).get("/api/properties/19?user_id=2");

        expect(body.property.favourited).toBe("false");
      });
      test("400: invalid user_id", async () => {
        const { body } = await request(app)
          .get("/api/properties/17?user_id=invalid")
          .expect(400);

        expect(body.msg).toBe("Bad request");
      });
      test("404: valid but non existent user_id", async () => {
        const { body } = await request(app)
          .get("/api/properties/17?user_id=938476")
          .expect(404);

        expect(body.msg).toBe("User not found");
      });
    });
  });
  describe("POST /api/properties/:id/reviews", () => {
    test("responds with a status of 201", async () => {
      const testReview = { guest_id: 5, rating: 5, comment: "test review" };

      await request(app)
        .post("/api/properties/4/reviews")
        .send(testReview)
        .expect(201);
    });
    test("responds with a newly inserted review with a new review_id, and property_id, guest_id, rating, comment, and created_at keys", async () => {
      const testReview = { guest_id: 5, rating: 5, comment: "test review" };
      const { body } = await request(app)
        .post("/api/properties/4/reviews")
        .send(testReview)
        .expect(201);

      expect(body.propertyReview.review_id).toBe(12),
      expect(body.propertyReview.property_id).toBe(4),
      expect(body.propertyReview.guest_id).toBe(5),
      expect(body.propertyReview.rating).toBe(5),
      expect(body.propertyReview.comment).toBe("test review"),
      expect(body.propertyReview).toHaveProperty("created_at");
    });
    describe("error handling", () => {
      test("400: guest_id not provided", async () => {
        const testReview = { rating: 5, comment: "test review" };
        const { body } = await request(app)
          .post("/api/properties/4/reviews")
          .send(testReview)
          .expect(400);

        expect(body.msg).toBe("Bad request");
      });
      test("400: rating not provided", async () => {
        const testReview = { guest_id: 5, comment: "test review" };
        const { body } = await request(app)
          .post("/api/properties/4/reviews")
          .send(testReview)
          .expect(400);

        expect(body.msg).toBe("Bad request");
      });
      test("responds with a newly inserted review even if comment is not provided", async () => {
        const testReview = { guest_id: 5, rating: 5 };
        const { body } = await request(app)
          .post("/api/properties/4/reviews")
          .send(testReview)
          .expect(201);

          expect(body.propertyReview.review_id).toBe(12),
          expect(body.propertyReview.property_id).toBe(4),
          expect(body.propertyReview.guest_id).toBe(5),
          expect(body.propertyReview.rating).toBe(5),
          expect(body.propertyReview.comment).toBe(null),
          expect(body.propertyReview).toHaveProperty("created_at");
      });
      test("400: invalid property id", async () => {
        const testReview = { guest_id: 5, rating: 5, comment: "test review" };
        const { body } = await request(app)
          .post("/api/properties/invalid-id/reviews")
          .send(testReview)
          .expect(400);

        expect(body.msg).toBe("Bad request");
      });
      test("404: valid but non-existent property id", async () => {
        const testReview = { guest_id: 5, rating: 5, comment: "test review" };
        const { body } = await request(app)
          .post("/api/properties/40000/reviews")
          .send(testReview)
          .expect(404);

        expect(body.msg).toBe("Property not found");
      });
      test("400: guest_id invalid (not an integer)", async () => {
        const testReview = { guest_id: "invalid", rating: 5, comment: "test review" };
        const { body } = await request(app)
          .post("/api/properties/4/reviews")
          .send(testReview)
          .expect(400);

        expect(body.msg).toBe("Bad request");
      });
      test("404: valid but non-existent guest_id", async () => {
        const testReview = { guest_id: 400, rating: 5, comment: "test review" };
        const { body } = await request(app)
          .post("/api/properties/4/reviews")
          .send(testReview)
          .expect(404);

        expect(body.msg).toBe("Guest not found");
      });
      test("400: rating invalid (not an integer)", async () => {
        const testReview = { guest_id: 5, rating: "invalid", comment: "test review" };
        const { body } = await request(app)
          .post("/api/properties/4/reviews")
          .send(testReview)
          .expect(400);

        expect(body.msg).toBe("Bad request");
      });
      test.each([
        [6, 400, "Bad request"],
        [0, 400, "Bad request"],
        [1, 201, undefined],
      ])(
        "rating >= 1 or <=5: %i  returns the correct status code '%s' and message '%s'", async (rating, status, message) => {
          const testReview = { guest_id: 5, rating: rating, comment: "test review" };
          const { body } = await request(app)
            .post("/api/properties/4/reviews")
            .send(testReview)
            .expect(status);

          expect(body.msg).toBe(message);
        }
      );
      test("400: comment is not a string", async () => {
        const testReview = { guest_id: 5, rating: 5, comment: 123 };
        const { body } = await request(app)
          .post("/api/properties/4/reviews")
          .send(testReview)
          .expect(400);

        expect(body.msg).toBe("Bad request");
      });
    });
  });
  describe("GET /api/properties/:id/reviews", () => {
    test("should respond with a status code of 200", async () => {
      await request(app).get("/api/properties/5/reviews").expect(200);
    });
    test("responds with an array on the key of reviews", async () => {
      const { body } = await request(app).get("/api/properties/10/reviews");

      expect(Array.isArray(body.reviews)).toBe(true);
    });
    test("each review object has review_id, comment, rating, created_at, guest, and guest_avatar keys", async () => {
      const { body } = await request(app).get("/api/properties/10/reviews");

      body.reviews.forEach((review) => {
        expect(review).toHaveProperty("review_id");
        expect(review).toHaveProperty("comment");
        expect(review).toHaveProperty("rating");
        expect(review).toHaveProperty("created_at");
        expect(review).toHaveProperty("guest");
        expect(review).toHaveProperty("guest_avatar");
      });
    });
    test.each([
      [2, 10],
      [0, 19],
      [1, 4],
    ])(
      "the length of the returned array should be: %i to reflect total number of reviews for the property with id: %i", async (length, property_id) => {
        const { body } = await request(app).get(`/api/properties/${property_id}/reviews`);

        expect(body.reviews.length).toBe(length);
      }
    );
    test("responds with reviews ordered by newest to oldest", async () => {
      const { body } = await request(app).get("/api/properties/10/reviews");

      expect(body.reviews).toBeSortedBy("created_at", { descending: true });
    });
    test("the body has a key of average rating", async () => {
      const { body } = await request(app).get("/api/properties/10/reviews");

      expect(body.average_rating).toBe(4.5);
    });
    describe("error handling", () => {
      test("400: invalid property id", async () => {
        const { body } = await request(app).get("/api/properties/invalid-id/reviews").expect(400);

        expect(body.msg).toBe("Bad request");
      });
      test("404: valid but non-existent property id", async () => {
        const { body } = await request(app).get("/api/properties/40000/reviews").expect(404);

        expect(body.msg).toBe("Property not found");
      });
      test("for a valid property with no reviews, an empty array is returned", async () => {
        const { body } = await request(app).get("/api/properties/19/reviews");

        expect(body.reviews).toEqual([]);
      });
    });
  });
  describe("DELETE /api/reviews/:id", () => {
    test("should respond with a status code of 204 and no body", async () => {
      const { body } = await request(app).delete("/api/reviews/3").expect(204);

      expect(body).toEqual({});
    });
    test("the database deletes the review specified", async () => {
      const currentReview = await db.query(`SELECT review_id FROM reviews WHERE review_id = 3;`);

      expect(currentReview.rows.length).toBe(1);

      await request(app).delete("/api/reviews/3");

      const afterDeletion = await db.query(`SELECT review_id FROM reviews WHERE review_id = 3;`);

      expect(afterDeletion.rows.length).toBe(0);
    });
    test("400: invalid review id", async () => {
      const { body } = await request(app).delete("/api/reviews/inavlid-id").expect(400);

      expect(body.msg).toBe("Bad request");
    });
    test("404: valid but non existent review id", async () => {
      const { body } = await request(app).delete("/api/reviews/3000").expect(404);

      expect(body.msg).toBe("Review not found");
    });
  });
  describe("GET /api/users/:id", () => {
    test("should respond with a status code of 200", async () => {
      await request(app).get("/api/users/3").expect(200);
    });
    test("responds with an object on the key of user", async () => {
      const { body } = await request(app).get("/api/users/3");

      expect(typeof body.user).toBe("object");
      expect(Array.isArray(body.user)).toBe(false);
    });
    test("each user object has user_id, first_name, surname, email, phone_number, avatar, and created_at keys", async () => {
      const { body } = await request(app).get("/api/users/4");

      expect(body.user.user_id).toBe(4);
      expect(body.user.first_name).toBe("Frank");
      expect(body.user.surname).toBe("White");
      expect(body.user.email).toBe("frank@example.com");
      expect(body.user.avatar).toBe(
        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
      expect(body.user).toHaveProperty("created_at");
    });
    test("400: invalid user_id", async () => {
      const { body } = await request(app).get("/api/users/invalid-id").expect(400);

      expect(body.msg).toBe("Bad request");
    });
    test("404: valid but non existent user_id", async () => {
      const { body } = await request(app).get("/api/users/938476").expect(404);

      expect(body.msg).toBe("User not found");
    });
  });
});
