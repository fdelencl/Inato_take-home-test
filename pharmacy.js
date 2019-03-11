// Note: as the rules say a benefit can not be over 50,
// why not implement a rule on the constructor to enforce that rule during creation?
export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

const updateExpiresIn = {
  "Magic Pill": (_, expiresIn) => expiresIn,
  default: (_, expiresIn) => expiresIn - 1
};

const updateBenefit = {
  Dafalgan: (benefit, expiresIn) => {
    if (expiresIn <= 0) benefit -= 4;
    else benefit -= 2;
    return benefit > 0 ? benefit : 0;
  },
  Fervex: (benefit, expiresIn) => {
    if (expiresIn < 6) benefit += 3;
    else if (expiresIn < 11) benefit += 2;
    else benefit += 1;
    if (expiresIn <= 0) benefit = 0;
    return benefit <= 50 ? benefit : 50;
  },
  "Herbal Tea": (benefit, expiresIn) => {
    if (expiresIn <= 0) benefit += 2;
    else benefit += 1;
    return benefit <= 50 ? benefit : 50;
  },
  "Magic Pill": benefit => benefit,
  default: (benefit, expiresIn) => {
    if (expiresIn <= 0) benefit -= 2;
    else benefit -= 1;
    return benefit > 0 ? benefit : 0;
  }
};

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    this.drugs.forEach(drug => {
      const { name, benefit, expiresIn } = drug;
      drug.expiresIn = (updateExpiresIn[name] || updateExpiresIn.default)(
        benefit,
        expiresIn
      );
      drug.benefit = (updateBenefit[name] || updateBenefit.default)(
        benefit,
        expiresIn
      );
    });
    return this.drugs;
  }
}
