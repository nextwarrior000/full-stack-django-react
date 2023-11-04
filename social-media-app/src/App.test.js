import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
test("renders Welcome to Postagram text", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const textElement = screen.getByText(/Welcome to Postagram!/i);
  expect(textElement).toBeInTheDocument();
});
