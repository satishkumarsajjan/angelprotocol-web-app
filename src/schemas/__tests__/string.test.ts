import { url } from "../string";

//NOTE: intended for shallow form objects only atm
describe("string schemas tests", () => {
  describe("url", () => {
    const cases = [
      { input: null, expected: true }, // value is empty
      { input: undefined, expected: true }, // value is empty
      { input: "", expected: true }, // value is empty
      { input: ".", expected: false },
      { input: ".@%#%&(!", expected: false },
      { input: "a.", expected: true },
      { input: ".a", expected: true },
      { input: ".a.", expected: true },
      { input: "http:/", expected: false },
      { input: "http://", expected: false },
      { input: "https:/", expected: false },
      { input: "https://", expected: false },
      { input: "ftp://www.example.com", expected: false },
      { input: "mailto://www.example.com", expected: false },
      // special case, domain name can contain only top-level domain
      // see https://stackoverflow.com/questions/69614892/can-a-domain-consist-of-only-tld-top-level-domain#:~:text=D%20in%20TLD%20means%20domain,so%20yes%20it%20is%20valid.
      { input: "fdasfasda", expected: true },
      { input: "1", expected: true },
      { input: "example.com", expected: true },
      { input: "example.org", expected: true },
      { input: "www.example.com", expected: true },
      { input: "http://www.example.com", expected: true },
      { input: "https://www.example.com", expected: true },
      { input: "tiktok.com/@betterme.org", expected: true },
      { input: "www.tiktok.com/@betterme.org", expected: true },
      { input: "https://www.tiktok.com/@betterme.org", expected: true },
    ];

    test.each(cases)(
      'url("$input") === $expected',
      async ({ input, expected }) =>
        expect(await url.isValid(input)).toBe(expected)
    );
  });
});
