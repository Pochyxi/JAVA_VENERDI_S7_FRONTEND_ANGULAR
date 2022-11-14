import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackEndService} from "../back-end.service";

@Component({
  selector: 'app-sonda-card',
  templateUrl: './sonda-card.component.html',
  styleUrls: ['./sonda-card.component.scss'],
})
export class SondaCardComponent implements OnInit {
  @Input() sonda!: any;

  @Input() idUltimaAllerta: number | undefined;

  @Output() shotId = new EventEmitter<number>();

  numeroMisurazioniSonda: number | undefined
  numeroMisurazioniSondaAlte: number | undefined

  misurazioneInterval!: any;

  constructor(private backend$: BackEndService) {}

  ngOnInit(): void {
    this.giveNumberOfTotalMisurazioni()

    this.giveNumberOfTotalMisurazioniAlte()

    if (this.sonda) {
      this.giveSondaId()
      this.giveNumberOfTotalMisurazioni()
      this.giveNumberOfTotalMisurazioniAlte()

      this.misurazioneInterval = setInterval(() => {
        this.giveSondaId()
        this.giveNumberOfTotalMisurazioni()
        this.giveNumberOfTotalMisurazioniAlte()
      }, 10000);
    }


  }

  giveSondaId(): void {
    this.shotId.emit(this.sonda.id);
  }

  giveNumberOfTotalMisurazioni() {
    this.backend$.getMisurazioniBySondaId(this.sonda.id).then(r => {
      this.numeroMisurazioniSonda = r.data.length;
    })
  }

  giveNumberOfTotalMisurazioniAlte() {
    this.backend$.getMisurazioniBySondaId(this.sonda.id).then(r => {
      this.numeroMisurazioniSondaAlte = r.data.filter((r: { smokeLevel: number; }) => r.smokeLevel > 7).length;
    })
  }

  detSondaBorder():string {
    if ( this.sonda.id === this.idUltimaAllerta) {
      return 'card m-1 sondaBody allertBorder'
    } else {
      return 'card m-1 sondaBody baseBorder'
    }
  }

  deleteSonda():void {
    this.backend$.deleteSonda(this.sonda.id).then((r) => {
      console.log(r);
    });

  }

  ngOnDestroy():void {
    clearInterval(this.misurazioneInterval);
  }
}
