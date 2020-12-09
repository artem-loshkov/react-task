import React from "react";
import { shallow, mount } from "enzyme";
import Header from "./Header";

it ("renders without crashing", () => {
  shallow(<Header />);
});

it ("renders app header", () => {
  const wrapper = shallow(<Header />);
  const heading = <h1>React Web Application</h1>;
  expect(wrapper.contains(heading)).toEqual(true);
});
