import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MarketData } from '../models/iMarket';

import { MarketsService } from './markets.service';

describe('MarketsService', () => {
  let service: MarketsService;
  let httpClient: HttpClient;
  let httpTestController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MarketsService);
    httpTestController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('API Testing', () => {

    const testMarket:MarketData[] = [
      {market:'USD-GBP', buyingPrice:'1.67', sellingPrice:'1.87'},
      {market:'USD-INR', buyingPrice:'0.067', sellingPrice:'0.087'}
    ]

    it('Http get method test (created because of API limits check)', () => {
      service.getAllMarkets().subscribe((res) => {
        expect(testMarket).toBe(res, 'should check mock data');
      });
    });
  })
 
});
