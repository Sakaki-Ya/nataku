describe("User compoennt test", () => {
  const TEST_UID = Cypress.env("TEST_UID");
  beforeEach(() => {
    cy.logout();
    cy.visit("http://localhost:3000/");
    cy.login(TEST_UID);
    cy.get('button[name="open user button"]').click();
  });

  it("Change name", () => {
    cy.get('input[aria-label="change name"]').clear().type("Test");
    cy.contains("Save").click();
    cy.callFirestore("set", `test_user/${TEST_UID}`, {
      name: "Test",
    });
    cy.callFirestore("get", `test_user/${TEST_UID}`).then((r: any) => {
      cy.wrap(r).its("name").should("equal", "Test");
    });
  });

  it("Sign out", () => {
    cy.contains("Sign Out").click();
    cy.get('input[aria-label="change name"]').should("not.exist");
  });

  it("Delete Account", () => {
    cy.contains("Delete Account").click();
    cy.callFirestore("delete", `test_user/${TEST_UID}`);
    cy.callFirestore("get", `test_user/${TEST_UID}`).then((r: any) => {
      cy.wrap(r).its("name").should("not.exist");
    });
  });

  it("Close user side bar", () => {
    cy.contains("Close").click();
    cy.get('button[name="open user button"]').click();
    cy.get('div[aria-label="side bar background"]').click();
    cy.get('input[aria-label="change name"]').should("not.exist");
  });
});
