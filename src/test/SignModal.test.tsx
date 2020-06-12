import React from "react";
import { shallow } from "enzyme";
import Header from "../components/Header";
// import { firebase } from "../Firebase";

describe("Sign events", () => {
  test("simulate click button", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("button").text()).toBe("Sign Up");
  });
});
