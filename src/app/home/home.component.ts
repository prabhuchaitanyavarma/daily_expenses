import { Component, OnInit, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { HelperMethodsService } from '../helper-methods.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

const now = new Date();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clients: any[];
  dataTable: any;
	public TOKEN = 'token';
  amount: any;
  description: any;
  category: any;
  date: any;
  time: any;
  meridian = true;
  categories: any;
  closeResult: any;
  transactions: any;
  defaultCategory = 1;
  isNew: boolean;
  transactionId;
  amountError = false;
  categoryError = false;
  defaultFilter = 'month';
  private years: number[] =[];
  private yy : number;
  month;
  year;
  mm;
  months = [
    { val: '01',  name: 'Jan' },
    { val: '02',  name: 'Feb' },
    { val: '03',  name: 'Mar' },
    { val: '04',  name: 'Apr' },
    { val: '05',  name: 'May' },
    { val: '06',  name: 'Jun' },
    { val: '07',  name: 'Jul' },
    { val: '08',  name: 'Aug' },
    { val: '09',  name: 'Sep' },
    { val: '10',  name: 'Oct' },
    { val: '11',  name: 'Nov' },
    { val: '12',  name: 'Dec' }
  ];



  constructor(private modalService: NgbModal, public restApi: DataService, public helpers: HelperMethodsService, public toastr: ToastsManager, vcr: ViewContainerRef, private chRef: ChangeDetectorRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.restApi.categories(this.defaultFilter)
    .subscribe(data => {
      if(this.helpers.checkStatus(data)){
        this.transactions = data.transactions
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this.categories = data.categories;
      }else{
        this.toastr.error(data.message, 'Oops!');
      }
    })
  }

  getMonth(){
    var today = new Date();
    this.mm = today.getMonth()+1;
    this.month = today.getMonth()+1;
    if(this.mm<10) {
      this.mm='0'+this.mm
    }
  }

  getYear(){
    var today = new Date();
    this.yy = today.getFullYear();
    this.year = today.getFullYear();
    for(var i = (this.yy-100); i <= this.yy; i++){
      this.years.push(i);
    }
  }

  onMonthChange(month){
    this.month = month;
    this.restApi.expensesByDate(month, this.year)
    .subscribe(data => {
      if(this.helpers.checkStatus(data)){
        this.transactions = data.transactions
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this.categories = data.categories
      }else{
        this.toastr.error(data.message, 'Oops!');
      }
    })
  }

  onYearChange(year){
    this.year = year
    this.restApi.expensesByDate(this.month, year)
    .subscribe(data => {
      if(this.helpers.checkStatus(data)){
        this.transactions = data.transactions
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this.categories = data.categories
      }else{
        this.toastr.error(data.message, 'Oops!');
      }
    })
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

  ngOnInit() {
    let btn = window.document.querySelector(".month-btn");
    btn.className += " active";
    this.getMonth();
    this.getYear();
  	var token=sessionStorage.getItem(this.TOKEN);
  }

  open(content, trasaction) {
    if(trasaction){
      let dateArray=trasaction.date.split('-')
      let timeArray=trasaction.time_in_24_hours.split(':')
      this.amount = trasaction.amount
      this.description = trasaction.description
      this.date = {year: parseInt(dateArray[0]), month: parseInt(dateArray[1]), day: parseInt(dateArray[2])};
      this.time = {hour: parseInt(timeArray[0]), minute: parseInt(timeArray[1])};
      this.defaultCategory = trasaction.category_id
      this.transactionId = trasaction.id
      this.isNew = false
    }else{
      let currentDate = new Date();
      this.isNew = true
      this.amount = null
      this.description = null
      this.date = {year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate()};
      this.time = {hour: currentDate.getHours(), minute: currentDate.getMinutes()};
      this.defaultCategory = 0;
    }
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


 private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return  `with: ${reason}`;
   }
 }

  filterChange(duration){
    this.restApi.categories(duration)
    .subscribe(data => {
      if(this.helpers.checkStatus(data)){
        this.transactions = data.transactions
        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
        this.categories = data.categories
      }else{
        this.toastr.error(data.message, 'Oops!');
      }
    })
  }

  onChange(event){
    this.categoryError = false
  }

  amountChange(event){
    this.amountError = event ? false : true
  }

  addExpense(isNew, d){
    this.amountError = false
    this.categoryError = false
    let amount = this.amount;
    let category = this.defaultCategory;
    if(amount && category!=0){
       var date = this.date.year+'-'+this.date.month+'-'+this.date.day;
       var time = this.time.hour+':'+this.time.minute;
       if(isNew){
         let expense = {transaction: {transaction_type:"expense", amount: amount, description: this.description, category_id: this.defaultCategory, date: date, time: time}}
         this.restApi.addExpense(expense)
         .subscribe(data => {
           if(this.helpers.checkStatus(data)){
             this.transactions = data.transactions
             d('Cross click');
           }else{
             this.toastr.error(data.message, 'Oops!');
             d('Cross click');
           }
         })
       }else{
         let expense = {transaction: {id: this.transactionId,transaction_type:"expense", amount: this.amount, description: this.description, category_id: this.defaultCategory, date: date, time: time}}
         this.restApi.editExpense(expense)
         .subscribe(data => {
           if(this.helpers.checkStatus(data)){
             this.transactions = data.transactions;
             d('Cross click');
           }else{
             this.toastr.error(data.message, 'Oops!');
             d('Cross click');
           }
         })
       }
    }else{
      if(!amount && category == 0){
        this.amountError = true
        this.categoryError = true
      }else if(!amount){
        this.amountError = true
      }else{
        this.categoryError = true
      }

    }
  }

  deleteExpense(transaction, i){
    var result = confirm("Want to delete?");
    if(result){
      this.restApi.deleteExpense({id: transaction.id})
      .subscribe(data => {
        if(this.helpers.checkStatus(data)){
          this.transactions.splice(i, 1);
        }else{
          this.toastr.error(data.message, 'Oops!');
        }
      })
    }
  }

}
