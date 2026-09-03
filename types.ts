export interface QuizOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  translation: string;
  note?: string;
}

export interface QuizQuestion {
  id: number;
  spanish: string;
  russian: string;
  options: QuizOption[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  grammarTopic: string;
  explanation: string;
}

export interface WheelSector {
  id: number;
  label: string;
  sublabel?: string;
  type: 'points' | 'plus' | 'multiplier' | 'prize' | 'chance';
  value: number;
  color: string;
  textColor: string;
}

export interface SecretWordState {
  word: string;
  revealed: boolean[];
  hint: string;
}
