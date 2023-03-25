import { Injectable } from "@angular/core";
import { IUploadImageReport } from "@app/interfaces/reporter.interface";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FactoryService {
  /**
   * Factory for file readers
   * @returns - File reader
   */
  createFileReader(): FileReader {
    return new FileReader();
  }

  /**
   * Factory for reporter readers
   * @returns - File reader
   */
  createImageUploadReporter(): Subject<IUploadImageReport> {
    return new Subject<IUploadImageReport>();
  }
}
