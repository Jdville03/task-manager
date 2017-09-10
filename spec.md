# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project - Rails 5.1.3
- [x] Include at least one has_many relationship (x has_many y e.g. User has_many Recipes) - User has_many user_lists; List has_many user_lists
- [x] Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User) - Task belongs_to list
- [x] Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients) - User has_many lists through user_lists; User has_many tasks through lists
- [X] The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity) - UserList has permission attribute; List has name attribute
- [x] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item) - User (name, email, password); List (name); Task (description)
- [x] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes) - Task::completed, Task::incomplete, Task::starred, Task::sorted_alphabetically
- [x] Include a nested form writing to an associated model using a custom attribute writer (form URL, model name e.g. /recipe/new, Item) - nested form in edit List view writing to users_attributes=(user_attributes) custom attribute writer
- [x] Include signup (how e.g. Devise) - signup using Devise
- [x] Include login (how e.g. Devise) - login using Devise
- [x] Include logout (how e.g. Devise) - logout using Devise
- [x] Include third party signup/login (how e.g. Devise/OmniAuth) - Facebook sign in using Devise/OmniAuth
- [x] Include nested resource show or index (URL e.g. users/2/recipes) - Task routes nested in List
- [x] Include nested resource "new" form (URL e.g. recipes/1/ingredients) - Task routes nested in List
- [x] Include form display of validation errors (form URL e.g. /recipes/new) - validation errors displayed for user signup/login, creating new list, adding user with invalid email to list

Confirm:
- [x] The application is pretty DRY - model methods, helper methods, and partials used throughout
- [x] Limited logic in controllers - methods in models used to limit login in controllers
- [x] Views use helper methods if appropriate - helper methods used in views
- [x] Views use partials if appropriate - partials used throughout views
