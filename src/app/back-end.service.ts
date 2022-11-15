import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import axios from "axios";
import {Subject} from "rxjs";

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

  postSonda(nomeSonda:string, username:string, password:string, latitudine:string, longitudine:string) {
    return axios.post<any>(`http://localhost:8080/api/sonde/new/${nomeSonda}/${username}/${password}/${latitudine}/${longitudine}`);
  }

  postMisurazione(sondaId: number, smokeLevel: number) {
    return this.http.post<any>(
      `http://localhost:8080/api/misurazioni/new/${sondaId}/${smokeLevel}`,
      {}
    );
  }

  postMisurazioneJson(obj: any) {
    return axios.post<any>(
      `http://localhost:8080/api/misurazioni/new-json`,
      {obj}
    );
  }

  deleteSonda(sondaId: number) {
    return axios.delete<any>(`http://localhost:8080/api/sonde/delete/${sondaId}`);
  }

}
