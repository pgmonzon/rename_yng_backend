import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../_services';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.sass']
})
export class CryptoComponent implements OnInit {
  coins = [];

  constructor(private cryptoservice: CryptoService) {
    this.coins = cryptoservice.getMyItems();
  }

  ngOnInit() {
  }

}

