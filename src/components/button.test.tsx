import { store } from "@app/store";
import { Provider } from "react-redux";

import { render, screen, fireEvent } from "@testing-library/react";

import Home from "@routes/home";

describe("Button State", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Check If Previous Button Is Disabled On Initial Render", async () => {
    window.scrollTo = jest.fn();
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const previousbutton = await screen.findByTestId("prev-button");

    expect(previousbutton).toBeDisabled();
  });

  test("Check If Next Button Is Enabled On Intial Render", async () => {
    window.scrollTo = jest.fn();
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const nextbutton = await screen.findByTestId("next-button");

    expect(nextbutton).toBeEnabled();
  });

  test("Check If Next Button Gets Disabled When There is no more posts to show", async () => {
    window.scrollTo = jest.fn();
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const nextbutton = await screen.findByTestId("next-button");

    expect(nextbutton).toBeEnabled();

    for (let i = 0; i <= 18; i++) {
      fireEvent.click(screen.getByTestId("next-button"));
    }

    expect(nextbutton).toBeDisabled();

    const previousbutton = screen.getByTestId("prev-button");
    expect(previousbutton).toBeEnabled();
  });
});
