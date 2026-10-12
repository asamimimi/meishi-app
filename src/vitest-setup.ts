import "@testing-library/jest-dom/vitest";

// jsdom には matchMedia がないため、Chakra UI(next-themes) 用に簡易版を用意する
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    }),
});
