export enum ReportStatus {
  InProgress = "In progress",
  Done = "Done",
  Failed = "Failed",
}

export enum ReportCode {
  OK = 200,
  NullFile = 400,
  Aborted = 420,
  ReadingFileError = 511,
}

export const ReportCodeMessage: { [key in ReportCode]: string } = {
  [ReportCode.OK]: "Working Correctly",
  [ReportCode.ReadingFileError]: "Unknown Error",
  [ReportCode.NullFile]: "File is Null",
  [ReportCode.Aborted]: "Process Aborted",
};
