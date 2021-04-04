import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(public service : EmployeeService , public firestore: AngularFirestore,
    public toaster : ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form? : NgForm){
    if(form!=null)
      form.resetForm();
    this.service.formData={
      id:'',
      fullName:'',
      position:'',
      empcode:'',
      mobile:'',
    }
  }
  onSubmit(form:NgForm){
    let data = Object.assign({},form.value); //instant refelect on the canvas
    delete data.id;
    if(!form.value.id)

      this.firestore.collection('employees').add(data);
    
    else
        this.firestore.doc('employees/'+form.value.id).update(data)
      this.resetForm(form);
      this.toaster.success("Submitted Sucessfully" ,"EMP. Register")
  }
}
