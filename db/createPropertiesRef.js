function createPropertiesRef(properties) {
  if (properties.length === 0) return {};
  let propertiesRefObj = {};

  properties.forEach(({ name, property_id }) => {
    propertiesRefObj[name] = property_id;
  });

  return propertiesRefObj;
}

function formatProperties(properties, propertyRef) {

    return properties.map(({property_name })=> [

        propertyRef[property_name]

    ])

}

module.exports = { createPropertiesRef, formatProperties };
