import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData? : Employee;
  constructor(public firestore : AngularFirestore) { }

  getEmployee(){
    return this.firestore.collection('employees').snapshotChanges();
  }
}
