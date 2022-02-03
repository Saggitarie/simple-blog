import Home from "@routes/home";

import { store } from "@app/store";
import { Provider } from "react-redux";

import { render, screen, cleanup, fireEvent } from "@testing-library/react";

describe("Test Search Input", () => {
  afterAll(() => {
    cleanup();
  });

  test("render correct results when user types matching keyword -> reprehenderit", async () => {
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

  test("render no result when user types keyword with no match -> asdfasdfasdf", async () => {
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
  test("comments should be collapsed in initial render", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const comments = await screen.findAllByTestId(/^blog-comments$/);

    comments.forEach((comment) => {
      expect(comment).toHaveClass("comment-refiner__list--collapse");
    });
  });

  test("comment's expansion state should toggle successfully with mouse clicks", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const viewcommentsbuttons = await screen.findAllByTestId(/^view-comments-button$/);
    const comments = await screen.findAllByTestId(/^blog-comments$/);

    fireEvent.click(viewcommentsbuttons[0]);

    expect(comments[0]).toHaveClass("comment-refiner__list--expand");

    fireEvent.click(viewcommentsbuttons[0]);

    expect(comments[0]).toHaveClass("comment-refiner__list--collapse");
  });

  test("expanded comment panels should collapse after navigating to another list of posts", async () => {
    window.scrollTo = jest.fn();
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const viewcommentsbuttons = await screen.findAllByTestId(/^view-comments-button$/);
    let comments = await screen.findAllByTestId(/^blog-comments$/);
    const nextbutton = await screen.findByTestId("next-button");

    comments.forEach((comment) => {
      expect(comment).toHaveClass("comment-refiner__list--collapse");
    });

    fireEvent.click(viewcommentsbuttons[0]);
    expect(comments[0]).toHaveClass("comment-refiner__list--expand");

    fireEvent.click(nextbutton);

    comments = await screen.findAllByTestId(/^blog-comments$/);

    expect(comments[0]).toHaveClass("comment-refiner__list--collapse");
  });
});
