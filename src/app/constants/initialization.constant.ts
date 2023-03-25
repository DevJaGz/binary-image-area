import { IAppState, ILoadingState } from "@app/interfaces/app-state.interface";

export const InitLoadingState: ILoadingState = {
  isLoading: false,
  loadingLabel: "",
  progressValue: 0,
  showProgress: false,
};

export const InitAppState: IAppState = {
  loadingState: InitLoadingState,
};
