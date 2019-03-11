import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("Drugs should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });

  it("Drugs should decrease in benefit twice as fast once it's expired", () => {
    expect(
      new Pharmacy([new Drug("test", 0, 20)]).updateBenefitValue()
    ).toEqual([new Drug("test", -1, 18)]);
  });

  it("Benefits should not go under 0", () => {
    expect(
      new Pharmacy([
        new Drug("test", 10, 0),
        new Drug("Dafalgan", 10, 0),
        new Drug("Fervex", 0, 10)
      ]).updateBenefitValue()
    ).toEqual([
      new Drug("test", 9, 0),
      new Drug("Dafalgan", 9, 0),
      new Drug("Fervex", -1, 0)
    ]);
  });

  it("Benefits should increase the right amount for Herbal Tea", () => {
    expect(
      new Pharmacy([
        new Drug("Herbal Tea", 10, 10),
        new Drug("Herbal Tea", 0, 10)
      ]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 9, 11), new Drug("Herbal Tea", -1, 12)]);
  });

  it("Benefits should increase the right amount for Fervex", () => {
    expect(
      new Pharmacy([
        new Drug("Fervex", 15, 20),
        new Drug("Fervex", 10, 20),
        new Drug("Fervex", 5, 20)
      ]).updateBenefitValue()
    ).toEqual([
      new Drug("Fervex", 14, 21),
      new Drug("Fervex", 9, 22),
      new Drug("Fervex", 4, 23)
    ]);
  });

  it("Benefits should decrease twice as fast for Dafalgan", () => {
    expect(
      new Pharmacy([
        new Drug("Dafalgan", 10, 10),
        new Drug("Dafalgan", 0, 10)
      ]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 9, 8), new Drug("Dafalgan", -1, 6)]);
  });

  it("Benefits should not go over 50", () => {
    expect(
      new Pharmacy([
        new Drug("Herbal Tea", 10, 49),
        new Drug("Herbal Tea", 0, 49),
        new Drug("Fervex", 10, 49),
        new Drug("Fervex", 5, 49)
      ]).updateBenefitValue()
    ).toEqual([
      new Drug("Herbal Tea", 9, 50),
      new Drug("Herbal Tea", -1, 50),
      new Drug("Fervex", 9, 50),
      new Drug("Fervex", 4, 50)
    ]);
  });

  it("Magic Pill never expires nor decreases in Benefit.", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 9, 40)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 9, 40)]);
  });
});
