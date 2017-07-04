# Crankstarter

[Heroku link][heroku]


Crank Starter is a web application inspired by Kick Starter, a crowd-funding web application, built using Ruby on Rails and React/Redux. By June 30, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and sufficient CSS styling:

![Clickstarter index][index]

## Features
- Account creation and authentication with demo login
- Creating and deleting projects
- Adding and backing rewards in a project
- Search projects by title
- Filter project by Category

## Implementation

### User Authentication
- Uses BCrypt to to hash and salt users passwords and stores the digest
- Enables users to maintain their session unless they explicitly logout
- Requires users to be logged in to start a project and make contributions

### Projects
- When the Index page loads it makes an AJAX request to fetch all the projects from the DB. It fetches necessary information for displaying the tile.

- Starting a project asks for all required fields of the project and all rewards associated with it. It then creates both in one request

### Contribution
- Contribution goes to a rewards index page where users can choose a reward with a minimum amount value. The app performs a check to see if the amount entered by user is greater or equal to reward amount.

### Categories
-  Categories tab makes a request with a category id the controller then sends the Categories with their respective projects

### Search
- The search input field has an onChange listener that enables it to have a live search with each key press

![Clickstarter index][giphy]

### Future Implementations
- [ ] Likes
- [ ] Credit card payments

[heroku]: https://crankstarter.herokuapp.com
[index]: ./app/assets/images/landing_page.png
[giphy]: ./app/assets/images/search_gif.gif
