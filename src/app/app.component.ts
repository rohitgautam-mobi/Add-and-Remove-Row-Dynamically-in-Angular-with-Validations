import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 
export class AppComponent implements OnInit {
 submitted = false;
  requestCreateForm: FormGroup;
  TotalRow : number;
  constructor(private formBuilder: FormBuilder,private router: Router,) { }
  get f(){
    return this.requestCreateForm.controls;
  }
  get t() { return this.f.itemRows as FormArray; }
  get itemRowsControls() { return (<FormArray>this.requestCreateForm.get('itemRows')).controls; }
  ngOnInit(): void {
      this.requestCreateForm = this.formBuilder.group({
      itemRows: this.formBuilder.array([this.initItemRows()]),      
      });     
  }
   initItemRows() {
    return this.formBuilder.group({
    currency: ['', Validators.compose([Validators.required])],
    amount: ['', Validators.compose([Validators.required,  Validators.pattern("^[0-9]*$"),Validators.maxLength(10)])],
    currencyType: ['', Validators.compose([Validators.required])],
    });
  }
  addNewRow() {     
    const control = <FormArray>this.requestCreateForm.controls['itemRows'];
    if(control.length <= 4){        
    control.push(this.initItemRows());    
    }
    else{
      alert('Sorry !! You can only add 5 Rows');
    }
    
  }
  deleteRow(index: number) {
    const control = <FormArray>this.requestCreateForm.controls['itemRows'];
    if(control != null){
      this.TotalRow = control.value.length ;
    }
    if(this.TotalRow > 1){
      control.removeAt(index);
    }    
    else{
      alert('Last Row can not be deleted');
    }
  
  }  
  emptyArray(){
    // Removing all valus from array expect [0] index ; 
    const control = <FormArray>this.requestCreateForm.controls['itemRows'];
    this.TotalRow = control.value.length  - 1;
    for (let i = this.TotalRow - 1; i >= 0; i--){
      control.removeAt(i);
    }   
  }
    submit(){
        this.submitted = true;
        console.log('This is formdata-->', this.requestCreateForm.value);
        if (this.requestCreateForm.invalid) {
          alert('Form is not Valid Now');
        return;
        }
        else{
          alert('A Valid Form');
          this.submitted = false; 
          this.requestCreateForm.reset();
          this.t.reset(); 
        }
         
        }
      }
