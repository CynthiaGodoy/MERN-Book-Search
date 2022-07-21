# MERN Book Search

## Description

This application is a fully functional Google Books API search engine built with a RESTful API, and refactor it to be a GraphQL API built with Apollo Server. The app was built using the **MERN stack** with a `React` front end, `MongoDB` database, and `Node.js/Express.js` server and API. The user saves book searches to the back-end. 

## Installation
1. Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API. [Dependencies](https://www.apollographql.com/docs/react/get-started)
```
npm install @apollo/client graphql
```
index.js
```
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://flyby-gateway.herokuapp.com/',
  cache: new InMemoryCache(),
});
```

2. Modify the existing authentication middleware so that it works in the context of a GraphQL API.

3. Create an Apollo Provider so that requests can communicate with an Apollo Server.

4. Deploy your application to Heroku with a MongoDB database using MongoDB Atlas. Use the [Deploy with Heroku and MongoDB Atlas](https://coding-boot-camp.github.io/full-stack/mongodb/deploy-with-heroku-and-mongodb-atlas) walkthrough for instructions.

## Live URL

[Heroku]()

## Screenshot
![](images/Screenshot.PNG)
![](images/Screenshot2.PNG)


## Items Completed
✅ A book search engine with the option to `login/signup`, an `input field to search for books`, and a `save button`.

✅ `login/signup` menu option. A model appears on the screen with a toggle between the option to log in or sign up. 

> *Signup* requires three inputs for a username, an email address, and a password, with a signup button.

> *login* requires two inputs for an email adress and a password with a login button. Once the user is logged in to the site, the menu options change to search for books, and option to see my saved books, and a logout.

✅ `search for books` menu option to search for book and a submit button. The search results, feature a book’s title, author, description, image, and a link to that book on the Google Books site.

✅ Clicking on the `save button` on a book, allows the user to save the book to the users account each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account

✅ When viewing the books saved to the users account there is a button to `remove a book` from the account. Once clicked, the book is deleted from the account.

✅ When the `logout button` is clicked the user is logged out of the account and is presented with the homepage.

### Back-End Specifications
* `auth.js`: Update the auth middleware function to work with the GraphQL API.

* `server.js`: Implement the Apollo Server and apply it to the Express server as middleware.

* `Schemas` directory:
	* `index.js`: Export your typeDefs and resolvers.

	* `resolvers.js`: Define the query and mutation functionality to work with the Mongoose models.
		**Hint**: Use the functionality in the `user-controller.js` as a guide.
		
	* `typeDefs.js`: Define the necessary `Query` and `Mutation` types:
		* `Query` type:
			* `me`: Which returns a `User` type.

		* `Mutation` type:
			* `login`: Accepts an email and password as parameters; returns an `Auth` type.
			* `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type.
			* `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)
			* `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type.

		* `User` type:
			* `_id`
			* `username`
			* `email`
			* `bookCount`
			* `savedBooks` (This will be an array of the `Book` type.)

		* `Book` type:
			* `bookId` (Not the `_id`, but the book's `id` value returned from Google's Book API.)
			* `authors` (An array of strings, as there may be more than one author.)
			* `description`
			* `title`
			* `image`
			* `link`

		* `Auth` type:
			* `token`
			* `user` (References the `User` type.)

### Front-End Specifications
* `queries.js`: This will hold the query `GET_ME`, which will execute the `me` query set up using Apollo Server.

* `mutations.js`:
	* `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server.
	* `ADD_USER` will execute the `addUser` mutation.
	* `SAVE_BOOK` will execute the `saveBook` mutation.
	* `REMOVE_BOOK` will execute the `removeBook` mutation.

* `App.js`: Create an Apollo Provider to make every request work with the Apollo Server.

* `SearchBooks.js`:
	* Use the Apollo `useMutation()` Hook to execute the `SAVE_BOOK` mutation in the `handleSaveBook()` function instead of the `saveBook()` function imported from the `API` file.
	* Make sure you keep the logic for saving the book's ID to state in the `try...catch` block! 

* `SavedBooks.js`:
	* Remove the `useEffect()` Hook that sets the state for `UserData`.
	* Instead, use the `useQuery()` Hook to execute the `GET_ME` query on load and save it to a variable named `userData`.
	* Use the `useMutation()` Hook to execute the `REMOVE_BOOK` mutation in the `handleDeleteBook()` function instead of the `deleteBook()` function that's imported from `API` file. (Make sure you keep the `removeBookId()` function in place!)

* `SignupForm.js`: Replace the `addUser()` functionality imported from the `API` file with the `ADD_USER` mutation functionality.

* `LoginForm.js`: Replace the `loginUser()` functionality imported from the `API` file with the `LOGIN_USER` mutation functionality.
