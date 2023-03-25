import { IAppState, ILoadingState } from "@app/interfaces/app-state.interface";

export const InitLoadingState: ILoadingState = {
  isLoading: false,
  label: "",
  progress: 0,
  showProgress: false,
};

export const InitAppState: IAppState = {
  loadingState: InitLoadingState,
};
