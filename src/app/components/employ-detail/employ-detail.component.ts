import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeesService } from '../../services/employees.service';

import { IEmployee } from '../../model/employee';

@Component({
  selector: 'app-employ-detail',
  templateUrl: './employ-detail.component.html',
  styleUrls: ['./employ-detail.component.css']
})
export class EmployDetailComponent implements OnInit {

  public numberEmployess: number;
  public currentEmployee: IEmployee;
  public paramId: number;
  public previousDisable = false;
  public nextDisable = false;

  constructor(private route: ActivatedRoute, private employeeService: EmployeesService, private router: Router) { }

  ngOnInit() {
    // obtain URL parameters
    this.getRouteParameters();
  }

  // Display previous employee on the list
  public goPrevious(){
    if(this.paramId > 1){
      this.previousDisable = false;
      this.nextDisable = false;
      let newId = this.paramId - 1;
      // this.router.navigate(['employlist', newId]);

      // First element in array means go back one segment in the URL. Second element in array is the appended new parameter
      // Example: localhost/4200/employlist/3 -> (eliminate last element of the URL, the 3 and change it for a new one) -> localhost/4200/employlist/2
      // The second parameter of the method is an object which refers to the current route of the URL.
      this.router.navigate(['../', newId], {relativeTo: this.route});
      if(newId === 1){
        this.previousDisable = true;
      }
    }else{
      // this.router.navigate(['employlist', this.paramId]);
      this.router.navigate(['../', this.paramId], {relativeTo: this.route});
    }
  }

  public goNext(){
    let newId: number;
    if(this.paramId < this.numberEmployess){
      this.nextDisable = false;
      this.previousDisable = false;
      newId = this.paramId + 1;
      // this.router.navigate(['employlist', newId]);
      this.router.navigate(['../',newId], {relativeTo: this.route});
      if(newId === this.numberEmployess){
        this.nextDisable = true;
      }
    }else{
      // this.router.navigate(['employlist', this.paramId]);
      this.router.navigate(['../',this.paramId], {relativeTo: this.route});
    }    
  }

  // go to 'employList` passing an optional paramenter on the URL -> localhost/4200/employlist;<optional paramenter>
  public goToEmployList(){
    let selectedId = this.currentEmployee.id;
    // this.router.navigate(['employlist',{id: selectedId, test: 'optionalParameter'}]);


    // Relative navigation, adds flexibility to routing
    // First element array means go back one segment in the URL. Second element in array is the appended optional parameter
    // At last, second method parameter is an object that refers the route to the current URL.
    this.router.navigate(['../', {id:selectedId}], {relativeTo: this.route});
  }

 // Get parameters from URL-> localhost/4200/employlist/<param>
  private getRouteParameters(){
    this.route.params.subscribe(param => {
      this.paramId = parseInt(param.id);
      this.getEmployeeData()});
  }

  private getEmployeeData(){
    this.employeeService.getEmployees()
        .subscribe(employees => {
          this.numberEmployess = employees.length;
          this.disableButtons();
          employees.forEach(employee => {
            if(employee.id === this.paramId){
              this.currentEmployee = employee;
            }
          })
        });
  }
  
  private disableButtons(){
    if(this.paramId === 1){
      this.previousDisable = true;
    }
    if(this.paramId === this.numberEmployess){
      this.nextDisable = true;
    }
  }
}


