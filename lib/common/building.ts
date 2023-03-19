// data acquired from view-source:https://usosweb.sgh.waw.pl/kontroler.php?_action=katalog2/jednostki/budynkiJednostki&jed_org_kod=SGH

type Building = {
  id: string;
  nameHtml: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

const buildings: Array<Building> = [
  {
    id: "B",
    nameHtml: "<b>budynek B (Biblioteka)</b><br>Rakowiecka 22B",
    name: "budynek B (Biblioteka), Rakowiecka 22B",
    address: "ul. Rakowiecka 22B",
    lat: 52.209784,
    lng: 21.009181,
  },
  {
    id: "C",
    nameHtml: "<b>budynek C</b><br>al. Niepodległości 128",
    name: "budynek C, al. Niepodległości 128",
    address: "al. Niepodległości 128",
    lat: 52.203666,
    lng: 21.010529,
  },
  {
    id: "A",
    nameHtml: "<b>budynek A</b><br>ul. Rakowiecka 24",
    name: "budynek A, ul. Rakowiecka 24",
    address: "ul. Rakowiecka 24",
    lat: 52.208268,
    lng: 21.009902,
  },
  {
    id: "G",
    nameHtml: "<b>budynek G (główny)</b><br>al. Niepodległości 162",
    name: "budynek G (główny), al. Niepodległości 162",
    address: "al. Niepodległości 162",
    lat: 52.208872,
    lng: 21.008736,
  },
  {
    id: "K",
    nameHtml: "<b>budynek K</b><br>Kielecka 43",
    name: "budynek K, Kielecka 43",
    address: "ul. Kielecka 43",
    lat: 52.20601,
    lng: 21.004479,
  },
  {
    id: "M",
    nameHtml: "<b>budynek M</b><br>ul. Madalińskiego 6/8",
    name: "budynek M, ul. Madalińskiego 6/8",
    address: "ul. Madalińskiego 6/8",
    lat: 52.205647,
    lng: 21.020398,
  },
  {
    id: "S",
    nameHtml: "<b>budynek S</b><br>Batorego 8",
    name: "budynek S, Batorego 8",
    address: "ul. Batorego 8",
    lat: 52.211698,
    lng: 21.011106,
  },
  {
    id: "W",
    nameHtml: "<b>budynek W</b><br>ul. Wiśniowa 41",
    name: "budynek W, ul. Wiśniowa 41",
    address: "ul. Wiśniowa 41",
    lat: 52.205453,
    lng: 21.01542,
  },
  {
    id: "DS1",
    nameHtml: "<b>Dom Studenta nr 1 Sabinki</b><br>al. Niepodległości 147",
    name: "Dom Studenta nr 1 Sabinki, al. Niepodległości 147",
    address: "al. Niepodległości 147",
    lat: 52.204625,
    lng: 21.009105,
  },
  {
    id: "DS3",
    nameHtml: "<b>Dom Studenta nr 3 Grosik</b><br>Madalińskiego 31/33",
    name: "Dom Studenta nr 3 Grosik, Madalińskiego 31/33",
    address: "ul. Madalińskiego 31/33",
    lat: 52.204185,
    lng: 21.015976,
  },
  {
    id: "KSPARK",
    nameHtml: "<b>Klub Studencki Park</b><br>al. Niepodległości 196",
    name: "Klub Studencki Park, al. Niepodległości 196",
    address: "al. Niepodległości 196",
    lat: 52.213959,
    lng: 21.007887,
  },
];

const map = new Map<string, Building>();
for (const building of buildings) {
  map.set(building.id, building);
}

export { Building, map as Buildings };
