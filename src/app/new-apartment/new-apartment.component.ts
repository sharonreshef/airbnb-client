import { Component, OnInit } from '@angular/core';

import { StoreService } from '../store.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-apartment',
  templateUrl: './new-apartment.component.html',
  styleUrls: ['./new-apartment.component.css']
})
export class NewApartmentComponent implements OnInit {
  constructor(
    private store: StoreService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  apartmentForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', [Validators.required]],
    rooms: ['', Validators.required],
    type: [''],

    amenities: this.fb.array([this.fb.control('')], Validators.required),
    pictureURL: ['', [Validators.required]]
  });

  get amenities() {
    return this.apartmentForm.get('amenities') as FormArray;
  }

  addAmenity() {
    this.amenities.push(this.fb.control(''));
  }

  removeAmenity(i: number) {
    this.amenities.removeAt(i);
  }

  ngOnInit() {
    this.store.getTypes();
  }

  submitApartment() {
    this.store.addApartment(this.apartmentForm.value).add(() => {
      // navigate to home page when movie has been added
      this.router.navigateByUrl('');
    });
  }
}
