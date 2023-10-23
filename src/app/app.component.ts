import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";
import { Car } from "./car";
import { CarService } from "./carservice";
import * as FileSaver from 'file-saver';
import autoTable from 'jspdf-autotable';
import { Table } from "primeng/table";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {

  @ViewChild("dt", { static: false }) public dt: Table | undefined;
  
  filterModeIcon = "pi pi-filter" ;
  filterModeTooltip = "menu_mode" ;

  cars: Car[] = [];

  displayFilter: string = "menu"

  cols: Col[] = [];
  selectedColumns: any[] = [];

  exportColumns: any[] = [];

  matchModeOptions: SelectItem[] = [];
  matchModeOptionsForDateType: SelectItem[] = [];

  changeHeaderFiltersMode: string = "menu";

  showHeaderFilters: boolean = true

  filterValues: { [key: string]: any } = {};

  constructor(
    private carService: CarService,
    private filterService: FilterService,
    private _cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if(this.changeHeaderFiltersMode === "menu" && this.filterModeTooltip === "menu_mode"){
      this.filterModeTooltip = "row_mode";
      this.filterModeIcon = "pi pi-check";
    } else {
      this.filterModeTooltip = "menu_mode";
      this.filterModeIcon = "pi pi-ellipsis-v";
    }

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
		{ field: "year", header: "year", type: "numeric", matchModeOptions: this.matchModeOptions, filterValue: null },
		{ field: "brand", header: "brand", type: "text", matchModeOptions: this.matchModeOptions, filterValue: null },
		{ field: "price", header: "Prix", type: "numeric", matchModeOptions: this.matchModeOptions, filterValue: null },
		{ field: "date", header: "Date", type: "date", matchModeOptions: this.matchModeOptionsForDateType, filterValue: null }
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
  const worksheetData = this.cars.map(car => {
    const rowData: { [header: string]: any } = {};
    this.cols.forEach(col => {
      rowData[col.header] = car[col.field];
    });
    return rowData;
  });

    import("xlsx").then(xlsx => {
      // Calculate sum for numeric columns
      const sommes = this.cols.map(col => {
        if (col.type === 'numeric') {
          return this.calculateColumnSum(worksheetData, col.header)
        } else {
          return null
        }
      }

      )
      console.log("sommes "+sommes)
      const headers = this.cols.map(col => col.header);
      const titlesObject = headers.reduce((acc, header, index) => {
        if (sommes[index] != null) {
          acc[header] = 'Total'
        } else {
          acc[header] = ''
        } 
        return acc;
      }, {} as { [key: string]: string | null });
      const sumsObject = headers.reduce((acc, header, index) => {
        acc[header] = sommes[index];
        return acc;
      }, {} as { [key: string]: number | null });
      console.log('Sums by column header:', sumsObject);


        const dataWithSumRow = [...worksheetData, titlesObject, sumsObject];
        const worksheet = xlsx.utils.json_to_sheet(dataWithSumRow);
        worksheet['!cols'] = [];
        this.getDifferences(this.cols, this.selectedColumns).forEach( (index:number) =>
        worksheet['!cols']!![index] = { hidden: true }
        );
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "cars");
    });
}

getDifferences(input: Col[], output: Col[]) : number[] {
  let differences: number[] = []

  input.forEach((inputCol, index) => {
    const foundCol = output.find(outputCol => inputCol.header === outputCol.header);
    if (!foundCol) {
      differences.push(index);
    }
  });

  return differences

}

action(table: Table) {
  //alert(this.selectedColumns[0].field)
  /* this._cdRef.detectChanges()
  this.cols.forEach(col => {
    //col.filterValue = null;
    this.filterValues[col.field] = null;
  }); */

  //delete table.filters['brand']
  //delete table.filters['year']
  //delete table.filters['prix']
  //delete table.filters['date']
//table._filter()

  //table.reset()
  //table.filter('', 'brand', 'contains'); 
  //this.dt?._filter()
  //alert("differences"+this.getDifferences(this.cols, this.selectedColumns))

        table.filters['brand'] = { value: null, matchMode: undefined }
        table.filters['year'] = { value: null, matchMode: undefined }
        table.filters['price'] = { value: null, matchMode: undefined }
        table.filters['date'] = { value: null, matchMode: undefined }
        table._filter()

        //table.clearFilterValues()

        
        
}

onFiltering(event: any) {
  console.log('Filtered value: '+ JSON.stringify(event.filters));
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

toggleHeaderFiltersMode(){
  if(this.filterModeTooltip === "menu_mode"){
    this.changeHeaderFiltersMode = "menu";
    this.filterModeIcon = "pi pi-echeck";
    this.filterModeTooltip = "row_mode";
    this._cdRef.detectChanges()
    //this.showHeaderFilters = false
  } else { 
    this.changeHeaderFiltersMode = "row";
    this.filterModeIcon = "pi pi-ellipsis-v";
    this.filterModeTooltip = "menu_mode";
    //alert("row mode")
    //this._cdRef.detectChanges()
    this.dt!!.filters['brand'] = { value: null, matchMode: undefined }
    this.dt!!.filters['year'] = { value: null, matchMode: undefined }
    this.dt!!.filters['price'] = { value: null, matchMode: undefined }
    this.dt!!.filters['date'] = { value: null, matchMode: undefined }
    this.dt!!._filter()
  }
}

calculateColumnSum(data: any[], columnName: string): number {
  let sum = 0;
  for (const item of data) {
    if (typeof item[columnName] === 'number') {
      sum += item[columnName];
    }
  }
  return sum;
}


}
type FieldName = keyof Car;
interface Col {
  field: FieldName;
  header: string;
type: string;
 matchModeOptions: SelectItem[];
 filterValue: any;
}
