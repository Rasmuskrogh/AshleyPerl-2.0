export interface Article {
  id: number;
  title: string;
  publication: string;
  date: string;
  image: string;
  imageAlt: string;
  url: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title:
      "Faced with Sky-High IVF Costs, Couples Look Abroad to Start Families",
    publication: "THE WALRUS",
    date: "April 18, 2025",
    image: "/Walrus.jpg",
    imageAlt: "Babies, pills and suitcases",
    url: "https://thewalrus.ca/faced-with-sky-high-ivf-costs-couples-look-abroad-to-start-families/",
  },
  {
    id: 2,
    title: "Extreme weather makes climate change a reality now",
    publication: "NEWS DECODER",
    date: "Oct. 7, 2024",
    image: "/NewsDecoder_climate.jpg",
    imageAlt: "Man paddling a rubberboat down the flooded street",
    url: "https://news-decoder.com/extreme-weather-makes-climate-change-a-reality-now/",
  },
  {
    id: 3,
    title: "How consumers would benefit from a pan-Canadian electricity grid",
    publication: "CANADIAN AFFAIRS",
    date: "April 30, 2024",
    image: "/Canadian-electricity-grid-scaled.webp",
    imageAlt: "An electricity grid",
    url: "https://www.canadianaffairs.news/2024/04/30/how-consumers-would-benefit-from-a-pan-canadian-electricity-grid/",
  },
  {
    id: 4,
    title: "What happens when space junk falls to earth?",
    publication: "NEWS DECODER",
    date: "March 25, 2024",
    image: "/Space junk.jpeg",
    imageAlt: "A satellite over South America",
    url: "https://news-decoder.com/what-happens-when-space-junk-falls-to-earth/",
  },
  {
    id: 5,
    title: "From Talk to Action: Rethinking the Language of Climate Change",
    publication: "THINK GLOBAL HEALTH",
    date: "March 18, 2024",
    image:
      "/2014-01-16T120000Z_2115329838_GM1EA1H03B301_RTRMADP_3_USA-FIRE-CALIFORNIA.jpeg",
    imageAlt: "A car driving away from a forest fire",
    url: "https://www.thinkglobalhealth.org/article/talk-action-rethinking-language-climate-change",
  },
  {
    id: 6,
    title: "In Icelandic history, a woman's place might be at sea",
    publication: "NEWS DECODER",
    date: "March 7, 2024",
    image: "/Untitled-design-2.webp",
    imageAlt: "A painted woman in fishing gear",
    url: "https://news-decoder.com/in-icelandic-history-a-womans-place-might-be-at-sea/",
  },
  {
    id: 7,
    title:
      "Mining the depths: Norway's deep-sea exploitation could put it in environmental and legal murky waters",
    publication: "THE CONVERSATION",
    date: "Feb. 1, 2024",
    image: "/yan-ots-VPGbPVMcBXg-unsplash.jpg",
    imageAlt: "ice floe",
    url: "https://theconversation.com/mining-the-depths-norways-deep-sea-exploitation-could-put-it-in-environmental-and-legal-murky-waters-220909",
  },
  {
    id: 8,
    title:
      "Volunteers a key part of the magic at annual Toronto Santa Claus Parade",
    publication: "THE CANADIAN PRESS",
    date: "Nov. 25, 2023",
    image: "/rjb104-the-canadian-press-3.webp",
    imageAlt: "Santa hailing the audience at the Santa Claus Parade",
    url: "https://nationalpost.com/pmn/news-pmn/canada-news-pmn/volunteers-a-key-part-of-the-magic-at-annual-toronto-santa-claus-parade",
  },
  {
    id: 9,
    title:
      "Europe is becoming a hot spot for air conditioning. Can the energy grid keep up?",
    publication: "THE TORONTO STAR",
    date: "Nov. 19, 2023",
    image: "/6557e9a8066ae.webp",
    imageAlt: "Man walking with a parasol",
    url: "https://www.thestar.com/news/world/europe-is-becoming-a-hot-spot-for-air-conditioning-can-the-energy-grid-keep-up/article_450b9c84-abe0-58f8-9ae3-ed37728d4d58.html",
  },
];
