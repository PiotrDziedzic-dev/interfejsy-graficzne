export interface ForumPost {
  title: string;
  text: string;
  category: string;
  id: number;
}

export interface AktualnosciPost {
  title: string;
  text: string;
  category: string;
  id: number;
}
export const sports = [
  "Piłka Nożna",
  "Siatkówka",
  "Koszykówka",
  "Piłka Ręczna",
  "Hokej",
  "Tennis",
  "Box",
  "Judo",
  "Tenis Stołowy",
  "Trening Siłowy",
  "Sportowe Wspomnienia",
  "Billard",
  "Kręgle",
  "Golf",
  "Biegi",
  "Kolarstwo",
  "eSport",
  "Pływanie",
  "Inne",
];

export interface OpiniaEkspercka {
  title: string;
  text: string;
  category: string;
  id: number;
  expertFullName: string;
}

export const OpinieEkspertow: OpiniaEkspercka[] = [
  {
    title: "Znaczenie prawidłowej techniki pływania kraulem",
    text: "W pływaniu kraulem kluczową rolę odgrywa technika. Pamiętajcie o mocnym odpychaniu stóp i równomiernym ruchu ramion.",
    category: "Pływanie",
    id: 1,
    expertFullName: "Dr. Maria Nowak",
  },
  {
    title: "Skuteczne strategie regeneracji po intensywnym treningu",
    text: "Po intensywnym treningu ważne jest zadbanie o odpowiednią regenerację. Śpijcie wystarczająco długo, stosujcie masaże i unikajcie nadmiernego obciążenia.",
    category: "Trening",
    id: 2,
    expertFullName: "Prof. Andrzej Kowalski",
  },
  {
    title: "Rola prawidłowego odżywiania w osiąganiu sukcesów sportowych",
    text: "Dla sportowców kluczowe jest dostarczanie organizmowi odpowiednich składników odżywczych. Unikajcie jedzenia wysokokalorycznych, pustych produktów.",
    category: "Odżywianie",
    id: 3,
    expertFullName: "Dr. Marta Lewandowska",
  },
  {
    title: "Techniki oddychania podczas biegu długodystansowego",
    text: "Podczas biegu długodystansowego kontrola oddechu jest kluczowa. Zwracajcie uwagę na równomierne oddychanie i dostarczanie odpowiedniej ilości tlenu do organizmu.",
    category: "Bieganie",
    id: 4,
    expertFullName: "Prof. Jan Kowalczyk",
  },
  {
    title: "Znaczenie rozgrzewki przed treningiem siłowym",
    text: "Rozgrzewka przed treningiem siłowym pomaga zminimalizować ryzyko kontuzji. Wykonujcie dynamiczne ćwiczenia rozciągające i aktywizujące mięśnie.",
    category: "Trening siłowy",
    id: 5,
    expertFullName: "Mgr. inż. Agnieszka Malinowska",
  },
  {
    title: "Rola stretching'u w poprawie elastyczności mięśniowej",
    text: "Regularne wykonywanie stretching'u ma kluczowe znaczenie dla poprawy elastyczności mięśniowej. Pamiętajcie o rozciąganiu każdej grupy mięśniowej.",
    category: "Rozciąganie",
    id: 26,
    expertFullName: "Prof. Ewa Majewska",
  },
  {
    title: "Zaawansowane metody treningowe dla wspinaczy",
    text: "Wspinaczki wymagają specjalistycznych metod treningowych. Skupcie się na wzmacnianiu mięśni stabilizujących i technikach oddychania w trakcie wspinaczki.",
    category: "Wspinaczka",
    id: 27,
    expertFullName: "Dr. Adam Szewczyk",
  },
  {
    title: "Rola suplementacji w diecie sportowca",
    text: "Suplementacja może być ważnym elementem diety sportowca. Skonsultujcie się z dietetykiem w celu dostosowania suplementacji do indywidualnych potrzeb.",
    category: "Suplementacja",
    id: 28,
    expertFullName: "Mgr. Katarzyna Zielinska",
  },
  {
    title: "Zasady bezpiecznego uprawiania sportu w upalne dni",
    text: "W upalne dni unikajcie intensywnego treningu w najgorętszych godzinach. Pamiętajcie o nawadnianiu organizmu i stosujcie ochłodzenie przed i po treningu.",
    category: "Bezpieczeństwo",
    id: 29,
    expertFullName: "Dr. Paweł Dąbrowski",
  },
  {
    title: "Innowacyjne podejścia do treningu siłowego dla zaawansowanych",
    text: "Dla zaawansowanych osób trening siłowy może wymagać innowacyjnych podejść. Eksperymentujcie z różnymi technikami i cyklami treningowymi.",
    category: "Trening siłowy",
    id: 30,
    expertFullName: "Prof. Monika Szymańska",
  },
  {
    title: "Rola treningu funkcjonalnego w poprawie codziennych aktywności",
    text: "Trening funkcjonalny pozwala wzmocnić mięśnie, które są używane podczas codziennych czynności. Skoncentrujcie się na ruchach zbliżonych do naturalnych gestów.",
    category: "Trening funkcjonalny",
    id: 31,
    expertFullName: "Dr. Robert Nowakowski",
  },
  {
    title: "Znaczenie psychologii sportu w osiąganiu sukcesów",
    text: "Psychologia sportu odgrywa kluczową rolę w osiąganiu sukcesów. Pracujcie nad motywacją, koncentracją i radzeniem sobie ze stresem.",
    category: "Psychologia sportu",
    id: 32,
    expertFullName: "Prof. Agnieszka Kowalczyk",
  },
  {
    title: "Rola białka w regeneracji mięśni po treningu",
    text: "Białko jest fundamentalne dla regeneracji mięśni po treningu. Upewnijcie się, że dostarczacie wystarczającą ilość wysokiej jakości białka w diecie.",
    category: "Odżywianie",
    id: 33,
    expertFullName: "Dr. Michał Lisowski",
  },
  {
    title: "Trening cardio dla utraty wagi i poprawy kondycji",
    text: "Trening cardio jest skutecznym narzędziem do utraty wagi i poprawy kondycji. Wybierajcie formę aktywności, która sprawia Wam przyjemność.",
    category: "Trening cardio",
    id: 34,
    expertFullName: "Mgr. Katarzyna Wójcik",
  },
  {
    title: "Zasady planowania treningu na maraton",
    text: "Przygotowania do maratonu wymagają zrównoważonego planu treningowego. Zwiększajcie stopniowo dystans, a także dbajcie o regenerację mięśni.",
    category: "Bieganie",
    id: 35,
    expertFullName: "Prof. Andrzej Zalewski",
  },
];

