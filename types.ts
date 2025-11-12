
export interface DesignStyle {
  name: string;
  prompt: string;
  imageUrl: string;
}

export enum AppState {
  IDLE,
  IMAGE_SELECTED,
  GENERATING,
  RESULT_READY,
  ERROR,
}
