function generateRandomValue(schema) {
  const schemaType = schema.type;

  if (schemaType === 'string') {
      // Generate a random string of 10 characters
      return Math.random().toString(36).substring(2, 12);
  }

  if (schemaType === 'number') {
      const minimum = schema.minimum || 0;
      const maximum = schema.maximum || 100;
      return +(Math.random() * (maximum - minimum) + minimum).toFixed(2);
  }

  if (schemaType === 'integer') {
      const minimum = schema.minimum || 0;
      const maximum = schema.maximum || 100;
      return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  if (schemaType === 'boolean') {
      return Math.random() < 0.5;
  }

  if (schemaType === 'array') {
      const itemsSchema = schema.items || {};
      const minItems = schema.minItems || 1;
      const maxItems = schema.maxItems || 5;
      const arrayLength = Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
      const result = [];
      for (let i = 0; i < arrayLength; i++) {
          result.push(generateRandomValue(itemsSchema));
      }
      return result;
  }

  if (schemaType === 'object') {
      const obj = {};
      const properties = schema.properties || {};
      const required = schema.required || Object.keys(properties);

      required.forEach((prop) => {
          if (properties[prop]) {
              obj[prop] = generateRandomValue(properties[prop]);
          }
      });

      return obj;
  }

  return null;
}

function generateRandomObject(schema) {
  return generateRandomValue(schema);
}

// Example usage
const exampleSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/product.schema.json",
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "object",
  "properties": {
      "productId": {
          "description": "The unique identifier for a product",
          "type": "integer"
      },
      "productName": {
          "description": "Name of the product",
          "type": "string"
      },
      "price": {
          "description": "The price of the product",
          "type": "number",
          "exclusiveMinimum": 0
      },
      "tags": {
          "description": "Tags for the product",
          "type": "array",
          "items": {
              "type": "string"
          },
          "minItems": 1,
          "uniqueItems": true
      },
      "dimensions": {
          "type": "object",
          "properties": {
              "length": {
                  "type": "number"
              },
              "width": {
                  "type": "number"
              },
              "height": {
                  "type": "number"
              }
          },
          "required": ["length", "width", "height"]
      }
  },
  "required": ["productId", "productName", "price"]
};

// Generate a random object
const randomObject = generateRandomObject(exampleSchema);
console.log(randomObject);
