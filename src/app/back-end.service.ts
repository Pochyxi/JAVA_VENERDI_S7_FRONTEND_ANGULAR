import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root',
})
export class BackEndService {
  constructor(private http: HttpClient) {
  }

  getSonde() {
    return this.http.get<any>(`http://localhost:8080/api/sonde`);
  }

  getMisurazioni() {
    return axios.get<any>(`http://localhost:8080/api/misurazioni`);
  }

  getMisurazioniBySondaId(sondaId:number) {
    return axios.get<any>(`http://localhost:8080/api/misurazioni/sonda/${sondaId}`);
  }

  postMisurazione(sondaId: number, smokeLevel: number) {
    return this.http.post<any>(
      `http://localhost:8080/api/misurazioni/new/${sondaId}/${smokeLevel}`,
      {}
    );
  }

  // postMisurazione(sondaId: number, smokeLevel: number) {
  //   return this.http.post<any>(`http://localhost:8080/api/misurazioni/new`, {
  //     Headers: {
  //       'Content-Type': 'application/application.json',
  //     },
  //     body: JSON.stringify({
  //       sonda_id: sondaId,
  //       smoke_level: smokeLevel,
  //     }),
  //   });
  // }

  // postMisurazione(sondaId: number, smokeLevel: number) {
  //   return axios({
  //     method: 'post',
  //     url: 'http://localhost:8080/api/misurazioni/new',
  //     data: {
  //       sondaId: sondaId,
  //       smokeLevel: smokeLevel
  //     }
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     }, (error) => {
  //       console.log(error);
  //     });
  // }
}
