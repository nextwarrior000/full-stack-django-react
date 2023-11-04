import App from "./App";
import { render, screen } from "./helpers/test-utils";

test("renders Welcome to Postagram text", () => {
  render(<App />);
  const textElement = screen.getByText(/Welcome to Postagram!/i);
  expect(textElement).toBeInTheDocument();
});
