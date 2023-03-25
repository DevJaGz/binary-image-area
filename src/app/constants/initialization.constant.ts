import {
  IAppState,
  IImageState,
  ILoadingState,
} from "@app/interfaces/app-state.interface";

export const InitLoadingState: ILoadingState = {
  isLoading: false,
  label: "",
  progress: 0,
  showProgress: false,
};

export const InitImageState: IImageState = {
  file: null,
};

export const InitAppState: IAppState = {
  loadingState: InitLoadingState,
  imageState: InitImageState,
};
