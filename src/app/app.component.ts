import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import {FilterService} from 'primeng/api';
import * as moment from 'moment';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})

export class AppComponent {
	filterValue: string = "";
dateFilterOptions: any;

  // ... other code

  
 
 
 
 
  customDateFilter(value: any): boolean {
	alert('filtering')
    if (!this.filterValue) {
      return true; // If no filter, display the row
    }

    // Your custom filtering logic based on the filterValue and the 'value' of the column
    return this.dateIs(value, this.filterValue);
  }
  
  
	//customDateFilter = this.customDateFilter.bind(this);
	customMatchModeOptions: SelectItem[] = [];
	//customIs = 'customIs'
	/* customIs(value: Date, filter: Date): boolean {
		alert("customIs")
		// Implement your custom filter logic here for "La date est le"
		// Return true if the value matches the filter, false otherwise
		// For example, you might want to compare the date value with the filter date
		return value.getTime() === filter.getTime();
	  } */
	  customIs(event: Date) {
		// Implement your custom filter logic here using event
		console.log('Custom filter event:', event);
	  }

	  dateRangeStart: string | undefined = undefined;
    dateRangeEnd: string | undefined = undefined;
	  onDateSelect(event: Date) {
		//alert("date selection"+event)

        const eventDate = moment(event).format("DD-MM-YYYY");

		alert("eventDate"+eventDate)

        /* if (this.dateRangeStart === undefined) {
            this.dateRangeStart = eventDate;
        } else if (moment(event).isBefore(this.dateRangeStart)) {
            this.dateRangeStart = eventDate;
            this.dateRangeEnd = undefined;
        } else if (moment(event).isSame(this.dateRangeStart) && this.dateRangeStart !== undefined && this.dateRangeEnd === undefined) {
            this.dateRangeEnd = eventDate;
        } else if (moment(event).isSame(this.dateRangeStart) && this.dateRangeStart !== undefined && this.dateRangeEnd !== undefined) {
            this.dateRangeStart = eventDate;
            this.dateRangeEnd = undefined;
        } else if (moment(event).isAfter(this.dateRangeStart) && this.dateRangeStart !== undefined && this.dateRangeEnd !== undefined) {
            this.dateRangeStart = eventDate;
            this.dateRangeEnd = undefined;
        } else {
            this.dateRangeEnd = eventDate;
        } */
		const filterValue = new Date(eventDate);
        //this.table.filter(eventDate, 'createdDate', 'customCreatedDateFilter');
		console.log(this.table)
		//this.table.filter(eventDate, 'date','equals');
		this.filterService.filter(this.table.value, ['date'], eventDate,'is');
    }

    onDateClear(event: Date) {
        this.dateRangeStart = undefined;
        this.dateRangeEnd = undefined;
        this.table.filter('', 'createdDate', 'equals');
    }

    formatDate(date: Date) {
		let monthStr: string
		let dayStr: string
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            monthStr = '0' + month;
        }

