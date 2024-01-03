type General = {
  id: number,
  origin: string,
  tasting_date: string,
  altitude: number,
  acidity: number,
  body: number,
  taste: number,
  residual_taste: number,
  balance: number,
  uniformity: number,
  clean_cup: number,
  sweetness: number,
  taster: number,

}

type Defects = {
  id: number,
  damaged: number,
  bitten: number,
  burned: number,
  immature: number,
  sour: number,
}

type Quality = {
  id: number,
  humidity: number,
  color: string,
  roast: string,
  sizes_16_18: number,
  sizes_13_15: number,
  stain_percentage: number,
}

interface ICataAttr {
  id: number,
  title: string,
  general: General,
  defects: Defects,
  quality: Quality,
}