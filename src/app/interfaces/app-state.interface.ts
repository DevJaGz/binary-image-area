export interface IAppState {
  loadingState: ILoadingState;
}

export interface ILoadingState {
  loadingLabel: string;
  showProgress: boolean;
  progressValue: number;
  isLoading: boolean;
}
