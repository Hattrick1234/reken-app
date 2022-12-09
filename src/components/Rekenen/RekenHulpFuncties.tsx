const verplaatsKommaInGetal = (
  getal: number,
  aantalPositiesOpschuiven: number
) => {
  const getalInStringFormaat = "0000000" + getal.toString() + "0000000";
  const oudePositieKomma = getalInStringFormaat.indexOf(".");
  const nieuwePositieKomma = oudePositieKomma + aantalPositiesOpschuiven;
  const stringVoorDeKomma = getalInStringFormaat.slice(0, oudePositieKomma);
  const stringNaDeKomma = getalInStringFormaat.slice(oudePositieKomma + 1); //vanaf komma t/m eind
  const stringZonderKomma = stringVoorDeKomma + stringNaDeKomma;
  const stringMetKommaVerschoven =
    stringZonderKomma.slice(0, nieuwePositieKomma) +
    "." +
    stringZonderKomma.slice(nieuwePositieKomma);

  return parseFloat(stringMetKommaVerschoven);
};

export default verplaatsKommaInGetal;
