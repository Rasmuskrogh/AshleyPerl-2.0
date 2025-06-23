-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  publication VARCHAR(100) NOT NULL,
  date VARCHAR(50) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  image_alt VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert articles data
INSERT INTO articles (title, publication, date, image_url, image_alt, url) VALUES
(
  'Faced with Sky-High IVF Costs, Couples Look Abroad to Start Families',
  'THE WALRUS',
  'April 18, 2025',
  'https://res.cloudinary.com/dfkbz67mw/image/upload/v1750682226/Walrus_r6jyw5.jpg',
  'Babies, pills and suitcases',
  'https://thewalrus.ca/faced-with-sky-high-ivf-costs-couples-look-abroad-to-start-families/'
),
(
  'Extreme weather makes climate change a reality now',
  'NEWS DECODER',
  'Oct. 7, 2024',
  'https://res.cloudinary.com/dfkbz67mw/image/upload/v1750682272/NewsDecoder_climate_pnoukt.jpg',
  'Man paddling a rubberboat down the flooded street',
  'https://news-decoder.com/extreme-weather-makes-climate-change-a-reality-now/'
),
(
  'How consumers would benefit from a pan-Canadian electricity grid',
  'CANADIAN AFFAIRS',
  'April 30, 2024',
  'https://res.cloudinary.com/dfkbz67mw/image/upload/v1750682326/Canadian-electricity-grid-scaled_yw2axq.webp',
  'An electricity grid',
  'https://www.canadianaffairs.news/2024/04/30/how-consumers-would-benefit-from-a-pan-canadian-electricity-grid/'
),
(
  'What happens when space junk falls to earth?',
  'NEWS DECODER',
  'March 25, 2024',
  'https://res.cloudinary.com/dfkbz67mw/image/upload/v1750682371/Space_junk_pjsg6d.jpg',
  'A satellite over South America',
  'https://news-decoder.com/what-happens-when-space-junk-falls-to-earth/'
),
(
  'From Talk to Action: Rethinking the Language of Climate Change',
  'THINK GLOBAL HEALTH',
  'March 18, 2024',
  'https://res.cloudinary.com/dfkbz67mw/image/upload/v1750682401/2014-01-16T120000Z_2115329838_GM1EA1H03B301_RTRMADP_3_USA-FIRE-CALIFORNIA_ewrjgf.jpg',
  'A car driving away from a forest fire',
  'https://www.thinkglobalhealth.org/article/talk-action-rethinking-language-climate-change'
),
(
  'In Icelandic history, a woman''s place might be at sea',
  'NEWS DECODER',
  'March 7, 2024',
  'https://res.cloudinary.com/dfkbz67mw/image/upload/v1750682436/Untitled-design-2_vkrx1g.webp',
  'A painting of a woman in fishing gear',
  'https://news-decoder.com/in-icelandic-history-a-womans-place-might-be-at-sea/'
),
(
  'Mining the depths: Norway''s deep-sea exploitation could put it in environmental and legal murky waters',
  'THE CONVERSATION',
  'Feb. 1, 2024',
  'https://res.cloudinary.com/dfkbz67mw/image/upload/v1750682528/yan-ots-VPGbPVMcBXg-unsplash_bwfxbx.jpg',
  'ice floe',
  'https://theconversation.com/mining-the-depths-norways-deep-sea-exploitation-could-put-it-in-environmental-and-legal-murky-waters-220909'
),
(
  'Volunteers a key part of the magic at annual Toronto Santa Claus Parade',
  'THE CANADIAN PRESS',
  'Nov. 25, 2023',
  'https://res.cloudinary.com/dfkbz67mw/image/upload/v1750682325/rjb104-the-canadian-press-3_hwd3pk.webp',
  'Santa hailing the audience at the Santa Claus Parade',
  'https://nationalpost.com/pmn/news-pmn/canada-news-pmn/volunteers-a-key-part-of-the-magic-at-annual-toronto-santa-claus-parade'
),
(
  'Europe is becoming a hot spot for air conditioning. Can the energy grid keep up?',
  'THE TORONTO STAR',
  'Nov. 19, 2023',
  'https://res.cloudinary.com/dfkbz67mw/image/upload/v1750682574/6557e9a8066ae_jbj9s1.webp',
  'Man walking with a parasol',
  'https://www.thestar.com/news/world/europe-is-becoming-a-hot-spot-for-air-conditioning-can-the-energy-grid-keep-up/article_450b9c84-abe0-58f8-9ae3-ed37728d4d58.html'
); 