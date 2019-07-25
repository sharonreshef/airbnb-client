import { Injectable } from '@angular/core';
import { Apartment } from '../../models/apartment.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  constructor(private httpClient: HttpClient) {}

  getApartmentsFromServer(): Observable<Apartment[]> {
    return this.httpClient.get<Apartment[]>(
      `http://localhost:3000/apartments/`
    );
  }
  getApartmentDetailsFromServer(id: string): Observable<Apartment> {
    return this.httpClient.get<Apartment>(
      `http://localhost:3000/apartments/${id}`
    );
  }

  addApartmentToServer(apartment: Apartment): Observable<Apartment> {
    return this.httpClient.post<Apartment>(
      `http://localhost:3000/apartments/`,
      apartment
    );
  }
  deleteApartmentFromServer(id: string): Observable<Apartment> {
    console.log('delete from server');
    return this.httpClient.delete<Apartment>(
      `http://localhost:3000/apartments/${id}`
    );
  }
}
