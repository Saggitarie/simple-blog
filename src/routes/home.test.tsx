import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

import Home from "@routes/home";

import { store } from "@app/store";

import { Provider } from "react-redux";

describe("Home", () => {
  afterAll(() => {
    cleanup();
  });
  test("Renders Home Component", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("Render Loading Animation and Search Input at Initial Render", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByTestId("ball-triangle-svg")).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();
  });

  test("Check If Right Amount of Posts and Comments Per Posts are Rendered", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const blogposts = await screen.findAllByTestId("blog-post");
    expect(blogposts).toHaveLength(5);

    const viewbuttons = await screen.findAllByText(/View Comments/);
    expect(viewbuttons).toHaveLength(5);
  });

  test("Check If Previous Button Is Disabled On Intial Render", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const previousbutton = await screen.findByTestId("prev-button");

    expect(previousbutton).toBeDisabled();
  });

  test("Check If Next Button Is Enabled On Intial Render", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const previousbutton = await screen.findByTestId("next-button");

    expect(previousbutton).toBeEnabled();
  });
});
