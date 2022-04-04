import { act, createRenderer } from "react-dom/test-utils";
import App from "./App";

jest.mock("redux-persist", () => {
  const real = jest.requireActual("redux-persist");
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

it("renders correctly", async () => {
  await act(async () => {
    createRenderer.create(<App />);
  });
});
