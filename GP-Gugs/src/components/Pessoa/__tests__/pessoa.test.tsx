import React from "react";
import { render } from "@testing-library/react";
import NovaPessoa from "../../Pessoa";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn(),
}));

describe("NovaPessoa Component", () => {
  it("renderiza corretamente", () => {
    (React as any).useState = jest
      .fn()
      .mockReturnValueOnce([[], jest.fn()])
      .mockReturnValueOnce([null, jest.fn()]);

    const { getByText } = render(
      <NovaPessoa onAddPessoa={() => {}} onClose={() => {}} />
    );

    expect(getByText("Selecione a Pessoa")).toBeInTheDocument();
  });
});
