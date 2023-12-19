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
  "Billard",
  "Kręgle",
  "Golf",
  "Bieg",
  "Kolarstwo",
  "Inne",
];

export interface OpiniaEkspercka {
  title: string;
  text: string;
  category: string;
  id: number;
  expertFullName: string;
}

export const AktualnosciSportowe: AktualnosciPost[] = [
  {
    id: 1,
    title: "Liverpool zdobywa mistrzostwo Premier League po 30 latach",
    text: "Liverpool FC kończy 30-letnią przerwę, zdobywając mistrzostwo Angielskiej Premier League w sezonie 2019/2020.",
    category: "Piłka nożna",
  },
  {
    id: 2,
    title:
      "Odwołane Letnie Igrzyska Olimpijskie w Tokio z powodu pandemii COVID-19",
    text: "Międzynarodowy Komitet Olimpijski ogłasza odwołanie Letnich Igrzysk Olimpijskich w Tokio z powodu globalnej pandemii COVID-19.",
    category: "Igrzyska olimpijskie",
  },
  {
    id: 3,
    title: "Lewis Hamilton zdobywa siódme mistrzostwo świata w Formule 1",
    text: "Brytyjski kierowca Lewis Hamilton zdobywa siódme mistrzostwo świata w Formule 1, wyrównując rekord Michaela Schumachera.",
    category: "Formuła 1",
  },
  {
    id: 4,
    title: "NBA zawiesza sezon z powodu protestów społecznych",
    text: "National Basketball Association (NBA) zawiesza sezon playoff w odpowiedzi na protesty społeczne po śmierci George'a Floyda.",
    category: "Koszykówka",
  },
  {
    id: 5,
    title: "Sadio Mane otrzymuje Złotą Piłkę CAF",
    text: "Senegalski piłkarz Sadio Mane odbiera Złotą Piłkę CAF (Konfederacji Afrykańskiej Piłki Nożnej) za wybitne osiągnięcia w roku 2020.",
    category: "Piłka nożna",
  },
  {
    id: 6,
    title: "Naomi Osaka zwycięża w US Open",
    text: "Japońska tenisistka Naomi Osaka wygrywa kobiecy singiel w US Open, pokonując Wiktorię Azarenkę w finale.",
    category: "Tenis",
  },
  {
    id: 7,
    title: "Bayern Monachium triumfuje w Lidze Mistrzów UEFA",
    text: "Bayern Monachium pokonuje Paris Saint-Germain 1:0 w finale Ligi Mistrzów UEFA, zdobywając tytuł mistrza Europy.",
    category: "Piłka nożna",
  },
  {
    id: 8,
    title: "Cristiano Ronaldo przechodzi do Juventus FC",
    text: "Portugalski napastnik Cristiano Ronaldo przechodzi z Realu Madryt do Juventus FC w jednym z najdroższych transferów w historii piłki nożnej.",
    category: "Piłka nożna",
  },
  {
    id: 9,
    title: "Simona Halep wygrywa French Open",
    text: "Rumuńska tenisistka Simona Halep zdobywa tytuł mistrza French Open, pokonując w finale Igu Swiatek.",
    category: "Tenis",
  },
  {
    id: 10,
    title: "Kansas City Chiefs zwycięża w Super Bowl LIV",
    text: "Kansas City Chiefs pokonuje San Francisco 49ers 31:20 w Super Bowl LIV, zdobywając mistrzostwo NFL.",
    category: "Futbol amerykański",
  },
  {
    id: 11,
    title: "Sprint Usaina Bolta w jego ostatnim wyścigu indywidualnym",
    text: "Jamajski sprinter Usain Bolt kończy karierę, biorąc udział w swoim ostatnim wyścigu indywidualnym na Mistrzostwach Świata w Londynie.",
    category: "Lekkoatletyka",
  },
  {
    id: 12,
    title: "Serena Williams osiąga rekord 23. tytułu wielkoszlemowego",
    text: "Amerykańska tenisistka Serena Williams zdobywa Australian Open, osiągając rekordowy 23. tytuł wielkoszlemowy w erze Open Era.",
    category: "Tenis",
  },
  {
    id: 13,
    title: "Cancelo dołącza do Manchesteru City",
    text: "Portugalski obrońca João Cancelo dołącza do Manchesteru City po udanym okresie w Juventusie.",
    category: "Piłka nożna",
  },
  {
    id: 14,
    title: "Atlanta United zdobywa MLS Cup",
    text: "Atlanta United zwycięża w MLS Cup, pokonując Portland Timbers 2:0 w finale i sięgając po swój pierwszy tytuł w historii klubu.",
    category: "Piłka nożna",
  },
  {
    id: 15,
    title: "Masters Augusta bez udziału publiczności z powodu pandemii",
    text: "Mistrzostwa Masters w golfa na Augusta National Golf Club odbywają się bez udziału publiczności z powodu pandemii COVID-19.",
    category: "Golf",
  },
  {
    id: 16,
    title: "Derrick Henry prowadzi NFL w liczbie zdobytych jardów",
    text: "Running back Tennessee Titans, Derrick Henry, kończy sezon 2020 jako lider NFL w liczbie zdobytych jardów na biegach.",
    category: "Futbol amerykański",
  },
  {
    id: 17,
    title: "Rafael Nadal wygrywa Roland Garros po raz 13.",
    text: "Hiszpański tenisista Rafael Nadal zdobywa swoje 13. mistrzostwo French Open, pokonując Novaka Djokovicia w finale.",
    category: "Tenis",
  },
  {
    id: 18,
    title: "Miami Heat w finale NBA po imponującym występie w bańce NBA",
    text: "Miami Heat osiąga finał NBA po imponującym występie w bańce NBA w kompleksie sportowym w Disney World.",
    category: "Koszykówka",
  },
  {
    id: 19,
    title: "Sebastian Vettel ogłasza odejście z Ferrari",
    text: "Niemiecki kierowca Sebastian Vettel ogłasza, że opuści zespół Ferrari po zakończeniu sezonu Formuły 1.",
    category: "Formuła 1",
  },
];

