import {Column} from './column';
import {RenderStation} from './renderStation';

export class Station {
  #queue = [];
  #filling = [];
  #ready = [];
  
  constructor(typeStation, renderApp = null) {
    this.typeStation = typeStation;
    this.renderApp = renderApp;
    this.renderStation = null;
  }
  
  get filling() {
    return this.#filling;
  }
  
  get queue() {
    return this.#queue;
  }
  
  init() {
    this.createColumns();
    this.renderStation = new RenderStation(this.renderApp, this);
    
    setInterval(() => {
      this.checkQueueToFilling();
    }, 1000);
  }
  
  createColumns() {
    for (const optionStation of this.typeStation) {
      if (optionStation.count) {
        for (let i = 0; i < optionStation.count; i++) {
          this.#filling.push(new Column(optionStation.type, optionStation.speed));
        }
      } else {
        this.#filling.push(new Column(optionStation.type));
      }
    }
  }
  
  checkQueueToFilling() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#filling.length; j++) {
          if (!this.#filling [j].car && this.#queue [i].typeFuel === this.#filling [j].type) {
            this.#filling [j].car = this.#queue.splice(i, 1)[0];
            this.fillingGo(this.#filling [j]);
            this.renderStation.renderStation();
            break;
          }
        }
      }
    }
  }
  
  fillingGo(column) {
    // console.log(`Заправка ${JSON.stringify(column.car)}`);
    const car = column.car;
    const needPetrol = car.needPetrol;
    let nowTank = car.nowTank;
    const timerId = setInterval(() => {
      nowTank += column.speed;
      if (nowTank >= car.maxTank) {
        clearInterval(timerId);
        const total = car.nowTank - needPetrol;
        car.fiilUp();
        column.car = null;
        this.leafeClient({car, total});
      }
    }, 1000);
  }
  
  leafeClient({car, total}) {
    this.#ready.push(car);
    this.renderStation.renderStation();
  }
  
  addCarQueue(car) {
    this.#queue.push(car);
    this.renderStation.renderStation();
  }
}
