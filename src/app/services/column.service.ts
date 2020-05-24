import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  public constructor() {}

  public getColumns(): ColDef[] {
    return [
      {
        colId: 'id',
        headerName: 'LQT Ticket ID',
        field: 'id',
      },
      {
        colId: 'accountName',
        headerName: 'Account Name',
        field: 'accountName',
      },
      {
        colId: 'sales',
        headerName: 'Sales',
        field: 'sales',
      },
      {
        colId: 'description',
        headerName: 'Description',
        field: 'description',
      },
      {
        colId: 'tradeDate',
        headerName: 'Trade Date',
        field: 'tradeDate',
      },
      {
        colId: 'citiBuySell',
        headerName: 'Citi B/S',
        field: 'citiBuySell',
      },
      {
        colId: 'size',
        headerName: 'Size(MM)',
        field: 'size',
        valueFormatter: (params) => {
          const size = params.data.size;
          if (size) {
            return (size / 1000000).toString();
          } else {
            return null;
          }
        },
        cellRenderer: 'agAnimateShowChangeCellRenderer',
      },
      {
        colId: 'price',
        headerName: 'Price',
        field: 'price',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
      },
      {
        colId: 'currency',
        headerName: 'Currency',
        field: 'currency',
      },
      {
        colId: 'trader',
        headerName: 'Trader',
        field: 'trader',
      },
      {
        colId: 'evType',
        headerName: 'EV Type',
        field: 'evType',
      },
      {
        colId: 'evAmount',
        headerName: 'EV Amount',
        field: 'evAmount',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
      },
      {
        colId: 'interestType',
        headerName: 'Interest Type',
        field: 'interestType',
      },
      {
        colId: 'contact',
        headerName: 'Contact',
        field: 'contact',
      },
      {
        colId: 'settleDate',
        headerName: 'Settle Date',
        field: 'settleDate',
      },
      {
        colId: 'account',
        headerName: 'Account',
        field: 'account',
      },
      {
        colId: 'firmAccount',
        headerName: 'Firm Account',
        field: 'firmAccount',
      },
      {
        colId: 'client',
        headerName: 'Client',
        field: 'client',
      },
      {
        colId: 'cusip',
        headerName: 'Cusip',
        field: 'cusip',
      },
      {
        colId: 'maturity',
        headerName: 'Maturity',
        field: 'maturity',
      },
    ];
  }
}
