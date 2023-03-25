export interface IAppState {
  loadingState: ILoadingState;
}

export interface ILoadingState {
  label: string;
  showProgress: boolean;
  progress: number;
  isLoading: boolean;
}
