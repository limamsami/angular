import { Component } from "@angular/core";
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";
import { Car } from "./car";
import { CarService } from "./carservice";
import * as moment from 'moment';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  cars: Car[] = [];
  filteredCars: Car[] = [];

  cols: any[] = [];

  matchModeOptions: SelectItem[] = [];
  matchModeOptionsForDateType: SelectItem[] = [];

  dateFilterValue: Date | null = null;

  constructor(
    private carService: CarService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    const customFilterName = "custom-equals";
	
    this.filterService.register(
      customFilterName,
      (value:any, filter:any): boolean => {
		if (filter === undefined || filter === null) {
          return true;
        }
		
        if (value === undefined || value === null) {
          return false;
        }

		if (filter != undefined && filter != null) {
			alert(filter)
		}

        return value.toString() === moment(filter).format("DD-MM-YYYY").toString();
      }
    );

    this.matchModeOptions = [
      { label: "Starts With", value: FilterMatchMode.STARTS_WITH },
      { label: "Contains", value: FilterMatchMode.CONTAINS }
    ];

	this.matchModeOptionsForDateType = [
		{ label: "Custom Equals", value: customFilterName },
	];

	this.cols = [
		{ field: "year", header: "Year", type: "numeric", matchModeOptions: this.matchModeOptions },
		{ field: "brand", header: "Brand", type: "text", matchModeOptions: this.matchModeOptions },
		{ field: "color", header: "Color", type: "text", matchModeOptions: this.matchModeOptions },
		{ field: "date", header: "Date", type: "date", matchModeOptions: this.matchModeOptionsForDateType }
	  ];

    this.carService.getCarsMedium().then(cars => (this.cars = cars));
  }

  onDateFilterSelect(event: any) {
    // Handle date filter selection
    this.dateFilterValue = event;

    // Apply filter
    this.applyFilter();
  }

  applyFilter() {
	alert(this.dateFilterValue)
    // Filter based on dateFilterValue
    this.filteredCars = this.cars.filter(car => {
      if (this.dateFilterValue) {
		//alert(car.date)
        //const carDate = new Date(car.date); // Assuming tutorial.date is a string
        return car.date === moment(this.dateFilterValue).format("DD-MM-YYYY").toString();
      }
      return true; // If no filter value, return all
    });
	console.log(this.filteredCars)
	this.cars = this.filteredCars;
  }


}
