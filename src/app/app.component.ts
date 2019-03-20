import {Component, OnInit} from '@angular/core';
import {_} from 'underscore';
import {EuromillionsService} from './service/euromillions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Init Grille
  starNumber = 12;
  gridNumber = 50;

  grids = [];
  stars = [];

  selectedGrids = [];
  selectedStars = [];

  euroMillions: any = [];

  total = 0;

  /**
   * @param euroMillionsService
   */
  constructor(private euroMillionsService: EuromillionsService) {
  }

  ngOnInit() {
    this.euroMillionsService.getEuroMillions()
      .subscribe(data => {
        this.euroMillions = data;
      });
    this.generateGrille(this.gridNumber, this.starNumber);
  }

  /**
   *
   * @param gridNumber
   * @param starNumber
   */
  generateGrille(gridNumber, starNumber) {
    const grids = [];
    const stars = [];
    _.each(new Array(gridNumber), function (v, i) {
      grids[i] = i + 1;
    });
    this.grids = grids;

    _.each(new Array(starNumber), function (v, i) {
      stars[i] = i + 1;
    });
    this.stars = stars;
  }

  /**
   *
   * @param Item
   */
  gridClick(Item) {
    const index: number = this.selectedGrids.indexOf(Item);
    if (index !== -1) {
      this.selectedGrids.splice(index, 1);
    } else {
      this.selectedGrids.push(Item);
    }
    this.calculTotal();
  }

  /**
   *
   * @param Item
   */
  starClick(Item) {
    this.selectedStars = Item;
    this.calculTotal();
  }

  /**
   *
   * @param Item
   */
  activateGrisClass(Item) {
    return (this.selectedGrids.indexOf(Item) !== -1);
  }

  calculTotal() {
    const selectedGridsNumber = this.selectedGrids.length;
    const selectedStarsNumber = this.selectedStars;
    let total = 0;
    if (this.euroMillions.multiples) {
      _.map(this.euroMillions.multiples, function (Item, key) {
        if (_.isEqual(Item.pattern, [selectedGridsNumber, selectedStarsNumber])) {
          total = Item.cost.value;
        }
      });
    }
    this.total = total;
  }
}
