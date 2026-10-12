import { describe, expect, test, } from "vitest";
import { render, screen, } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "../components/ui/provider";
import App from "../App";


describe("App", () => {

    test("タイトルが表示されている", () => {
        render(
            <Provider>
                <MemoryRouter initialEntries={["/"]}>
                    <App />
                </MemoryRouter>
            </Provider>
        );
        expect(
            screen.getByRole("heading", { name: "デジタル名刺アプリ" })
        ).toBeInTheDocument();
    });

});
