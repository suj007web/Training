
jest.mock("./components/common/Header", () => ({
  __esModule: true,
  default: () => <div>Mocked Header</div>,
}));
jest.mock("./components/theme/ThemeSelector", () => ({
  __esModule: true,
  default: () => <div>Mocked ThemeSelector</div>,
}));
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { HomeContent } from "./HomeContent";



describe("HomeContent", () => {
  it("renders heading", () => {
    render(<HomeContent username="TestUser" />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings[0]).toHaveTextContent("Welcome, TestUser");
  });
});