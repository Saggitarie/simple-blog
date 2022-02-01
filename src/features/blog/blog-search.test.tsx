import Home from "@routes/home";

import { store } from "@app/store";
import { Provider } from "react-redux";

import { render, screen, cleanup, fireEvent } from "@testing-library/react";

describe("Test Search Input", () => {
  afterAll(() => {
    cleanup();
  });

  test("Render Correct Results after typing the keyword:reprehenderit", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "reprehenderit" },
    });

    const blogposts = await screen.findAllByTestId("blog-post");
    expect(blogposts).toHaveLength(5);

    expect(blogposts[0]).toHaveTextContent("reprehenderit");
    expect(blogposts[1]).toHaveTextContent("reprehenderit");
    expect(blogposts[2]).toHaveTextContent("reprehenderit");
    expect(blogposts[3]).toHaveTextContent("reprehenderit");
    expect(blogposts[4]).toHaveTextContent("reprehenderit");
  });

  test("Render No Result When User Inputs Not Matching Keyword", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "asdfasdfasdf" },
    });

    expect(await screen.findByText(/No Result/)).toBeInTheDocument();
  });
});