export interface GroupData {
  description: string;
  name: string;
  sport: string;
  category: string;
  rate: number;
  location: string;
  numerOfMembers: number;
  ageFrom: number;
  ageTo: number;
  isPublic: boolean;
}

export const GroupsData: GroupData[] = [
  {
    description:
      "Cześć, będziemy się spotykać w czwartki co tydzień na treningi." +
      " Boisko mamy zarezerwowane od 18-20. Mile widziane osoby, które mają umiejętności na poziomie przynajmniej średnim",
    name: "Boisko na Sławkowskiej treningi w cxzwartek",
    sport: "Piłka Nożna",
    category: "Uprawianie sportu",
    ageFrom: 16,
    ageTo: 35,
    location: "Warszawa",
    numerOfMembers: 14,
    rate: 4,
    isPublic: true,
  },
  {
    description:
      "Cześć, będziemy się spotykać w czwartki co tydzień na treningi." +
      " Boisko mamy zarezerwowane od 18-20. Mile widziane osoby, które mają umiejętności na poziomie przynajmniej średnim",
    name: "Boisko na Sławkowskiej treningi w cxzwartek",
    sport: "Piłka Nożna",
    category: "Uprawianie sportu",
    ageFrom: 16,
    ageTo: 35,
    location: "Warszawa",
    numerOfMembers: 14,
    rate: 4,
    isPublic: true,
  },
  {
    description:
      "Cześć, będziemy się spotykać w czwartki co tydzień na treningi." +
      " Boisko mamy zarezerwowane od 18-20. Mile widziane osoby, które mają umiejętności na poziomie przynajmniej średnim",
    name: "Boisko na Sławkowskiej treningi w cxzwartek",
    sport: "Piłka Nożna",
    category: "Uprawianie sportu",
    ageFrom: 16,
    ageTo: 35,
    location: "Warszawa",
    numerOfMembers: 14,
    rate: 4,
    isPublic: true,
  },
  {
    description:
      "Cześć, będziemy się spotykać w czwartki co tydzień na treningi." +
      " Boisko mamy zarezerwowane od 18-20. Mile widziane osoby, które mają umiejętności na poziomie przynajmniej średnim",
    name: "Boisko na Sławkowskiej treningi w cxzwartek",
    sport: "Piłka Nożna",
    category: "Uprawianie sportu",
    ageFrom: 16,
    ageTo: 35,
    location: "Warszawa",
    numerOfMembers: 14,
    rate: 4,
    isPublic: true,
  },
];
