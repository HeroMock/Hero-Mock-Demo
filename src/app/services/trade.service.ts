import { GridApi } from 'ag-grid-community';
import { TradeItem } from '../models/trade-item';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private apiUrl = 'http://localhost:3000/api/ticketing-service/trades';
  private webSocket: WebSocket;

  public onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;

  public constructor(private httpClient: HttpClient) {
    this.listener();
  }

  private listener(): void {
    this.webSocket = new WebSocket('ws://localhost:3000/ws1');
    this.webSocket.onopen = () => {
      this.webSocket.onmessage = this.onmessage;
    };
  }

  public getTrades(): Observable<TradeItem[]> {
    return this.httpClient.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  public addTrade(trade: TradeItem): Observable<TradeItem> {
    return this.httpClient.post(this.apiUrl, trade).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  public deleteTrade(trade: TradeItem): Observable<TradeItem> {
    const url = `${this.apiUrl}/${trade.id}`;
    return this.httpClient.delete(url).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  public updateTrade(trade: TradeItem): Observable<TradeItem> {
    return this.httpClient.patch(this.apiUrl, trade).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
}
