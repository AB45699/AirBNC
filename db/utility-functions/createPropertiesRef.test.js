const createPropertiesRef = require("./createPropertiesRef.js");

describe("createPropertiesRef", () => {
  test("returns an object", () => {
    expect(typeof createPropertiesRef([])).toBe("object");
    expect(Array.isArray(createPropertiesRef([]))).toBe(false);
  });
  test("an empty input array returns an empty object", () => {
    expect(createPropertiesRef([])).toEqual({});
  });
  test("assigns name (the property name) as the key on the ref object for one property", () => {
    const property = [
      { name: "Modern Apartment in City Center", property_id: 1 },
    ];
    const propertyRef = createPropertiesRef(property);

    expect(propertyRef).toHaveProperty("Modern Apartment in City Center");
  });
  test("assigns the property_id as the value to the property name key, for one property", () => {
    const property = [
      { name: "Modern Apartment in City Center", property_id: 1 },
    ];
    const propertyRef = createPropertiesRef(property);

    expect(propertyRef["Modern Apartment in City Center"]).toBe(1);
  });
  test("assigns name (the property name) as the key on the ref object for multiple properties", () => {
    const properties = [
      { name: "Modern Apartment in City Center", property_id: 1 },
      { name: "Spacious Countryside House", property_id: 7 },
    ];
    const propertyRef = createPropertiesRef(properties);

    expect(propertyRef).toHaveProperty("Modern Apartment in City Center");
    expect(propertyRef).toHaveProperty("Spacious Countryside House");
  });
  test("assigns the property_id as the value to the property name key, for multiple properties", () => {
    const properties = [
      { name: "Modern Apartment in City Center", property_id: 1 },
      { name: "Spacious Countryside House", property_id: 7 },
    ];
    const propertyRef = createPropertiesRef(properties);

    expect(propertyRef["Modern Apartment in City Center"]).toBe(1);
    expect(propertyRef["Spacious Countryside House"]).toBe(7);
  });
  test("the input array is not mutated", () => {
    const input = [
      { name: "Modern Apartment in City Center", property_id: 1 },
      { name: "Spacious Countryside House", property_id: 7 },
    ];

    createPropertiesRef(input);
    expect(input).toEqual([
      { name: "Modern Apartment in City Center", property_id: 1 },
      { name: "Spacious Countryside House", property_id: 7 },
    ]);
  });
});