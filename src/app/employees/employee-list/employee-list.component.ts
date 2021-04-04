import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[] = [];
  constructor(private service : EmployeeService,private firestore : AngularFirestore,private toaster : ToastrService) { }

  ngOnInit() {
    this.service.getEmployee().subscribe(actionArray => { //cant't i make another method to  call it here
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as {}
        } as Employee;
      })
    });
    this.fetchByName();
  }

  onEdit(emp:Employee){
    this.service.formData = Object.assign({},emp);
  }

  onDelete(id:string){
    if(confirm("Are you sure to delete this record ?")){
      this.firestore.doc('employees/'+id).delete();
      this.toaster.warning("The Id has been removed","Emp");
      
    }
  }

  fetchByName(){
    const name = "kiron";
    this.firestore.collection('employees',ref => ref.where('fullName', '==', name)).get().toPromise().then((collectiondata)=>{
      console.log(collectiondata);
      
    })
  }
}

