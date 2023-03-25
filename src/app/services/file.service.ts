import { Injectable } from "@angular/core";
import { FactoryService } from "@app/services/factory.service";

export interface IFileLoderReport {
  onLoadStart?: () => void;
}

@Injectable({
  providedIn: "root",
})
export class FileService {
  constructor(private factoryService: FactoryService) {}
  /**
   * Read a file and return the reader
   * @param file - File to read
   * @returns - Reader
   */
  readAsDataURL(file: File): FileReader {
    const { factoryService } = this;
    const reader = factoryService.createFileReader();
    reader.readAsDataURL(file);
    return reader;
  }
}
