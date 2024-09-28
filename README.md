# Cypress E2E and API Testing Project

This project contains End-to-End (E2E) tests for Amazon and Flipkart product searches, as well as API testing for placeholder APIs using Cypress.

## Folder Structure

- `cypress/e2e/FrontendTesting/`
  - Contains Cypress E2E test files for testing product searches on Amazon and Flipkart.

  - `AmazonProductSearch.cy.js`: Automates a product search on Amazon India and validates product details.
  - `flipkartProductSearch.cy.js`: Automates a product search on Flipkart and validates product details.

- `cypress/e2e/BackendTesting/`
  - Contains API testing scripts using Cypress for testing placeholder APIs.

  - `PlaceHolderApiTesting.cy.js`: Tests various HTTP methods (GET, POST, PUT, DELETE) and validates the responses.

- `cypress/fixtures/`
  - Contains json files used to featch product details in frontend e2e testing. 

## Test Descriptions

### Frontend Testing

1. **Amazon Product Search** (`AmazonProductSearch.cy.js`)
   - Visits Amazon India.
   - Searches for the product "Motorola Edge 50 Fusion 128GB".
   - Retrieves product details (name, price, link).
   - Adds the product to the cart and verifies the cart count.
   - Saves product details in `cypress/fixtures/Amazon-ProductDetail.json`.

2. **Flipkart Product Search** (`flipkartProductSearch.cy.js`)
   - Visits Flipkart.
   - Searches for the product "Motorola Edge 50 Fusion 128GB".
   - Retrieves product details (name, price, link).
   - Saves product details in `cypress/fixtures/Flipkart-ProductDetail.json`.

### Backend Testing

1. **Placeholder API Testing** (`PlaceHolderApiTesting.cy.js`)
   - This file tests various HTTP operations against the `https://jsonplaceholder.typicode.com/` API. The tests cover **positive**, **negative**, **edge cases**, and **performance tests**.
   - [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts), a free REST API used for testing and prototyping.

#### Positive Test Cases
   - **GET Call**: Retrieves a post using a valid post ID and checks for a 200 OK response, along with validating content like `id`, `title`, and response headers.
   - **POST Call**: Creates a new post and verifies that the title, body, and user ID are properly set in the response with a 201 Created status.
   - **PUT Call**: Updates an existing post and checks that the post is updated correctly with the new title and body content.
   - **DELETE Call**: Deletes a post and confirms the deletion with a 200 OK response.

#### Negative Test Cases
   - **Invalid PUT Call**: Attempts to update a post without an ID, expecting a 404 Not Found response.
   - **Invalid GET Call**: Tries to retrieve a post with an invalid ID (e.g., -1), which should return a 404 error.

#### Edge Test Cases
   - **PUT with Negative ID**: Tests updating a post with a negative ID, which should return a 500 Internal Server Error due to the invalid ID.
   - **PUT with User ID Greater Than 100**: Simulates updating a post with a user ID greater than 100, which triggers a 500 error based on system limitations.

#### Performance Tests
   - **GET Call Performance**: Ensures that retrieving a post returns a response within 1000 milliseconds (1 second), validating system performance under normal conditions.

#### API Chaining
   - **API Chaining Test**: This test demonstrates chaining of API calls. It first retrieves a post and then uses its ID to fetch related comments, validating the total number of comments in the second call which should be 5 in total. This shows how responses from one API call can be used as inputs for subsequent calls.

### Custom Cypress Commands (`commands.js`)

The project uses custom Cypress commands to simplify API request handling. These commands are defined in the `support/commands.js` file.

### Available Custom Commands

1. **createPost(postId, postData)**: Sends a POST request to create a new post.
2. **updatePost(postId, postData)**: Sends a PUT request to update an existing post.
3. **deletePost(postId)**: Sends a DELETE request to delete a post.
4. **getPost(postId)**: Sends a GET request to retrieve a post.

### Installation

To run these tests, you will need to have the following installed:

- [Node.js](https://nodejs.org/)
- [Cypress](https://www.cypress.io/)

### Installation Steps

1. Clone this repository:

   ```bash
   git clone <repository-url>

2. Navigate to the project directory and install the dependencies:

    ```bash
    cd <project-directory>
    npm install

3. Open Cypress test runner:

    ```bash
    npx cypress open

4. Select and run the desired test suite.

### Running Tests
#### To run the frontend tests for Amazon and Flipkart, use the Cypress Test Runner UI to execute:

  FrontendTesting/AmazonProductSearch.cy.js: For E2E testing on Amazon.
  FrontendTesting/flipkartProductSearch.cy.js: For E2E testing on Flipkart.
#### To run backend tests (API tests):

  Open the Cypress Test Runner and run BackendTesting/PlaceHolderApiTesting.cy.js.

