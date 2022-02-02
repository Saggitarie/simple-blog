import Home from "@routes/home";

import { store } from "@app/store";
import { Provider } from "react-redux";

import { render, screen, cleanup, fireEvent } from "@testing-library/react";

describe("Test Search Input", () => {
  afterAll(() => {
    cleanup();
  });

  test("Render Correct Results when user types matching keyword:reprehenderit", async () => {
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

    blogposts.forEach((post) => {
      expect(post).toHaveTextContent("reprehenderit");
    });
  });

  test("Render No Result When User Inputs Has Not Matching Keyword", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "asdfasdfasdf" },
    });

    const noresult = await screen.findByText(/No Result/);

    expect(noresult).toBeInTheDocument();
  });
});

describe("Test Posts Comments", () => {
  test("All Comments Should Be Collapsed On Initial Render", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const comments = await screen.findAllByTestId(/^blog-comments$/);

    comments.forEach((comment) => {
      expect(comment).toHaveClass("comment-list-collapse");
    });
  });

  test("Comments Expansion State Should Toggle Successfully with Clicks", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const viewcommentsbutton = await screen.findAllByTestId(/^view-comments-button$/);
    const comments = await screen.findAllByTestId(/^blog-comments$/);

    fireEvent.click(viewcommentsbutton[0]);

    expect(comments[0]).toHaveClass("comment-list-expand");

    fireEvent.click(viewcommentsbutton[0]);

    expect(comments[0]).toHaveClass("comment-list-collapse");
  });

  test("Expanded Comment Panels Should Be Collapsed When Going to another page", async () => {
    window.scrollTo = jest.fn();
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const viewcommentsbutton = await screen.findAllByTestId(/^view-comments-button$/);
    let comments = await screen.findAllByTestId(/^blog-comments$/);
    const nextbutton = await screen.findByTestId("next-button");

    comments.forEach((comment) => {
      expect(comment).toHaveClass("comment-list-collapse");
    });

    fireEvent.click(viewcommentsbutton[0]);
    expect(comments[0]).toHaveClass("comment-list-expand");

    fireEvent.click(nextbutton);

    comments = await screen.findAllByTestId(/^blog-comments$/);

    expect(comments[0]).toHaveClass("comment-list-collapse");
  });
});
