import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employ-list',
  templateUrl: './employ-list.component.html',
  styleUrls: ['./employ-list.component.css']
})
export class EmployListComponent implements OnInit {

  public employees = [];
  public errorMessage;
  public selectedId;

  constructor(private _employee: EmployeesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this._employee.getEmployees()
        .subscribe(data => this.employees = data,
                  error => this.errorMessage = error);
    // Read the optional parameter (id) from URL if exists
    this.route.params.subscribe(data => {
      if(data.id){
        this.selectedId = data.id
      }
    });
  }


  public selectEmployee (employee){
    // Add parameters to 'employlist' URL as defined in routing module-> localhost/4200/employlist/<employee.id>
    this.router.navigate(['employlist', employee.id])
  }

  public isSelected(employee){
    console.log(employee);
    // return this.selectedId === employee.id;
  }
}
