export const navbarMenuEnums = {
  changePassword: 1,
  refreshToken: 2,
  logout: 3,
};

export const MeasurementUnitEnum = {
  piece: 0,
  gram: 1,
  kilogram: 2,
  milliliter: 3,
  liter: 4,
  tablespoon: 5,
  teaspoon: 6,
  cup: 7,
  teaCup: 8,
  desertSpoon: 9,
};

export const MeasurementUnits = [
  { label: "Adet", value: MeasurementUnitEnum.piece },
  { label: "Gram", value: MeasurementUnitEnum.gram },
  { label: "Kilogram", value: MeasurementUnitEnum.kilogram },
  { label: "Mililitre", value: MeasurementUnitEnum.milliliter },
  { label: "Litre", value: MeasurementUnitEnum.liter },
  { label: "Yemek Kaşığı", value: MeasurementUnitEnum.tablespoon },
  { label: "Çay Kaşığı", value: MeasurementUnitEnum.teaspoon },
  { label: "Su Bardağı", value: MeasurementUnitEnum.cup },
  { label: "Çay Bardağı", value: MeasurementUnitEnum.teaCup },
  { label: "Tatlı Kaşığı", value: MeasurementUnitEnum.desertSpoon },
];

export const ServingEnums = {
  oneTwo: 0,
  twoFour: 1,
  fourSix: 2,
  sixEight: 3,
  eightTen: 4,
  tenTwelve: 5,
  twelveSixteen: 6,
  sixteenPlus: 7,
};

export const Servings = [
  { label: "1-2 Kişilik", value: ServingEnums.oneTwo },
  { label: "2-4 Kişilik", value: ServingEnums.twoFour },
  { label: "4-6 Kişilik", value: ServingEnums.fourSix },
  { label: "6-8 Kişilik", value: ServingEnums.sixEight },
  { label: "8-10 Kişilik", value: ServingEnums.eightTen },
  { label: "10-12 Kişilik", value: ServingEnums.tenTwelve },
  { label: "12-16 Kişilik", value: ServingEnums.twelveSixteen },
  { label: "16+ Kişilik", value: ServingEnums.sixteenPlus },
];
