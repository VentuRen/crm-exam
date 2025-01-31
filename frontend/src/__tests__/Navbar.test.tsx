import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";

describe("Navbar Component", () => {
  it("should render the navbar correctly", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("CRM System")).toBeInTheDocument();
  });

  it("should show navigation links if the user is logged in", () => {
    localStorage.setItem("token", "mock-token");

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Clients")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("should not show navigation links if the user is not logged in", () => {
    localStorage.removeItem("token");

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.queryByText("Clients")).not.toBeInTheDocument();
  });
});
