export interface IAppState {
  loadingState: ILoadingState;
  imageState: IImageState;
}

export interface ILoadingState {
  label: string;
  showProgress: boolean;
  progress: number;
  isLoading: boolean;
}

export interface IImageState {
  file: File;
}
