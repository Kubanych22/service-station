
export class Car {
  #maxTank;
  constructor(brand, model, maxTank) {
    const proto = Object.getPrototypeOf(this);
    if (proto.constructor === Car) {
      throw new Error('Это абстрактный класс.')
    }
    
    this.brand = brand;
    this.model = model;
    this.#maxTank = maxTank;
    this.nowTank = Math.floor(Math.random() * maxTank);
  }
  
  getTitle() {
    return `${this.brand} ${this.model}`;
  }
  
  setModel(model) {
    this.model = model;
    return this;
  }
  
  get needPetrol() {
    return this.#maxTank - this.nowTank;
  }
  
  fiilUp() {
    this.nowTank = this.#maxTank;
    return this;
  }
  
  get maxTank() {
    return this.#maxTank;
  }
  
  static string = 'Новый автомобиль ';
  
  static logger(str) {
    console.log(str);
  }
  
  static from({brand, model, maxTank}) {
    const car = new Car(brand, model, maxTank);
    Car.logger(Car.string + car.getTitle());
    return car;
  }
}

export class PassengerCar extends Car {
  typeCar = 'passenger';
  constructor(brand, model, maxTank, typeFuel = 'petrol') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
  getTitle() {
    return `Автомобиль ${this.brand} ${this.model}`;
  }
}

export class Truck extends Car {
  typeCar = 'truck';
  constructor(brand, model, maxTank, typeFuel = 'diesel') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
  getTitle() {
    return `Грузовик ${this.brand} ${this.model}`;
  }
}

console.clear();
console.log(new PassengerCar('Volvo', 'XC60', 60));


