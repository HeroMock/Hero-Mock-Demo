import { TradeItem } from './models/trade-item';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './controls/details/details.component';
import { OperationType } from './enums/operation-type';
import { BlotterComponent } from './controls/blotter/blotter.component';
import { TradeService } from './services/trade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('blotter', { static: false })
  public blotter: BlotterComponent;

  public constructor(
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private tradeService: TradeService
  ) {
    this.config.centered = true;
    this.config.backdrop = 'static';
  }

  public ngOnInit(): void {}

  public add(): void {
    const modelRef = this.modalService.open(DetailsComponent, { size: 'xl' });
    modelRef.componentInstance.opertionType = OperationType.Add;
    modelRef.componentInstance.item = new TradeItem();
    modelRef.componentInstance.blotter = this.blotter;
  }

  public delete(): void {
    const selectedItem = this.blotter.getSelectedItem();
    if (selectedItem) {
      this.tradeService
        .deleteTrade(selectedItem)
        .subscribe((it) => this.blotter.refreshData());
    }
  }

  public update(): void {
    const selectedItem = this.blotter.getSelectedItem();
    if (selectedItem) {
      const modelRef = this.modalService.open(DetailsComponent, { size: 'xl' });
      modelRef.componentInstance.opertionType = OperationType.Update;
      modelRef.componentInstance.item = selectedItem;
      modelRef.componentInstance.blotter = this.blotter;
    }
  }
}