        if (day < 10) {
            dayStr = '0' + day;
        }
        return date.getFullYear() + '-' + month + '-' + day;
    }

    customCreatedDateArrayFilter(event: Date) {
        this.table.filter(event, 'createdDate', 'customCreatedDateFilter');
    }

	
	tutorials: Tutorial[] = [];
	@ViewChild('dt')
  table!: Table;
	constructor(private primengConfig: PrimeNGConfig,
		 private filterService: FilterService
		) {}

	ngOnInit() {
		const dateFilterOptions: SelectItem[] = [
			{ label: 'Date is', value: 'equals' },
			{ label: 'Date is not', value: 'notEquals' },
			{ label: 'Date is after', value: 'after' },
			{ label: 'Date is between', value: 'between' }  // Custom option for "Date is between"
		  ];
		 this.customMatchModeOptions = [ {value: this.customIs, label:'La date est le'}]
		const customFilterName = "custom-equals";
/* this.filterService.register(
customFilterName,
(value: { toString: () => any; } | null | undefined, filter: string | null | undefined): boolean => {
	alert('yyyyyyyyyyyy'+filter?.toString()+value?.toString())
if (filter === undefined || filter === null || filter.trim() === "") {
//return true;
}
if (value === undefined || value === null) {
//return false;
}
alert('value')
return value?.toString() === filter?.toString();
}
);  */
		this.tutorials = [
			{
				title: 'Queue',
				category: 'Data Structure',
				rating: 8,
				date: '03-10-2023'
			},
			{
				title: 'Circularly LinkedList',
				category: 'Data Structure',
				rating: 1,
				date: '01-02-2022'
			},
			{
				title: 'Doubly LinkedList',
				category: 'Data Structure',
				rating: 3,
				date: '03-10-2023'
			},
			{
				title: 'Singly LinkedList',
				category: 'Data Structure',
				rating: 5,
				date: '01-02-2022'
			},
			{
				title: 'Doubly Ended Queue',
				category: 'Data Structure',
				rating: 10,
				date: '01-02-2022'
			},
			{
				title: 'Binary Search Tree',
				category: 'Data Structure',
				rating: 2,
				date: '01-02-2022'
			},
			{
				title: 'Red Black Tree',
				category: 'Data Structure',
				rating: 9,
				date: '01-02-2022'
			},
			{
				title: 'Breadth First Search',
				category: 'Graph',
				rating: 6,
				date: '01-02-2022'
			},
			{
				title: "Floyd's Cycle",
				category: 'Algorithm',
				rating: 7,
				date: '01-02-2022'
			},
			{
				title: 'Travelling Salesman Problem',
				category: 'Algorithm',
				rating: 4,
				date: '01-02-2022'
			},
			{
				title: 'Bellman Ford',
				category: 'Graph',
				rating: 8,
				date: '01-02-2022'
			},
			{
				title: 'KMP Algorithm',
				category: 'String',
				rating: 10,
				date: '01-02-2022'
			},
		];
		this.primengConfig.ripple = true;

		/* FilterUtils['customCreatedDateFilter'] = (value: string, filter: any) => {

            if (this.dateRangeStart === value && this.dateRangeEnd === undefined) {
                return true;
            }

            if (this.dateRangeStart === value || this.dateRangeEnd === value) {
                return true;
            }

            if (this.dateRangeStart !== undefined && this.dateRangeEnd !== undefined &&
                moment(this.dateRangeStart).isBefore(value) && moment(this.dateRangeEnd).isAfter(value)) {
                return true;
            }

            return false;
        }; */

	}

	dateIs(value: any, filter: string): boolean {
		if (!value || typeof value !== 'string') {
		  return true; // If no value or not a string, display the row
		}
	  
		const dateParts = value.split('-'); // Assuming the format is 'dd-mm-yyyy'
		if (dateParts.length !== 3) {
		  return false; // Invalid date format, hide the row
		}
	  
		const year = parseInt(dateParts[2], 10);
		const month = parseInt(dateParts[1], 10) - 1; // Month is zero-based
		const day = parseInt(dateParts[0], 10);
	  
		const dateValue = new Date(year, month, day);
	  
		if (isNaN(dateValue.getTime())) {
		  return false; // Invalid date, hide the row
		}
	  
		if (!filter) {
		  return true; // If no filter, display the row
		}
	  
		const filterParts = filter.split('-');
		if (filterParts.length !== 3) {
		  return false; // Invalid filter format
		}
	  
		const filterYear = parseInt(filterParts[2], 10);
		const filterMonth = parseInt(filterParts[1], 10) - 1; // Month is zero-based
		const filterDay = parseInt(filterParts[0], 10);
	  
		const filterDate = new Date(filterYear, filterMonth, filterDay);
	  
		// Compare the date values
		return dateValue.getTime() === filterDate.getTime();
	  }
	  
}
export interface Tutorial {
	title?: string;
	category?: string;
	rating?: number;
	date?: string
}

export function customDateFilter(value: Date, filter: any[]): boolean {
	const filterOption = filter[0];
	const filterValue = filter[1];
  
	switch (filterOption) {
	  case 'equals':
		return value.getTime() === filterValue.getTime();
  
	  case 'notEquals':
		return value.getTime() !== filterValue.getTime();
  
	  case 'after':
		return value > filterValue;
  
	  case 'between':  // Custom "Date is between" logic
		const secondFilterValue = filter[2];
		return value >= filterValue && value <= secondFilterValue;
  
	  default:
		return true;
	}
  }
