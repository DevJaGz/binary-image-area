import { Injectable } from "@angular/core";
import { ReportCode, ReportStatus } from "@app/constants/report.constant";
import { IUploadImageReport } from "@app/interfaces/reporter.interface";
import { FactoryService } from "@app/services/factory.service";
import { FileService } from "@app/services/file.service";
import { Observable, of, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageLoaderService {
  /**
   * Reporter to notify the image uploading report
   */
  private report: IUploadImageReport = this.initialReport;

  /**
   * Initial report
   */
  get initialReport(): IUploadImageReport {
    return {
      status: ReportStatus.InProgress,
      statusCode: ReportCode.OK,
      progress: 0,
      data: "",
    };
  }

  /**
   * Report when the file is null
   */
  get nullFileReport(): IUploadImageReport {
    return {
      status: ReportStatus.Failed,
      statusCode: ReportCode.NullFile,
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
   * Handle the image uploading and notify the process
   * @param file - File to upload
   * @returns Report of the uploading
   */
  private handleUploading(file: File): Observable<IUploadImageReport> {
    if (!file) {
      return of(this.nullFileReport);
    }

    const { fileService, factoryService } = this;
    const reporter = factoryService.createImageUploadReporter();
    const reader = fileService.readAsDataURL(file);
    this.handleOnLoadStart(reader, reporter);
    this.handleOnProgress(reader, reporter);
    this.handleOnLoad(reader, reporter);
    this.handleOnAbort(reader, reporter);
    this.handleOnError(reader, reporter);

    return reporter.asObservable();
  }

  /**
   * Handle when the uploading of the image start
   * @param reader - Object to assign the event
   * @param reporter - Reporter that generate the report
   */
  private handleOnLoadStart(
    reader: FileReader,
    reporter: Subject<IUploadImageReport>
  ): void {
    reader.onloadstart = () => reporter.next(this.report);
  }

  /**
   * Handle when the uploading of the image is in progress
   * @param reader - Object to assign the event
   * @param reporter - Reporter that generate the report
   */
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

  /**
   * Handle when the uploading of the image has finished
   * @param reader - Object to assign the event
   * @param reporter - Reporter that generate the report
   */
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

  /**
   * Handle when the uploading of the image has been aborted
   * @param reader - Object to assign the event
   * @param reporter - Reporter that generate the report
   */
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
      reporter.complete();
    };
  }

  /**
   * Handle when the uploading of the image has failed
   * @param reader - Object to assign the events
   * @param reporter - Reporter that generate the report
   */
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
      reporter.complete();
    };
  }

  /**
   * Update the report
   * @param partialReport - Partial data for the report
   * @returns - Report updated
   */
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
