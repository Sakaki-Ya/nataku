describe("User compoennt test", () => {
  const TEST_UID = Cypress.env("TEST_UID");
  beforeEach(() => {
    cy.logout();
    cy.visit("http://localhost:3000/");
    cy.login(TEST_UID);
    cy.get('button[name="open user button"]').click();
  });

  it("Change avatar", () => {
    cy.get('input[aria-label="change name"]').clear().type("Test");
    cy.get('button[name="name save"]').click();
    cy.callFirestore("set", `test_user/${TEST_UID}`, {
      name: "Test",
    });
    cy.callFirestore("get", `test_user/${TEST_UID}`).then((r: any) => {
      cy.wrap(r).its("name").should("equal", "Test");
    });
  });

  it("Sign out", () => {
    cy.get('button[name="sign out"]').click();
    cy.get('input[aria-label="change name"]').should("not.exist");
  });

  it("Delete Account", () => {
    cy.get('button[name="delete account"]').click();
    cy.callFirestore("delete", `test_user/${TEST_UID}`);
    cy.callFirestore("get", `test_user/${TEST_UID}`).then((r: any) => {
      cy.wrap(r).its("name").should("not.exist");
    });
  });

  it("Close user side bar", () => {
    cy.get('button[name="close user side bar"]').click();
    cy.get('button[name="open user button"]').click();
    cy.get('div[aria-label="side bar background"]').click();
    cy.get('input[aria-label="change name"]').should("not.exist");
  });
});
