describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "admin",
      password: "salasana",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  describe("Login", function () {
    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("admin");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("Wrong credentials");
    });

    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("admin");
      cy.get("#password").type("salasana");
      cy.get("#login-button").click();

      cy.contains("Welcome");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("admin");
      cy.get("#password").type("salasana");
      cy.get("#login-button").click();

      cy.contains("Welcome");
    });

    it("a new blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("blog test");
      cy.get("#author").type("cypress");
      cy.get("#url").type("cypress.com");
      cy.contains("create").click();
      cy.contains("a new blog blog test by cypress added");
    });

    describe("and with a blog created", function () {
      beforeEach(function () {
        cy.contains("new blog").click();
        cy.get("#title").type("most likes");
        cy.get("#author").type("champ");
        cy.get("#url").type("winner.com");
        cy.contains("create").click();
        cy.contains("a new blog most likes by champ added");

        cy.contains("view").click();
        cy.get("#like").click();
        cy.get("#like").click();
      });

      it("and a user can like a blog", function () {
        cy.contains("like").click();
      });

      it("and delete it", function () {
        cy.contains("remove").click();
      });

      describe("create another blog", function () {
        beforeEach(function () {
          cy.get("#newBlog").click();
          cy.get("#title").type("blog test");
          cy.get("#author").type("cypress");
          cy.get("#url").type("cypress.com");
          cy.contains("create").click();
          cy.contains("a new blog blog test by cypress added");
        });

        it("check ordering", function () {
          cy.get(".blog").eq(0).should("contain", "most likes");
          cy.get(".blog").eq(1).should("contain", "blog");
        });
      });
    });
  });
});
