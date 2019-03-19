import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EuromillionsService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'https://www.fdj.fr/apigw/rtg/rest/euromillions';

  getEuroMillions() {
    return this.http.get(this.baseUrl);
  }
}
