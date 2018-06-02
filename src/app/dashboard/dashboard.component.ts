import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

declare var $: any;




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private router: Router) {
   }

  options  = [
    'MAT',
    'ENG',
    'GEN',
    'ALL'
  ];
  selected;


  ngOnInit() {
  }


  startQuiz(value) {
    $('#modal-fadein').modal('show');
    this.selected = value;
  }

  start() {
    const e = (document.getElementById('number')) as HTMLSelectElement;
    const sel = e.selectedIndex;
    const opt = e.options[sel];
    const number = Number(opt.text);
    const subject = this.options[this.selected];
    console.log('You will be doing ' + this.options[this.selected] + ' ' + number + ' ' + 'questions');
    this.router.navigate(['test', subject, number]);
  }

}
