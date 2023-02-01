import { describe, test, expect } from "@jest/globals";

const images = ["1", "2", "3", "4", "5"]; // take from GrQl

const getActiveImageUrl = (index: number) => {
  return {
    url: images[index],
    hasPrev: true,
    hasNext: true,
  };
};

describe("", () => {
  test("getActiveImageUrl()", () => {
    expect(getActiveImageUrl(2)).toEqual({
      url: "3",
      hasPrev: true,
      hasNext: true,
    });
  });

  test("getFirstImageUrl()", () => {
    expect(getActiveImageUrl(0)).toEqual({
      url: "1",
      hasPrev: false,
      hasNext: true,
    });
  });

  test("getLastImageUrl()", () => {
    expect(getActiveImageUrl(images.length - 1)).toEqual({
      url: "5",
      hasPrev: true,
      hasNext: false,
    });
  });
});
