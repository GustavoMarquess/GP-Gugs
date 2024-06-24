import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Header from "../../Header";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};
describe("Componente Header", () => {
  test("Teste de renderização do logo e dos links", () => {
    renderWithRouter(<Header />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Gerenciamento de Projetos")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Pessoas")).toBeInTheDocument();
    expect(screen.getByText("Projetos")).toBeInTheDocument();
  });

  test("toggles theme on button click", () => {
    renderWithRouter(<Header />);

    const toggleButton = screen.getByRole("button", { name: /lightbulb/i });
    userEvent.click(toggleButton);

    expect(document.body.classList.contains("theme-black")).toBe(true);
  });

  test("Vai até a pagina inicial", () => {
    renderWithRouter(<Header />);

    const logoutButton = screen.getByRole("button", { name: /sign out/i });
    userEvent.click(logoutButton);

    expect(window.location.pathname).toBe("/");
  });
});
