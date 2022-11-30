export enum TypePlaatje {
  GOED,
  FOUT,
  DOELBEREIKT,
  TIJDVERSTREKEN,
}

export enum TypeEindconditie {
  ONBEPERKT = "Eindeloos aantal vragen",
  AANTALVRAGEN = "Aantal vragen",
  AANTALGOED = "Aantal vragen goed beantwoord",
}

export enum TypeOperator {
  AFTREKKEN = "Aftrekken",
  DELEN = "Delen",
  OPTELLEN = "Optellen",
  VERMENIGVULDIGING = "Vermenigvuldigen",
  MEETEENHEDEN_OMREKENEN = "Omrekenen meeteenheden",
}

export enum TypeTelParameter {
  EENHEDEN = "Eenheden 1, 2, etc.",
  TIENTALLEN = "Tientallen 10, 20 etc.",
  HONDERDTALLEN = "Honderdtallen 100, 200 etc.",
  DUIZENDTALLEN = "Duizentallen 1000, 2000 etc.",
}

export enum TypeMeeteenheid {
  KM = "kilometer",
  HM = "hectometer",
  DAM = "decameter",
  M = "meter",
  DM = "decimeter",
  CM = "centimeter",
  MM = "millimeter",
}

export const MeeteenheidVolgordeArray = [
  TypeMeeteenheid.KM,
  TypeMeeteenheid.HM,
  TypeMeeteenheid.DAM,
  TypeMeeteenheid.M,
  TypeMeeteenheid.DM,
  TypeMeeteenheid.CM,
  TypeMeeteenheid.MM,
];
