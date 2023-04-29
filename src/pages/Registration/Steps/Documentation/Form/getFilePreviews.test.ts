import { FileObject } from "types/aws";
import { Bucket, bucketURL } from "helpers/uploadFiles";
import { getFilePreviews } from "./getFilePreviews";

const file1 = new File([], "file1");
const file2 = new File([], "file2");
const file3 = new File([], "file3");

const preview1: FileObject = { name: "preview1", publicUrl: "preview1Url" };
const preview2: FileObject = { name: "preview2", publicUrl: "preview2Url" };
const preview3: FileObject = { name: "preview3", publicUrl: "preview3Url" };

const timeStamp = 123456789;
const bucket: Bucket = "endow-reg";
const baseURL: string = `https://${bucket}.${bucketURL}/${timeStamp}`;

const result1: FileObject = {
  name: file1.name,
  publicUrl: `${baseURL}-${file1.name}`,
};
const result2: FileObject = {
  name: file2.name,
  publicUrl: `${baseURL}-${file2.name}`,
};
const result3: FileObject = {
  name: file3.name,
  publicUrl: `${baseURL}-${file3.name}`,
};

const uploadFiles = jest.fn();
const mockFetch: typeof fetch = () =>
  Promise.resolve(new Response(undefined, { status: 200 }));

beforeEach(() => {
  global.fetch = jest.fn(mockFetch);
});

describe("get documentation file previews", () => {
  test("correct preview mapping for new uploads", async () => {
    const documentationVals: Parameters<typeof getFilePreviews>[0] = {
      a: { files: [file1], previews: [] },
      b: { files: [file1, file3], previews: [] },
      c: { files: [file2, file1, file3], previews: [] },
    };
    Date.now = jest.fn(() => timeStamp);
    uploadFiles.mockResolvedValue(baseURL);

    const previews = await getFilePreviews(documentationVals);
    expect(previews).toStrictEqual({
      a: [result1],
      b: [result1, result3],
      c: [result2, result1, result3],
    });
  });
  test("previous upload is used when no new files", async () => {
    Date.now = jest.fn(() => timeStamp);
    uploadFiles.mockResolvedValue(baseURL);

    const documentationVals: Parameters<typeof getFilePreviews>[0] = {
      a: { files: [file1], previews: [preview1, preview2] },
      b: { files: [], previews: [preview3, preview2] },
      c: { files: [], previews: [preview1] },
    };
    const previews = await getFilePreviews(documentationVals);
    expect(previews).toStrictEqual({
      a: [result1],
      b: [preview3, preview2],
      c: [preview1],
    });
  });
  test("return empty arrays when no new files and previews are empty", async () => {
    uploadFiles.mockResolvedValue(null);

    const documentationVals: Parameters<typeof getFilePreviews>[0] = {
      a: { files: [], previews: [preview1] },
      b: { files: [], previews: [] },
      c: { files: [], previews: [] },
    };
    const previews = await getFilePreviews(documentationVals);
    expect(previews).toStrictEqual({
      a: [preview1],
      b: [],
      c: [],
    });
  });
});
