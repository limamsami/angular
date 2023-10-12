import { Component } from "@angular/core";
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";
import { Car } from "./car";
import { CarService } from "./carservice";
import * as FileSaver from 'file-saver';
import autoTable from 'jspdf-autotable'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  cars: Car[] = [];

  cols: any[] = [];
  selectedColumns: any[] = [];

  exportColumns: any[] = [];

  matchModeOptions: SelectItem[] = [];
  matchModeOptionsForDateType: SelectItem[] = [];

  constructor(
    private carService: CarService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    const customFilterName = "custom-equals";

    this.filterService.register(
      customFilterName,
      (value:any, filter:any): boolean => {
        if (filter === undefined || filter === null || filter.trim() === "") {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.toString() === filter.toString();
      }
    );

    this.cols = [
      { field: "year", header: "Year" },
      { field: "brand", header: "Brand" },
      { field: "color", header: "Color" },
      { field: "vin", header: "Vin" }
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    this.matchModeOptions = [
      { label: "Custom Equals", value: customFilterName },
      { label: "Starts With", value: FilterMatchMode.STARTS_WITH },
      { label: "Contains", value: FilterMatchMode.CONTAINS }
    ];

	this.matchModeOptionsForDateType = [
		{ label: "Custom Equals", value: customFilterName },
    { label: "Date is", value: FilterMatchMode.DATE_IS },
	];

	this.cols = [
		{ field: "year", header: "Year", type: "numeric", matchModeOptions: this.matchModeOptions },
		{ field: "brand", header: "Brand", type: "text", matchModeOptions: this.matchModeOptions },
		{ field: "color", header: "Color", type: "text", matchModeOptions: this.matchModeOptions },
		{ field: "date", header: "Date", type: "date", matchModeOptions: this.matchModeOptionsForDateType }
	  ];

    this.selectedColumns = this.cols

    this.carService.getCarsMedium().then(cars => {this.cars = cars;
      
      this.cars.forEach(car => {
        car.date = new Date(car.date);
      });
      console.log(this.cars);
    });
 
  }

  exportPdf() {
    const data = [
      [1, 'Finland', 7.632, 'Helsinki'],
      [2, 'Norway', 7.594, 'Oslo'],
      [3, 'Denmark', 7.555, 'Copenhagen'],
      [4, 'Iceland', 7.495, 'Reykjavík'],
      [5, 'Switzerland', 7.487, 'Bern'],
      [9, 'Sweden', 7.314, 'Stockholm'],
      [73, 'Belarus', 5.483, 'Minsk'],
  ]

    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default("landscape", "mm", "a4");
            autoTable(doc, {
              head: this.exportColumns,
              body: data,
              didDrawCell: (data) => { },
          });
            //doc.autoTable(this.exportColumns, this.cars);
            doc.save('cars.pdf');
        })
    })
}

exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.cars);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "cars");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}
