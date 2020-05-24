import { TradeItem } from '../../models/trade-item';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationType } from 'src/app/enums/operation-type';
import { TradeService } from 'src/app/services/trade.service';
import { BlotterComponent } from '../blotter/blotter.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public opertionType: OperationType;
  public item: TradeItem;
  public blotter: BlotterComponent;

  public get title(): string {
    const action = this.opertionType === OperationType.Add ? 'New' : 'Update';
    return `Client Holding - ${action}`;
  }

  public get confirm(): string {
    return this.opertionType === OperationType.Add ? 'Save' : 'Update';
  }

  public constructor(
    public activeModal: NgbActiveModal,
    private tradeService: TradeService
  ) {}

  public ngOnInit(): void {}

  public cancel(): void {
    this.activeModal.close();
  }

  public ok(): void {
    if (this.opertionType === OperationType.Add) {
      this.tradeService
        .addTrade(this.item)
        .subscribe((it) => this.refreshData());
    } else {
      this.tradeService
        .updateTrade(this.item)
        .subscribe((it) => this.refreshData());
    }

    this.activeModal.close();
  }

  private refreshData(): void {
    if (this.blotter) {
      this.blotter.refreshData();
    }
  }
}
