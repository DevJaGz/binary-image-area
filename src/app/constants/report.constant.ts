export enum ReportStatus {
  InProgress = "In progress",
  Done = "Done",
  Failed = "Failed",
}

export enum ReportCode {
  OK = 200,
  Aborted = 400,
  ReadingFileError = 511,
}

export const ReportCodeMessage: { [key in ReportCode]: string } = {
  [ReportCode.OK]: "Working correctly",
  [ReportCode.Aborted]: "Process Aborted",
  [ReportCode.ReadingFileError]: "Unknown Error",
};
