import { render, screen, fireEvent } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import CreatePost from "../CreatePost";
test("Renders CreatePost component", async () => {
  const user = userEvent;
  render(<CreatePost />);
  const showModalForm = screen.getByTestId("show-modal-form");
  expect(showModalForm).toBeInTheDocument();
  fireEvent.click(showModalForm);
  const createFormElement = screen.getByTestId("create-post-form");
  expect(createFormElement).toBeInTheDocument();
  const postBodyField = screen.getByTestId("post-body-field");
  expect(postBodyField).toBeInTheDocument();
  const submitButton = screen.getByTestId("create-post-submit");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton.disabled).toBeTruthy();
  const postBody = "kqdlmdkfmldsqkflmkdslkflmkqsdf";
  await user.type(postBodyField, postBody);
  // Checking if field has the text and button is not
  // disabled
  expect(postBodyField.value).toBe(postBody);
  expect(submitButton.disabled).toBeFalsy();
});
