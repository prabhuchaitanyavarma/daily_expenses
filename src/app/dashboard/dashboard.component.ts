import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HelperMethodsService } from '../helper-methods.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  id = 'chart1';
  width = 800;
  height = 450;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;



 constructor(public toastr: ToastsManager, public restApi: DataService, public helpers: HelperMethodsService) {
 		this.restApi.graphInfo("month")
 		.subscribe(data => {
 		  if(this.helpers.checkStatus(data)){
 		    this.dataSource = data
 		  }else{
 		    this.toastr.error(data.message, 'Oops!');
 		  }
 		})
 	}

  ngOnInit() {
  	let btn = window.document.querySelector(".month-btn");
  	btn.className += " active";
  }

  onButtonGroupClick($event){
     let clickedElement = $event.target || $event.srcElement;
     if( clickedElement.nodeName === "BUTTON" ) {
       let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
       if( isCertainButtonAlreadyActive ) {
         isCertainButtonAlreadyActive.classList.remove("active");
       }
       clickedElement.className += " active";
     }
   }

   filterChange(duration){
     this.restApi.graphInfo(duration)
     .subscribe(data => {
       if(this.helpers.checkStatus(data)){
        this.dataSource = data
        duration!="month" ? this.dataSource.chart.subCaption = "" : null
       }else{
         this.toastr.error(data.message, 'Oops!');
       }
     })
   }

}
