function createPropertiesRef(properties) {
  const propertiesRefObj = {};

  properties.forEach(({ name, property_id }) => {
    if (name !== undefined && property_id !== undefined) {
      propertiesRefObj[name] = property_id;
    }
    
  });

  return propertiesRefObj;
};

module.exports = createPropertiesRef;