import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // <<< This makes Angular know about this service
})
export class ClientsService {
  constructor(private http: HttpClient) {}

list(params?: any): Promise<any[]> {
  return this.http.get<any[]>('http://localhost:3000/api/clients', { params }).toPromise()
    .then(res => res || []); // always return an array
}


  create(clientData: any) {
    return this.http.post('http://localhost:3000/api/clients', clientData).toPromise();
  }

  archive(clientId: number) {
    return this.http.delete(`http://localhost:3000/api/clients/${clientId}`).toPromise();
  }
}
