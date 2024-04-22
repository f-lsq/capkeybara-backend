// Require Caolan forms
const forms = require("forms");

// Creating shortcuts
const fields = forms.fields;
const validators = forms.validators;

// Function to create a form object
const createProductForm = () => {
  // Form definition
  return forms.create({
    "name": fields.string({
      required: true,
      errorAfterField: true
    }),
    "description": fields.string({
      required: false,
      errorAfterField: false
    }),
    "price": fields.number({
      required: false,
      errorAfterField: false
    }),
    "cost": fields.number({
      required: true,
      errorAfterField: true
    }),
    "quantity": fields.number({
      required: true,
      errorAfterField: true
    })
  }) 
}

module.exports = { createProductForm }; 