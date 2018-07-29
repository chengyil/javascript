function Animal(){
  this.type='animal';
  Animal.prototype.getType = function() {
    return this.type;
  }
}

let animal = new Animal();
assert(Animal()===undefined, 'Invoking the function result in undefined');
assert(animal instanceof Animal, 'Indeed an animal');
assert(animal.getType && animal.getType()=='animal', 'Property found and able to invoke');

function Dog(){
  this.type='dog';
}

let dogWithoutAnimal = new Dog;
assert(dogWithoutAnimal instanceof Dog, 'A doggie');
assert(!(dogWithoutAnimal instanceof Animal), 'Not an animal yet');

let protoAnimal = new Animal();
Dog.prototype = protoAnimal;

let dog = new Dog;
assert(dog instanceof Dog, 'A doggie');
assert(dog instanceof Animal, 'Doggie is an animal');
assert(dog.constructor == Animal, 'Constructor is wrong though');

Dog.prototype.constructor = Dog;

assert(dog.constructor == Dog, 'Constructor is now right');

for(let key in dog){
  console.log('enumerable keys includes ' + key);
  if(key == 'constructor'){
    console.log('Including constructor too, it would be better to just hide this');
  }
}

Object.defineProperty(Dog.prototype, 'constructor', {
  enumerable: false,
  value: Dog,
  writable: true
});

for(let key in dog){
  console.log('enumerable keys includes ' + key);
  if(key == 'constructor'){
    failed('Now constructor is not enumerable');
  }
}

assert(dog.constructor == Dog, 'But still accessible');

Dog.prototype = new Animal;

assert(!(dog instanceof Dog), 'Oh no! Not an dog anymore? Cos instanceof checks prototype chain. to see if the object prototype is the constructor prototype');

assert(protoAnimal != new Animal, 'Yup, just a different instance');
Dog.prototype = protoAnimal;
assert(dog instanceof Dog, 'Back to dog again.');

class ES6Animal {
  constructor(){
    this.type = 'animal';
  }
  getType(){
    return this.type;
  }
}

class ES6Dog extends ES6Animal {
  constructor(){
    super();
    this.type = 'dog';
  }
}

let es6Animal = new ES6Animal();
console.log(es6Animal.getType());
console.log(es6Animal.constructor);
console.log(typeof es6Animal.constructor);
console.log(es6Animal.constructor.prototype);

let es6Dog = new ES6Dog();
console.log(es6Dog.getType());
console.log(es6Dog.constructor);
console.log(typeof es6Dog.constructor);
console.log(es6Dog.constructor.prototype + ' prototype : ' + Object.getPrototypeOf(es6Dog.constructor.prototype).constructor);
console.log(Dog.prototype + ' prototype : ' + Object.getPrototypeOf(Dog.prototype).constructor);

function failed(msg){
  throw msg;
}

function assert(condition, msg){
  if(condition){
    console.log(msg || 'Passed');
  }else{
    throw 'Condition not met';
  }
}
