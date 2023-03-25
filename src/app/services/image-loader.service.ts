import { Injectable } from "@angular/core";
import { ReportCode, ReportStatus } from "@app/constants/report.constant";
import { IUploadImageReport } from "@app/interfaces/reporter.interface";
import { FactoryService } from "@app/services/factory.service";
import { FileService } from "@app/services/file.service";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageLoaderService {
  private report: IUploadImageReport = this.initialReport;

  get initialReport(): IUploadImageReport {
    return {
      status: ReportStatus.InProgress,
      statusCode: ReportCode.OK,
      progress: 0,
      data: "",
    };
  }

  constructor(
    private fileService: FileService,
    private factoryService: FactoryService
  ) {}

  /**
   * Upload the file
   * @param file - File to upload
   */
  upload(file: File): Observable<IUploadImageReport> {
    return this.handleUploading(file);
  }

  /**
   * Notify the progress of uploading the image
   * @param file - File to upload
   * @returns Report of the uploading
   */
  private handleUploading(file: File): Observable<IUploadImageReport> {
    const { fileService: fileLoaderService, factoryService } = this;
    const reporter = factoryService.createImageUploadReporter();
    const reader = fileLoaderService.readFile(file);
    this.handleOnLoadStart(reader, reporter);
    this.handleOnProgress(reader, reporter);
    this.handleOnLoad(reader, reporter);
    this.handleOnAbort(reader, reporter);
    this.handleOnError(reader, reporter);
    return reporter.asObservable();
  }

  private handleOnLoadStart(
    reader: FileReader,
    reporter: Subject<IUploadImageReport>
  ): void {
    reader.onloadstart = () => reporter.next(this.report);
  }

  private handleOnProgress(
    reader: FileReader,
    reporter: Subject<IUploadImageReport>
  ): void {
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        const report = this.updateReport({
          progress,
        });
        reporter.next(report);
      }
    };
  }

  private handleOnLoad(
    reader: FileReader,
    reporter: Subject<IUploadImageReport>
  ): void {
    reader.onload = () => {
      const data = reader.result as string;
      const report = this.updateReport({
        data,
        status: ReportStatus.Done,
      });
      reporter.next(report);
      reporter.complete();
    };
  }

  private handleOnAbort(
    reader: FileReader,
    reporter: Subject<IUploadImageReport>
  ): void {
    reader.onabort = () => {
      const report = this.updateReport({
        status: ReportStatus.Failed,
        statusCode: ReportCode.Aborted,
        error: new Error("File read aborted"),
      });
      reporter.error(report);
    };
  }

  private handleOnError(
    reader: FileReader,
    reporter: Subject<IUploadImageReport>
  ): void {
    reader.onerror = (event) => {
      const error = new Error(
        `An error occurred while reading the file: ${event.target.result}`
      );
      const report = this.updateReport({
        status: ReportStatus.Failed,
        statusCode: ReportCode.ReadingFileError,
        error: error,
      });
      reporter.error(report);
    };
  }

  private updateReport(
    partialReport: Partial<IUploadImageReport>
  ): IUploadImageReport {
    const report = {
      ...this.report,
      ...partialReport,
    };
    this.report = report;
    return report;
  }
}
