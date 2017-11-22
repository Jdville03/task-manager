# Specifications for the Rails with jQuery Assessment

Specs:
- [x] Use jQuery for implementing new requirements
- [x] Include a show resource rendered using jQuery and an Active Model Serialization JSON backend. - task edit resource rendered from has_many association of list JSON upon clicking back/next links (to streamline user experience, user can directly access task edit page without going through task show page).
- [x] Include an index resource rendered using jQuery and an Active Model Serialization JSON backend. - lists index rendered upon selecting a sort option on list index page.
- [x] Include at least one has_many relationship in information rendered via JSON and appended to the DOM. - tasks rendered from has_many relationship in list JSON on list show page/list edit page/task edit page upon selecting task sort option; task edit resource rendered from has_many relationship in list JSON on task edit page upon clicking next/previous task links.
- [x] Use your Rails API and a form to create a resource and render the response without a page refresh. - list can be created and rendered to the list index page and navbar list menu without a page refresh; task can be created and rendered to the list show page without a page refresh; incomplete tasks counters can be updated and rendered to the list show page and navbar list menu without a page refresh.
- [x] Translate JSON responses into js model objects. - JSON responses for both list and task translated into JS model objects.
- [x] At least one of the js model objects must have at least one method added by your code to the prototype. - Both of the list and task JS model objects have a prototype method to render the appropriate HTML which includes the object attributes.

Confirm
- [x] You have a large number of small Git commits
- [x] Your commit messages are meaningful
- [x] You made the changes in a commit that relate to the commit message
- [x] You don't include changes in a commit that aren't related to the commit message
