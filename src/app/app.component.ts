import { Component } from "@angular/core";
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";
import { Car } from "./car";
import { CarService } from "./carservice";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  cars: Car[] = [];

  cols: any[] = [];

  matchModeOptions: SelectItem[] = [];

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
      { field: "date", header: "Date" }
    ];

    this.matchModeOptions = [
      { label: "Custom Equals", value: customFilterName },
      { label: "Starts With", value: FilterMatchMode.STARTS_WITH },
      { label: "Contains", value: FilterMatchMode.CONTAINS }
    ];

    this.carService.getCarsMedium().then(cars => (this.cars = cars));
  }
}
