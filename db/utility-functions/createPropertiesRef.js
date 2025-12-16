function createPropertiesRef(properties) {
  let propertiesRefObj = {};

  properties.forEach(({ name, property_id }) => {
    propertiesRefObj[name] = property_id;
  });

  return propertiesRefObj;
};

module.exports = createPropertiesRef;