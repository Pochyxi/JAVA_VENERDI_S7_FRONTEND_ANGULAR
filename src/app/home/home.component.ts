import {Component, OnInit} from '@angular/core';
import {BackEndService} from '../back-end.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  arrOfSonde!: any;
  int!: any;

  misurazioni!:any;
  misurazioniAlte!: any;

  idUltimaAllerta: number | undefined;

  constructor(private backend$: BackEndService) {
  }

  ngOnInit(): void {
    this.backend$.getSonde().subscribe((sonde) => {
      if (sonde.length > 0) {
        this.arrOfSonde = sonde;
      }
      console.log(this.arrOfSonde);

      if(!this.arrOfSonde === undefined) {
        this.getMisurazioni()
      }
    });




    //Nel caso si voglia aggiornare continuamente le sonde
    // this.int = setInterval(() => {
    //   this.backend$.getSonde().subscribe((sonde) => {
    //     this.arrOfSonde = sonde;
    //     console.log(this.arrOfSonde);
    //   });
    // }, 5000);
  }

  randomSmoke() {
    let probabilita = Math.floor(Math.random() * 1000 + 1);

    console.log("probabilià: " + probabilita);

    return probabilita < 990 ?
      Math.floor(Math.random() * 5 + 1) :
      Math.floor(Math.random() * 5 + 5);

  }

  detSmokeColor(number: number) {
    if (number <= 4) return "badge bg-success smokeLevel1 rounded-pill"
    if (number <= 7 && number > 4) return "badge bg-primary smokeLevel2 rounded-pill"
    if (number <= 10 && number > 7) return "badge bg-danger smokeLevel3 rounded-pill"
    return "n"
  }

  postMisurazione(sondaId: number, smokeLevel: number) {
    this.backend$.postMisurazione(sondaId, smokeLevel).subscribe((r) => {
      this.getMisurazioni()
    });
  }

  getMisurazioni() {
    this.backend$.getMisurazioni().then((r) => {

      // crazione della lista delle ultime misurazioni
      this.misurazioni = r.data.sort((a: { id: number; }, b: { id: number; }) => a.id < b.id ? -1 : 1).reverse().slice(0, 50);
      // ---------------------------------------------------- //

      // creazione della lista delle misurazioni con alto livello di fumo
      this.misurazioniAlte = r.data.sort((a: { id: number; }, b: { id: number; }) => a.id < b.id ? -1 : 1).filter( (el: { smokeLevel: number; }) => el.smokeLevel > 7).reverse().slice(0, 50);

      // ---------------------------------------------------- //
      if(this.misurazioniAlte.length > 0) {
        this.idUltimaAllerta = r.data.sort((a: { id: number; }, b: { id: number; }) => a.id < b.id ? -1 : 1).filter( (el: { smokeLevel: number; }) => el.smokeLevel > 7).reverse().slice(0, 50)[0].sonda.id
        console.log(this.idUltimaAllerta)
      }

    });
  }

  ngOnDestroy(): void {
    clearInterval(this.int);
  }
}
