import axios from "axios";
import Sentiment from "sentiment";

const POSITIVE = "positive";
const NEGATIVE = "negative";
const NORMAL = "normal";

const positiveEmotions = ["😆", "😄", "😁", "😀", "😃", "😊", "🙂"];
const negativeEmotions = ["😕", "🥲", "😥", "😔", "🤨", "😫", "😩", "😠", "😡"];

interface Config {
  headers: {
    "content-type": string;
    "x-naver-client-id": string;
    "x-naver-client-secret": string;
  };
}

interface Emoji {
  [index: number]: string;
}

interface EmotionTypeBase {
  count: number;
}

interface EmotionType extends EmotionTypeBase {
  score: number;
  words: string[];
}

interface EmotionScore {
  [POSITIVE]: EmotionType;
  [NEGATIVE]: EmotionType;
  normal: EmotionTypeBase;
  advice: string;
  comparative: number;
  score: number;
  emoji: Emoji;
}

class Analyzer {
  private emojis: Emoji[] = positiveEmotions
    .concat("😐")
    .concat(negativeEmotions);
  private url: string = "/v1/papago/n2mt";
  private result: string;
  private analyzedResult: Sentiment.AnalysisResult;
  private emotionScore: EmotionScore = {
    [POSITIVE]: {
      score: 0,
      count: 0,
      words: [],
    },
    [NEGATIVE]: { score: 0, count: 0, words: [] },
    [NORMAL]: {
      count: 0,
    },
    advice: "",
    comparative: 0,
    score: 0,
    emoji: "",
  };

  public config: Config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-naver-client-id": "RMZNtvLy7KLYbVOzM7U3",
      "x-naver-client-secret": "b1nyMkEfJl",
    },
  };

  constructor(
    private source: string = "ko",
    private target: string = "en",
    private text: string
  ) {
    axios.defaults.withCredentials = true;
  }

  // axios로 papago 번역 api 요청
  async translate() {
    const res = await axios // post 방식 다르게 사용하면 cors 피할 수 있음.
      .post(
        this.url,
        `source=${encodeURIComponent(this.source)}&target=${encodeURIComponent(
          this.target
        )}&text=${encodeURIComponent(this.text)}`,
        this.config
      );
    const translatedText = await res.data;
    console.log("[TranslatedText]", translatedText);
    this.result = translatedText.message.result.translatedText;
  }

  // 영문 감정 분석
  analyze(options?: Sentiment.AnalysisOptions): Sentiment.AnalysisResult {
    const sentiment = new Sentiment();
    this.analyzedResult = sentiment.analyze(this.result, options);
    console.log("[Sentiment]", this.analyzedResult);
    return this.analyzedResult;
  }

  // 각 감정의 단어 갯수, 점수 합계, 이모지 추출
  getEmotionScore(): EmotionScore {
    this.analyzedResult.calculation.forEach((wordScore) => {
      const [token, score] = Object.entries(wordScore).pop();
      const Emotions = score > 0 ? POSITIVE : score < 0 ? NEGATIVE : NORMAL;

      if (Emotions !== NORMAL) {
        this.emotionScore[Emotions].score += score;
        this.emotionScore[Emotions].words.push(token);
      }

      this.emotionScore[Emotions].count += 1;
    });
    this.emotionScore.comparative = this.analyzedResult.comparative;
    this.emotionScore.score = this.analyzedResult.score;
    this.emotionScore.emoji = this.getEmoji();
    return this.emotionScore;
  }

  // 감정 점수 비교값으로 이모지 추출
  private getEmoji(): string {
    const baseIndex = 7;
    const comparative = this.emotionScore.comparative;
    const isPositive = comparative > 0;
    let compared;
    compared = Math.abs(isPositive ? comparative - 1 : comparative);
    const index = Math.ceil(
      (Math.ceil(compared * 10) / 10) * (isPositive ? baseIndex : 9)
    );
    const lastIndex = isPositive ? baseIndex - index : baseIndex + index;
    return this.emojis[lastIndex] as string;
  }
}

export default Analyzer;
