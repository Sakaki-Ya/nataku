import React from "react";
import { shallow } from "enzyme";
import SignButtons from "../components/HeaderCopmonents/SignButtons";
// import { firebase } from "../Firebase";

describe("Sign events", () => {
  test("simulate click button", () => {
    const wrapper = shallow(<SignButtons />);
    expect(wrapper.find("button").text()).toBe("Sign Up");
  });
});
