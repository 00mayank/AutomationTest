  // Positive Test Cases
describe('Positive Test Case - Get, Post, Put, Delete', () => {

  it("GET Call - Retrieve a post", () => {
    cy.getPost(1)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('id', 1);
          expect(response.body).to.have.property('title');
          expect(response.headers).to.have.property('content-type').that.contains('application/json');
        });
  });

  it("POST Call - Create a new post", () => {
    cy.createPost("",{
      title: "Test post",
      body: "This is a post call",
      userId: 1
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('title', 'Test post');
      expect(response.body).to.have.property('body', 'This is a post call');
    });
  });

  it("PUT Call - Update an existing post", () => {
    cy.updatePost(1, {
      title: "Test post - Updated",
      body: "This is a put call",
      userId: 1,
      id: 1
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('title', 'Test post - Updated');
    });
  });

  it("DELETE Call - Delete the post", () => {
    cy.deletePost(1).its('status').should('equal', 200);
  });

});

  // Negative Test Cases
describe('Negative Test Case', () => {

  it("PUT Call with missing ID - Returns 404",  () => {
    cy.updatePost("", {
      title: "Invalid update",
      body: "This shouldn't work",
      userId: "1",
      id: ""
    })
        .its('status')
        .should('equal', 404);
  });

  it("GET Call with invalid ID - Returns 404",  () => {
        cy.getPost("-1", {
        })
            .its('status')
            .should('equal', 404);
    });
});

  // Edge Test Cases
describe('Edge Test Cases', () => {

  it("PUT Call with negative ID - Returns 500", () => {
    cy.updatePost(-1,{
      title: 'A'.repeat(300),
      body: "This is a post call",
      userId: -1,
      id: -1 // Negative id
    })
        .its('status')
        .should('equal', 500);
  });

  it("PuT Call with User ID greater than 100 - Returns 500", () => {
    cy.updatePost(101,{
      title: "Test post",
      body: "This is a post call",
      userId: 101,
      id: 101  // User ID greater than 100
    })
        .its('status')
        .should('equal', 500);
  });

});

  // Performance Testing
describe('Performance Test', () => {

  it("GET Call - Respond within acceptable time", () => {
    cy.getPost(1)
        .then((response) => {
          expect(response.duration).to.be.lessThan(1000); // Response time should be < 1 second
        });
  });

});

  // API Chaining
describe('API Chaining', () => {

    it('Get post and check count of post - Return 5', () => {
      cy.request({
        method: 'GET',
        url: Cypress.env('apiPath')
      })
          .then((response) => {
            expect(response.status).to.eq(200);
            const postid = response.body[0].id; // Get the first post ID
            return postid;
          })
          .then((postid) => {
            cy.request({
              method: 'GET',
              url: `https://jsonplaceholder.typicode.com/comments?postId=${postid}`
            })
                .then((response) => {
                  expect(response.status).to.eq(200);
                  expect(response.body).to.have.length(5); // Validate comment count
                });
          });
    });

  });
