describe("Header component test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.logout();
  });

  it("SignSideBar title test", () => {
    cy.contains("Sign Up").click();
    cy.get("h2").should("contain", "Sign Up");
    cy.contains("close").click();
    cy.contains("Sign In").click();
    cy.get("h2").should("contain", "Sign In");
  });
});
