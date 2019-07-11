import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../core/services/firebase.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  taskForm: FormGroup;
  tasks = [];

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService
  ) {
    this.taskForm = this.formBuilder.group({
      description: [null, Validators.required],
      completed: false
    });
  }

  createTask() {
    if (this.taskForm.invalid) { return; }
    this.firebase.createTask(this.taskForm.value)
      .subscribe(
        res => {
          const id = res.name;
        },
        err => console.log(err)
      );
  }

  ngOnInit() {
    this.firebase.getTasks()
      .subscribe(
        res => {
          this.tasks = res;
        },
        err => {
          console.log(err);
        }
      );
  }

}
