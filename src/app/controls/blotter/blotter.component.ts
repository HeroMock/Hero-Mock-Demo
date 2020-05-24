import { TradeItem } from '../../models/trade-item';
import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  GridOptions,
  GridReadyEvent,
  GridApi,
  ColumnApi,
} from 'ag-grid-community';
import { ColumnService } from 'src/app/services/column.service';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-blotter',
  templateUrl: './blotter.component.html',
  styleUrls: ['./blotter.component.scss'],
})
export class BlotterComponent implements OnInit {
  public rowData: any[];
  public columnDefs: ColDef[];
  public gridOptions: GridOptions;

  public gridApi: GridApi;
  public columnApi: ColumnApi;

  public constructor(
    private columnService: ColumnService,
    private tradeService: TradeService
  ) {}

  public ngOnInit(): void {
    this.columnDefs = this.columnService.getColumns();
    this.gridOptions = this.getGridOptions();
    this.refreshData();
    this.tradeService.onmessage = this.onmessage.bind(this);
  }

  private getGridOptions(): GridOptions {
    return {
      pagination: true,
      paginationPageSize: 100,
      suppressLoadingOverlay: true,
      suppressNoRowsOverlay: true,
      suppressMenuHide: true,
      rowSelection: 'single',
      suppressCellSelection: true,
      enableRangeSelection: false,
      groupRemoveSingleChildren: true,
      defaultColDef: this.getDefaultColDef(),
      onGridReady: this.onGridReady.bind(this),
      animateRows: true,
      getRowNodeId: this.getRowNodeId.bind(this),
    };
  }

  private getDefaultColDef(): ColDef {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
    };
  }

  private onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.columnApi = event.columnApi;
  }

  private getRowNodeId(data: any): string {
    return data.id;
  }

  private onmessage(ev: MessageEvent): any {
    const data = JSON.parse(ev.data);
    const trades = data.trades;
    if (this.gridApi) {
      this.gridApi.applyTransactionAsync({ update: trades });
    }
  }

  public getSelectedItem(): TradeItem {
    const selectedRows = this.gridApi.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      return null;
    }
    return selectedRows[0];
  }

  public refreshData(): void {
    this.tradeService.getTrades().subscribe((data) => (this.rowData = data));
  }
}
