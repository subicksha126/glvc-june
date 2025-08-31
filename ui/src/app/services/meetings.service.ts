import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  constructor(private http: HttpClient) {}

  list(params?: any): Promise<any[]> {
  return this.http.get<any[]>('http://localhost:3000/api/meetings', { params }).toPromise()
    .then(res => res || []); // always return an array
}


  create(meetingData: any) {
    return this.http.post('http://localhost:3000/api/meetings', meetingData).toPromise();
  }
}
