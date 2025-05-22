/**
 * 桥接模式的核心是：将抽象与实现解耦，使它们可以独立地变化。
 */
import {Injectable} from "@angular/core";


// 抽象部分
abstract class Shape {
  constructor(protected color: Color) {}
  abstract draw(): void;
}

// 实现部分
interface Color {
  fill(): string;
}


//我们想要导出报表，但可能有 多个数据来源（DataSource） 和 多个导出格式（Exporter）：

/**
 * Exporter
 */
export interface Exporter {
  export(data: any): void;
}

// @Injectable()
export class PdfExporter implements Exporter {
  export(data: any) {
    console.log('Export as PDF:', data);
  }
}

// @Injectable()
export class ExcelExporter implements Exporter {
  export(data: any) {
    console.log('Export as Excel:', data);
  }
}



