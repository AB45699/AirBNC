const createPropertiesRef = require("./createPropertiesRef.js");

let propertyOne, propertyTwo; 

beforeEach(()=>{
  propertyOne = {
    name: "Modern Apartment in City Center", 
    property_id: 1 
  };

  propertyTwo = {
    name: "Spacious Countryside House", 
    property_id: 7
  };

})
describe("createPropertiesRef", () => {
  test("returns an object", () => {
    expect(typeof createPropertiesRef([])).toBe("object");
    expect(Array.isArray(createPropertiesRef([]))).toBe(false);
  });
  test("an empty input array returns an empty object", () => {
    expect(createPropertiesRef([])).toEqual({});
  });
  test("creates a ref where the property name is the key and the property_id is the value (for a single property)", () => {
    const propertyRef = createPropertiesRef([propertyOne]);

    expect(propertyRef).toHaveProperty("Modern Apartment in City Center");
    expect(propertyRef["Modern Apartment in City Center"]).toBe(1);
  });
  test("creates a ref where the property name is the key and the property_id is the value (for multiple properties)", () => {
    const propertyRef = createPropertiesRef([propertyOne, propertyTwo]);

    expect(propertyRef).toHaveProperty("Modern Apartment in City Center");
    expect(propertyRef).toHaveProperty("Spacious Countryside House");

    expect(propertyRef["Modern Apartment in City Center"]).toBe(1);
    expect(propertyRef["Spacious Countryside House"]).toBe(7);
  });
  test("a ref is not created for a property that does not have a name key", ()=>{
    const noNamePropertyData = [
      { property_id: 1 },
      { name: "Spacious Countryside House", property_id: 7 },
    ];

    expect(createPropertiesRef(noNamePropertyData)).toEqual({"Spacious Countryside House": 7});
  });
  test("a ref is not created for a property that does not have a property id key", ()=>{
    const noIDPropertyData = [
      { name: "Modern Apartment in City Center", property_id: 1 },
      { name: "Spacious Countryside House" },
    ];

    expect(createPropertiesRef(noIDPropertyData)).toEqual({"Modern Apartment in City Center": 1});
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