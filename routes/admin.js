const express = require('express');
const { createAdminRegistrationForm, bootstrapField, createLoginForm } = require('../forms');
const { Admin } = require('../models');
const router = express.Router();
const crypto = require('crypto');
const { checkIfAuthenticated } = require('../middlewares');

/**
 * 
 * @param {string} plainPassword 
 * @returns Hashed version of plainPassword
 */
const getHashedPassword = function(plainPassword) {
  const sha256 = crypto.createHash('sha256');
  // Create a hash for 'plainPassword' and convert it to 'base64' - hexadecimal representation
  const hash = sha256.update(plainPassword).digest('base64');
  return hash;
}

router.get('/register', (req, res) => {
  const adminForm = createAdminRegistrationForm();
  res.render('admin/register', {
    adminForm: adminForm.toHTML(bootstrapField)
  })
})

router.post('/register', (req, res) => {
  const adminForm = createAdminRegistrationForm();
  adminForm.handle(req, {
    "success": async function(form) {
      const {confirm_password, ...adminData} = form.data;
      adminData.password = getHashedPassword(adminData.password);
      const admin = new Admin(adminData);
      await admin.save();
      req.flash('success_messages', "Your account has been created successfully");
      res.redirect('/admin/login')
    },
    "empty": function(form) {
      res.render('admin/register', {
        adminForm: adminForm.toHTML(bootstrapField)
      })
    },
    "error": function(form) {
      res.render('admin/register', {
        adminForm: adminForm.toHTML(bootstrapField)
      })
    }
  })
})

router.get('/login', (req, res) => {
  const loginForm = createLoginForm();
  res.render("admin/login",{
    loginForm: loginForm.toHTML(bootstrapField)
  })
})

router.post('/login', (req, res) => {
  const loginForm = createLoginForm();
  loginForm.handle(req, {
    "success": async function(form) {
      // 1. Find the user by the given email
      const admin = await Admin.where({
        'email': form.data.email
      }).fetch({
        require: false // Dealt with manually below
      });

      if (admin) {
        // 2. Check if the hashed version of the password matches the password in the user table
        if (getHashedPassword(form.data.password) === admin.get('password')) {
          // 3. Admin is logged in and we will store the admin data in the session
          req.session.admin = { 
            id: admin.get('id'),
            username: admin.get('username'),
            email: admin.get('email')
            // DO NOT SAVE PASSWORD TO SESSION
          }
          req.flash('success_messages', `Welcome back ${admin.get('name')}`);
          res.redirect('/products')
        } else {
          req.flash('error_messages', 'Invalid authentication');
          res.status(401);
          res.redirect('/admin/login');
        }
      } else {
        req.flash('error_messages', 'Invalid authentication');
        res.status(401);
        res.redirect('/admin/login');
      }

    },
    "empty": function(form) {
      res.render('admin/login',{
        loginForm: loginForm.toHTML(bootstrapField)
      });
    },
    "error": function(form) {
      res.render('admin/login',{
        loginForm: loginForm.toHTML(bootstrapField)
      });
    },
  })
})

// protected route (only authenticated users can access)
router.get('/profile', [checkIfAuthenticated], (req, res) => {
  const admin = req.session.admin;
  res.render('admin/profile',{
    admin
  })
})

router.get("/logout", (req, res) => {
  req.session.admin = null; // removes user from the current session
  req.flash('success_messages', 'Goodbye! You have been logged out')
  res.redirect('/admin/login');
})

module.exports = router;