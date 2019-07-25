import { Injectable } from '@angular/core';
import { Apartment } from 'models/apartment.model';
import { BehaviorSubject } from 'rxjs';
import { ApartmentService } from './apartment.service';
import { TypeService } from './type.service';
import { Type } from 'models/type.model';

export interface IState {
  apartments: Apartment[];
  types: Type[];
  selectedApartment: Apartment;
  selectedType: string;
}

const initialState: IState = {
  apartments: [],
  selectedApartment: null,
  types: [],
  selectedType: null
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly _store = new BehaviorSubject<IState>(initialState);
  constructor(
    private apartmentService: ApartmentService,
    private typeService: TypeService
  ) {}

  get currentState(): IState {
    return this._store.getValue();
  }

  setState(newState: Partial<IState>) {
    this._store.next({
      ...this.currentState,
      ...newState
    });
  }

  getApartments() {
    this.apartmentService.getApartmentsFromServer().subscribe(apartments => {
      this.setState({
        apartments
      });
    });
  }

  get filterdApartments(): Apartment[] {
    if (!this.selectedType) {
      return this.apartments;
    }
    return this.currentState.apartments.filter(
      apartment => apartment.type === this.selectedType
    );
  }

  setSelectedType(typeName: string) {
    this.setState({
      selectedType: typeName
    });
  }

  deleteApartment(id: string) {
    this.apartmentService.deleteApartmentFromServer(id).subscribe(
      apartment => console.log(apartment),
      error => console.log('Error: ', error),
      () => {
        this.getApartments();
      }
    );
  }

  get apartments(): Apartment[] {
    return this.currentState.apartments;
  }

  get selectedApartment(): Apartment {
    return this.currentState.selectedApartment;
  }

  get types(): Type[] {
    return this.currentState.types;
  }

  get selectedType(): IState['selectedType'] {
    return this.currentState.selectedType;
  }

  getTypes() {
    this.typeService.getTypesFromServer().subscribe(types => {
      this.setState({
        types
      });
    });
  }

  getApartmentById(id: string) {
    this.apartmentService
      .getApartmentDetailsFromServer(id)
      .subscribe(apartment => {
        this.setState({
          selectedApartment: apartment
        });
      });
  }

  addApartment(apartment: Apartment) {
    return this.apartmentService
      .addApartmentToServer(apartment)
      .subscribe(apartmentFromServer => {
        this.setState({
          apartments: this.apartments.concat(apartmentFromServer)
        });
      });
  }
}
