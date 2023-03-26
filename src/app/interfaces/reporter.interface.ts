import { ReportCode, ReportStatus } from "@app/constants/report.constant";

export interface IReport {
  status: ReportStatus;
  statusCode: ReportCode;
  error?: Error;
}

export interface IUploadImageReport extends IReport {
  progress: number;
  data: string;
  file: File;
}

export interface ImageReport extends IReport {
  progress: number;
}
