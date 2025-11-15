import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button.jsx";

test("button should increment count on click", () => {
  render(<Button />);

  const button = screen.getByRole("button");
  expect(button.textContent).toBe("Count: 0");

  fireEvent.click(button);
  expect(button.textContent).toBe("Count: 1");
});
