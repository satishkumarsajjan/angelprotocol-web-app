import { APIs } from "constants/urls";
import { Bucket, bucketURL, uploadFiles } from "./uploadFiles";

const TIME_STAMP = 123456789;
const AUTH_TOKEN = "test";
const bucket: Bucket = "endow-profiles";
const baseURL = `https://${bucket}.${bucketURL}/${TIME_STAMP}`;

jest.mock("./createAuthToken", () => ({ createAuthToken: () => AUTH_TOKEN }));

const mockFetch: typeof fetch = () =>
  Promise.resolve(new Response(undefined, { status: 200 }));

describe("uploadFiles tests", () => {
  test("upload multiple files", async () => {
    Date.now = jest.fn(() => TIME_STAMP);
    global.fetch = jest.fn(mockFetch);

    const files = [new File([], "file1"), new File([], "file2")];

    const result = await uploadFiles(files, bucket);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result).toStrictEqual(baseURL);
  });

  test("check generated call parameters", async () => {
    Date.now = jest.fn(() => TIME_STAMP);
    global.fetch = jest.fn(mockFetch);

    const file = new File([], " test file name");

    await uploadFiles([file], bucket);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(APIs.aws + "/v1/file-upload", {
      method: "POST",
      body: JSON.stringify({
        bucket: bucket,
        dataUri: "data:application/octet-stream;base64,",
        fileName: `${TIME_STAMP}-_test_file_name`,
      }),
      headers: {
        authorization: AUTH_TOKEN,
      },
    });
  });

  test("returns null if files input is empty", async () => {
    const result = await uploadFiles([], bucket);
    expect(result).toBeNull();
  });
});
