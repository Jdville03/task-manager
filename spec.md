# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project - Rails 5.1.3
- [x] Include at least one has_many relationship (x has_many y e.g. User has_many Recipes) - List has_many tasks
- [x] Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User) - Task belongs_to list
- [x] Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients) - User has_many tasks through lists
- [x] The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity) - List has name attribute
- [x] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item) - User, List, Task
- [x] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes) - User.starred_tasks (URL: /tasks/starred)
- [x] Include a nested form writing to an associated model using a custom attribute writer (form URL, model name e.g. /recipe/new, Item) - form URL: /lists/:id/edit, List (nested form to add user to list)
- [x] Include signup (how e.g. Devise) - Devise
- [x] Include login (how e.g. Devise) - Devise
- [x] Include logout (how e.g. Devise) - Devise
- [x] Include third party signup/login (how e.g. Devise/OmniAuth) - Devise/OmniAuth, Facebook
- [x] Include nested resource show or index (URL e.g. users/2/recipes) - /lists/:list_id/tasks/:id/edit
- [x] Include nested resource "new" form (URL e.g. recipes/1/ingredients) - /lists/:list_id/tasks (task is nested resource of list; nested form to add new task in list show view)
- [x] Include form display of validation errors (form URL e.g. /recipes/new) - /users/sign_up, /users/password, /lists

Confirm:
- [x] The application is pretty DRY - model methods, helper methods, and partials used throughout
- [x] Limited logic in controllers - methods in models used to limit login in controllers
- [x] Views use helper methods if appropriate - helper methods used in views
- [x] Views use partials if appropriate - partials used throughout views