export const ForumPostsMocked: ForumPost[] = [
  {
    title: "Najnowsze wydarzenia w piłce nożnej",
    text: "Co sądzicie o ostatnich meczach? Które drużyny zaskoczyły was pozytywnie?",
    category: "Piłka Nożna",
    id: 1,
  },
  {
    title: "Jak poprawić swoje osiągi biegowe?",
    text: "Podzielcie się swoimi najlepszymi poradami dotyczącymi treningu biegowego. Jakie techniki są najskuteczniejsze?",
    category: "Biegi",
    id: 2,
  },
  {
    title: "Odkrywanie nowych tras rowerowych",
    text: "Gdzie jeździcie na rowerze? Podzielcie się swoimi ulubionymi trasami i odkryciami!",
    category: "Kolarstwo",
    id: 3,
  },
  {
    title: "Trening siłowy dla początkujących",
    text: "Poszukuję prostych ćwiczeń siłowych dla osób rozpoczynających przygodę ze sportem. Jakie polecacie?",
    category: "Trening Siłowy",
    id: 4,
  },
  {
    title: "Najlepsze momenty w historii sportu",
    text: "Podzielcie się waszymi ulubionymi chwilami sportowymi. Czy to był gol, rekord czy wyjątkowy mecz?",
    category: "Sportowe Wspomnienia",
    id: 5,
  },
  {
    title: "Nowości w świecie sportu elektronicznego",
    text: "Które gry są obecnie najpopularniejsze? Jakie są wasze ulubione turnieje esportowe?",
    category: "eSport",
    id: 6,
  },
  {
    title: "Jak radzić sobie z kontuzjami w sporcie",
    text: "Podzielcie się swoimi doświadczeniami dotyczącymi kontuzji sportowych i jak się z nimi mierzyć.",
    category: "Zdrowie Sportowców",
    id: 7,
  },
  {
    title: "Ranking najlepszych tenisistów",
    text: "Kto według was jest obecnie najlepszym tenisistą? Komentarze i dyskusje na temat rankingu ATP.",
    category: "Tenis Ziemny",
    id: 8,
  },
  {
    title: "Zawody wspinaczkowe na najwyższych szczytach",
    text: "Kto próbował swoich sił w wspinaczce górskiej? Podzielcie się swoimi wrażeniami i historiami.",
    category: "Wspinaczka Górska",
    id: 9,
  },
  {
    title: "Dieta przed maratonem",
    text: "Jakie posiłki warto spożywać przed maratonem? Podzielcie się swoimi planami żywieniowymi.",
    category: "Maraton",
    id: 10,
  },
  {
    title: "Najlepsze techniki pływackie",
    text: "Jakie techniki pływackie są najbardziej efektywne? Porady dla początkujących i zaawansowanych.",
    category: "Pływanie",
    id: 11,
  },
  {
    title: "Nowości sprzętowe dla kolarzy",
    text: "Czy ktoś testował nowe rowery i akcesoria? Podzielcie się recenzjami!",
    category: "Sprzęt Kolarski",
    id: 12,
  },
  {
    title: "Ciekawostki z świata sportu",
    text: "Dzielcie się interesującymi faktami i ciekawostkami z dziedziny sportu. Może ktoś ma nietypowe hobby sportowe?",
    category: "Sportowe Ciekawostki",
    id: 13,
  },
  {
    title: "Jak pokonać stres przed zawodami?",
    text: "Stres przed zawodami towarzyszy wielu sportowcom. Jak sobie z nim radzicie?",
    category: "Psychologia Sportu",
    id: 14,
  },
  {
    title: "Najlepsze miejsca do uprawiania sportów zimowych",
    text: "Gdzie najlepiej wybrać się na narty czy snowboard? Podzielcie się swoimi ulubionymi miejscami.",
    category: "Sporty Zimowe",
    id: 15,
  },
  {
    title: "Porady dotyczące ćwiczeń rozciągających",
    text: "Jakie ćwiczenia rozciągające polecacie po intensywnym treningu? Jak unikać kontuzji?",
    category: "Rozciąganie",
    id: 16,
  },
  {
    title: "Czy sporty walki są bezpieczne dla każdego?",
    text: "Dyskusja na temat bezpieczeństwa uprawiania sportów walki, szczególnie dla początkujących.",
    category: "Sporty Walki",
    id: 17,
  },
  {
    title: "Najlepsze aplikacje do monitorowania treningów",
    text: "Które aplikacje fitness są według was najbardziej przydatne? Podzielcie się swoimi rekomendacjami.",
    category: "Aplikacje Fitness",
    id: 18,
  },
  {
    title: "Sportowe wyzwania na nowy rok",
    text: "Kto ma jakieś sportowe postanowienia na nadchodzący rok? Podzielcie się nimi!",
    category: "Nowy Rok, Nowe Wyzwania",
    id: 19,
  },
  {
    title: "Jak dbać o bezpieczeństwo podczas jazdy na rolkach?",
    text: "Porady dotyczące ochrony i bezpieczeństwa podczas jazdy na rolkach. Kask czy ochraniacze?",
    category: "Rolkowanie",
    id: 20,
  },
];

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
