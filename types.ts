export enum Ethnicity {
  ASIAN = '亞洲人',
  CAUCASIAN = '白人',
  BLACK = '黑人',
  LATINO = '拉丁裔',
  MIDDLE_EASTERN = '中東人',
}

export enum Vibe {
  COOL = '冷酷霸氣',
  ENERGETIC = '活潑陽光',
  ELEGANT = '優雅氣質',
  CASUAL = '隨性休閒',
  PROFESSIONAL = '專業幹練',
  VINTAGE = '復古文青',
}

export enum Scene {
  STUDIO = '極簡純色攝影棚',
  STREET = '繁華都市街頭',
  NATURE = '陽光灑落的公園',
  CAFE = '質感咖啡廳',
  BEACH = '日落海灘',
  FUTURE = '賽博龐克未來風格',
}

export interface GenerationConfig {
  ethnicity: Ethnicity;
  vibe: Vibe;
  scene: Scene;
}

export interface GeneratedImageResult {
  imageUrl: string;
}

declare global {
  interface AIStudio {
    hasSelectedApiKey(): Promise<boolean>;
    openSelectKey(): Promise<void>;
  }
}
