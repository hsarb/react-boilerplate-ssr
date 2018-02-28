import config from "../config";

const { host, port } = config;

describe("Home", () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();

    await page.goto(`http://${host}:${port}`);
  });

  afterAll(async () => {
    await page.close();
  });

  it("should load without error", async () => {
    const text = await page.evaluate(() => document.body.textContent);

    expect(text).toContain("React Boilerplate");
  });
});
