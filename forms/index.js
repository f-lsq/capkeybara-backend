// Require Caolan forms
const forms = require("forms");

// Creating shortcuts
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

const bootstrapField = function (name, object) {
  if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

  if (object.widget.classes.indexOf('form-control') === -1) {
      object.widget.classes.push('form-control');
  }

  var validationclass = object.value && !object.error ? 'is-valid' : '';
  validationclass = object.error ? 'is-invalid' : validationclass;
  if (validationclass) {
      object.widget.classes.push(validationclass);
  }

  var label = object.labelHTML(name);
  var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

  var widget = object.widget.toHTML(name, object);
  return '<div class="form-group">' + label + widget + error + '</div>';
};

// Function to create a form object for 'Products'
const createProductForm = (categories) => {
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
      errorAfterField: false,
      validators: [validators.min(0)]
    }),
    "cost": fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0)]
    }),
    "quantity": fields.number({
      required: true,
      errorAfterField: true,
      validators: [validators.min(0), validators.integer()]
    }),
    "category_id": fields.string({
      label: "Category",
      required: true,
      errorAfterField: true,
      widget: widgets.select(),
      choices: categories
    }),
  }) 
}

// To create Signup / Login form for 'Admins' 
const createAdminRegistrationForm = () => {
  // Stopped at 4.15
}

module.exports = { createProductForm, bootstrapField }; 