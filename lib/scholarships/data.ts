export interface Scholarship {
  id: string;
  name: string;
  organisation: string;
  hostCountry: string;
  flag: string;
  fields: string[];
  levels: string[];
  deadline: string;
  amountUsd: number;
  amountLocal: number;
  localCurrency: string;
  localSymbol: string;
  tags: string[];
  description: string;
  hiddenRequirements: string;
  applicationUrl: string;
}

export const scholarships: Scholarship[] = [
  {
    id: "chevening",
    name: "Chevening Scholarship",
    organisation: "UK Foreign Commonwealth & Development Office",
    hostCountry: "United Kingdom",
    flag: "🇬🇧",
    fields: ["Any"],
    levels: ["masters"],
    deadline: "2024-11-05",
    amountUsd: 45000,
    amountLocal: 840000,
    localCurrency: "ZAR",
    localSymbol: "R",
    tags: ["Leadership", "Networking", "Fully Funded"],
    description:
      "The UK government's flagship international scholarship programme, rewarding exceptional leadership potential and academic excellence.",
    hiddenRequirements:
      "Chevening panels weight networking ability almost as heavily as academics. They want to see you've already built a professional network and can articulate exactly how you'll use UK connections back home. Vague 'I want to give back' answers fail. Name specific organisations, people, and initiatives you'll connect with.",
    applicationUrl: "https://www.chevening.org/scholarships/",
  },
  {
    id: "daad",
    name: "DAAD Development-Related Postgraduate Courses",
    organisation: "German Academic Exchange Service",
    hostCountry: "Germany",
    flag: "🇩🇪",
    fields: ["Engineering", "Agriculture", "Economics", "Public Health", "Natural Sciences"],
    levels: ["masters"],
    deadline: "2024-10-31",
    amountUsd: 18000,
    amountLocal: 336000,
    localCurrency: "ZAR",
    localSymbol: "R",
    tags: ["Research", "Development", "STEM"],
    description:
      "Supports postgraduate students from developing countries in fields directly relevant to development challenges.",
    hiddenRequirements:
      "DAAD reviewers are methodologically rigorous. Your research proposal must cite specific German institutions or professors you want to work with — generic proposals are rejected. Show you understand the German academic system. Mention your plan to return and apply knowledge in your home country with concrete examples.",
    applicationUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
  },
  {
    id: "mastercard",
    name: "Mastercard Foundation Scholars Program",
    organisation: "Mastercard Foundation",
    hostCountry: "Various (US, Canada, UK, Africa)",
    flag: "🌍",
    fields: ["Any"],
    levels: ["undergraduate", "masters"],
    deadline: "2025-01-15",
    amountUsd: 60000,
    amountLocal: 1120000,
    localCurrency: "ZAR",
    localSymbol: "R",
    tags: ["Africa-focused", "Community", "Fully Funded", "Leadership"],
    description:
      "Enables young Africans with academic talent and financial need to access world-class education and become transformative leaders.",
    hiddenRequirements:
      "The 'multiplier effect' is everything here. They don't want individual success stories — they want to fund people who will lift communities. Your application must show a clear theory of change: how your education creates ripple effects. Quantify your community impact already achieved. 'I tutored 3 students' is weak. 'I built a study group that improved pass rates by 40% for 15 students' is strong.",
    applicationUrl: "https://mastercardfdn.org/all/scholars/",
  },
  {
    id: "fulbright",
    name: "Fulbright Foreign Student Program",
    organisation: "U.S. Department of State",
    hostCountry: "United States",
    flag: "🇺🇸",
    fields: ["Any"],
    levels: ["masters", "phd"],
    deadline: "2024-09-15",
    amountUsd: 55000,
    amountLocal: 1028000,
    localCurrency: "ZAR",
    localSymbol: "R",
    tags: ["Cultural Exchange", "Research", "Fully Funded"],
    description:
      "The U.S. government's flagship international educational exchange program promoting mutual understanding between Americans and people of other countries.",
    hiddenRequirements:
      "Fulbright is explicitly about cultural ambassadorship, not just academic achievement. Your personal statement must show genuine curiosity about American culture AND a commitment to sharing your own culture. They want people who will be informal diplomats. Mention specific American institutions, communities, or cultural exchanges you plan to engage with beyond your university.",
    applicationUrl: "https://foreign.fulbrightonline.org/",
  },
  {
    id: "commonwealth",
    name: "Commonwealth Scholarship",
    organisation: "Commonwealth Scholarship Commission",
    hostCountry: "United Kingdom",
    flag: "🇬🇧",
    fields: ["Any"],
    levels: ["masters", "phd"],
    deadline: "2024-12-15",
    amountUsd: 42000,
    amountLocal: 785000,
    localCurrency: "ZAR",
    localSymbol: "R",
    tags: ["Development", "Commonwealth", "Fully Funded"],
    description:
      "For students from Commonwealth countries to study in the UK, with a focus on contributing to development in their home country.",
    hiddenRequirements:
      "Commonwealth panels are development-focused above all else. Your application must clearly articulate how your UK education directly addresses a specific development challenge in your home country. Generic career goals fail. Name the policy gap, the sector problem, or the community need you will address. Bonus: reference Commonwealth Sustainable Development Goals alignment.",
    applicationUrl: "https://cscuk.fcdo.gov.uk/scholarships/",
  },
  {
    id: "gates-cambridge",
    name: "Gates Cambridge Scholarship",
    organisation: "Bill & Melinda Gates Foundation",
    hostCountry: "United Kingdom",
    flag: "🇬🇧",
    fields: ["Any"],
    levels: ["masters", "phd"],
    deadline: "2024-10-12",
    amountUsd: 65000,
    amountLocal: 1215000,
    localCurrency: "ZAR",
    localSymbol: "R",
    tags: ["Elite", "Research", "Leadership", "Fully Funded"],
    description:
      "One of the world's most prestigious scholarships, for outstanding students to study at the University of Cambridge.",
    hiddenRequirements:
      "Gates Cambridge is looking for people who will change the world — and they mean it literally. Your research must address a global challenge. The interview panel will probe whether your commitment to improving lives is genuine or performative. They've seen thousands of polished applications. Authenticity and intellectual humility stand out more than perfect grades.",
    applicationUrl: "https://www.gatescambridge.org/",
  },
  {
    id: "chinese-government",
    name: "Chinese Government Scholarship (CSC)",
    organisation: "China Scholarship Council",
    hostCountry: "China",
    flag: "🇨🇳",
    fields: ["Any"],
    levels: ["undergraduate", "masters", "phd"],
    deadline: "2025-03-31",
    amountUsd: 12000,
    amountLocal: 224000,
    localCurrency: "ZAR",
    localSymbol: "R",
    tags: ["Fully Funded", "Language", "STEM", "Arts"],
    description:
      "China's flagship scholarship for international students, covering tuition, accommodation, stipend, and health insurance.",
    hiddenRequirements:
      "Chinese universities value students who show genuine interest in Chinese culture and language, not just the scholarship money. Even basic Mandarin phrases in your application letter signal serious intent. Identify a specific Chinese professor whose research aligns with yours — cold-emailing them before applying dramatically increases acceptance rates. The embassy interview focuses heavily on your China-Africa cooperation vision.",
    applicationUrl: "https://www.campuschina.org/",
  },
  {
    id: "australia-awards",
    name: "Australia Awards Africa",
    organisation: "Australian Government (DFAT)",
    hostCountry: "Australia",
    flag: "🇦🇺",
    fields: ["Agriculture", "Education", "Health", "Governance", "Economics", "Engineering"],
    levels: ["masters"],
    deadline: "2025-04-30",
    amountUsd: 38000,
    amountLocal: 710000,
    localCurrency: "ZAR",
    localSymbol: "R",
    tags: ["Development", "Fully Funded", "Africa-focused"],
    description:
      "Long-term development scholarships for Africans to study in Australia, with a focus on contributing to development outcomes.",
    hiddenRequirements:
      "Australia Awards prioritises candidates already working in development-relevant sectors. If you're a student with no work experience, your application is significantly weaker. They want to see 2+ years of relevant work. Your development impact statement must reference Australia's aid priorities in your country — read the DFAT country strategy before writing. Return obligation is strictly enforced.",
    applicationUrl: "https://www.australiaawardsafrica.org/",
  },
];
