import { describe, expect, test } from "vitest";
import { listedEventMinimumAge } from "../src/public-event-age.ts";

describe("listedEventMinimumAge age-word minimums", () => {
  test.each([
    ["Rooftop mixer 21 years or older", 21],
    ["Wine tasting 21 years and older", 21],
    ["Trivia night 18 years and up", 18],
    ["Comedy show 21 yrs or older", 21],
    ["Rooftop mixer 21 year or older", 21],
  ] as Array<[string, number]>)("reads %s as %i", (title, expected) => {
    expect(listedEventMinimumAge({ title, tags: [] })).toBe(expected);
  });

  test("reads the age word from a tag", () => {
    const event = { title: "Rooftop mixer", tags: ["21 years or older"] };
    expect(listedEventMinimumAge(event)).toBe(21);
  });

  test.each([
    ["Rooftop mixer 21+", 21],
    ["Rooftop mixer 21 and older", 21],
    ["Trivia night 18 and up", 18],
    ["Family picnic", 0],
  ] as Array<[string, number]>)("keeps the old readings: %s is %i", (title, expected) => {
    expect(listedEventMinimumAge({ title, tags: [] })).toBe(expected);
  });
});
