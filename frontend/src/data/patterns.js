export const patternsData = [
  // ===========================================================================
  // CREATIONAL PATTERNS (5)
  // ===========================================================================
  {
    name: "Singleton",
    type: "Creational",
    description: "Ensures a class has only one instance and provides a global point of access to it. Useful for logging, drivers, caching, and thread pools.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/singleton/structure-en.png",
    code: `class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
    this.data = [];
  }
}
const s1 = new Singleton();
const s2 = new Singleton();
console.log(s1 === s2); // true`
  },
  {
    name: "Factory Method",
    type: "Creational",
    description: "Defines an interface for creating an object but lets subclasses alter the type of objects that will be created.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/factory-method/structure.png",
    code: `class Logistics {
  createTransport() { /* abstract */ }
}
class RoadLogistics extends Logistics {
  createTransport() { return new Truck(); }
}
class SeaLogistics extends Logistics {
  createTransport() { return new Ship(); }
}`
  },
  {
    name: "Abstract Factory",
    type: "Creational",
    description: "Produces families of related or dependent objects without specifying their concrete classes.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/abstract-factory/structure.png",
    code: `// Abstract factory interface
function furnitureFactory(type) {
  if (type === 'Modern') return new ModernFactory();
  if (type === 'Victorian') return new VictorianFactory();
}

// Concrete Factory
class ModernFactory {
  createChair() { return new ModernChair(); }
  createSofa() { return new ModernSofa(); }
}`
  },
  {
    name: "Builder",
    type: "Creational",
    description: "Constructs complex objects step by step. It allows you to produce different types and representations of an object using the same construction code.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/builder/structure.png",
    code: `class CarBuilder {
  constructor() { this.car = new Car(); }
  setSeats(number) { this.car.seats = number; return this; }
  setEngine(engine) { this.car.engine = engine; return this; }
  setGPS(hasGPS) { this.car.gps = hasGPS; return this; }
  build() { return this.car; }
}

const myCar = new CarBuilder()
              .setSeats(2)
              .setEngine('V8')
              .build();`
  },
  {
    name: "Prototype",
    type: "Creational",
    description: "Specifies the kind of objects to create using a prototypical instance, and creates new objects by copying this prototype.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/prototype/structure.png",
    code: `const carPrototype = {
  wheels: 4,
  clone() {
    return Object.create(this);
  }
};

const myCar = carPrototype.clone();
myCar.color = 'Red';
console.log(myCar.wheels); // 4`
  },

  // ===========================================================================
  // STRUCTURAL PATTERNS (7)
  // ===========================================================================
  {
    name: "Adapter",
    type: "Structural",
    description: "Allows objects with incompatible interfaces to collaborate.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/adapter/structure-object-adapter.png",
    code: `class OldCalculator {
  operations(t1, t2, operation) { /* legacy code */ }
}

class NewAdapter {
  constructor() { this.calc = new OldCalculator(); }
  add(t1, t2) {
    return this.calc.operations(t1, t2, 'add');
  }
}`
  },
  {
    name: "Bridge",
    type: "Structural",
    description: "Splits a large class or a set of closely related classes into two separate hierarchies (abstraction and implementation) which can be developed independently.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/bridge/structure-en.png",
    code: `// Abstraction
class Remote {
  constructor(device) { this.device = device; }
  togglePower() {
    if (this.device.isEnabled()) this.device.disable();
    else this.device.enable();
  }
}

// Implementations: TV, Radio (passed to Remote)`
  },
  {
    name: "Composite",
    type: "Structural",
    description: "Composes objects into tree structures and then allows you to work with these structures as if they were individual objects.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/composite/structure-en.png",
    code: `class Folder {
  constructor(name) { this.files = []; this.name = name; }
  add(file) { this.files.push(file); }
  getSize() {
    return this.files.reduce((sum, file) => sum + file.getSize(), 0);
  }
}`
  },
  {
    name: "Decorator",
    type: "Structural",
    description: "Attaches new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/decorator/structure.png",
    code: `function simpleCoffee() { return 10; }

function milkDecorator(coffeeFn) {
  return () => coffeeFn() + 5;
}

const myCoffee = milkDecorator(simpleCoffee);
console.log(myCoffee()); // 15`
  },
  {
    name: "Facade",
    type: "Structural",
    description: "Provides a simplified interface to a library, a framework, or any other complex set of classes.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/facade/structure.png",
    code: `class ComputerFacade {
  start() {
    this.cpu.freeze();
    this.memory.load(BOOT_ADDRESS, this.hardDrive.read(BOOT_SECTOR, SECTOR_SIZE));
    this.cpu.jump(BOOT_ADDRESS);
    this.cpu.execute();
  }
}`
  },
  {
    name: "Flyweight",
    type: "Structural",
    description: "Lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/flyweight/structure.png",
    code: `class TreeType {
  constructor(name, color, texture) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }
}
// Thousands of trees share the same "TreeType" object`
  },
  {
    name: "Proxy",
    type: "Structural",
    description: "Lets you provide a substitute or placeholder for another object. A proxy controls access to the original object.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/proxy/structure.png",
    code: `class SecureDatabaseProxy {
  constructor(db) { this.db = db; }
  
  query(sql) {
    if (this.authenticate()) {
      return this.db.query(sql);
    }
    throw new Error("Access Denied");
  }
}`
  },

  // ===========================================================================
  // BEHAVIORAL PATTERNS (11)
  // ===========================================================================
  {
    name: "Chain of Responsibility",
    type: "Behavioral",
    description: "Lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/structure.png",
    code: `class Handler {
  setNext(handler) { this.next = handler; return handler; }
  handle(request) {
    if (this.next) return this.next.handle(request);
    return null;
  }
}`
  },
  {
    name: "Command",
    type: "Behavioral",
    description: "Turns a request into a stand-alone object that contains all information about the request. This transformation lets you parameterize methods with different requests.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/command/structure.png",
    code: `class LightOnCommand {
  constructor(light) { this.light = light; }
  execute() { this.light.turnOn(); }
}

class Remote {
  submit(command) { command.execute(); }
}`
  },
  {
    name: "Iterator",
    type: "Behavioral",
    description: "Lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/iterator/structure.png",
    code: `class ArrayIterator {
  constructor(collection) {
    this.index = 0;
    this.collection = collection;
  }
  next() {
    return this.collection[this.index++];
  }
  hasNext() {
    return this.index < this.collection.length;
  }
}`
  },
  {
    name: "Mediator",
    type: "Behavioral",
    description: "Lets you reduce chaotic dependencies between objects. The mediator restricts direct communications between the objects and forces them to collaborate only via a mediator object.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/mediator/structure.png",
    code: `class ChatRoom {
  showMessage(user, message) {
    const time = new Date().toLocaleString();
    console.log(time + ' [' + user.getName() + ']: ' + message);
  }
}`
  },
  {
    name: "Memento",
    type: "Behavioral",
    description: "Lets you save and restore the previous state of an object without revealing the details of its implementation.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/memento/structure.png",
    code: `class EditorMemento {
  constructor(content) { this.content = content; }
  getContent() { return this.content; }
}

class Editor {
  save() { return new EditorMemento(this.content); }
  restore(memento) { this.content = memento.getContent(); }
}`
  },
  {
    name: "Observer",
    type: "Behavioral",
    description: "Lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/observer/structure.png",
    code: `class Subject {
  constructor() { this.observers = []; }
  subscribe(fn) { this.observers.push(fn); }
  notify(msg) { this.observers.forEach(fn => fn(msg)); }
}`
  },
  {
    name: "State",
    type: "Behavioral",
    description: "Lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/state/structure-en.png",
    code: `class AudioPlayer {
  constructor() { this.state = new ReadyState(this); }
  clickPlay() { this.state.clickPlay(); }
  changeState(state) { this.state = state; }
}

class ReadyState {
  constructor(player) { this.player = player; }
  clickPlay() {
    this.player.startPlayback();
    this.player.changeState(new PlayingState(this.player));
  }
}`
  },
  {
    name: "Strategy",
    type: "Behavioral",
    description: "Lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/strategy/structure.png",
    code: `class Context {
  constructor(strategy) { this.strategy = strategy; }
  execute(a, b) { return this.strategy.doMath(a, b); }
}

const addStrategy = { doMath: (a, b) => a + b };
const subStrategy = { doMath: (a, b) => a - b };`
  },
  {
    name: "Template Method",
    type: "Behavioral",
    description: "Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/template-method/structure.png",
    code: `class DataMiner {
  mine() {
    this.openFile();
    this.extractData(); // Abstract
    this.parseData();   // Abstract
    this.closeFile();
  }
}`
  },
  {
    name: "Visitor",
    type: "Behavioral",
    description: "Lets you separate algorithms from the objects on which they operate.",
    umlUrl: "https://refactoring.guru/images/patterns/diagrams/visitor/structure-en.png",
    code: `class Visitor {
  visitDot(dot) { console.log("Exporting dot info"); }
  visitCircle(circle) { console.log("Exporting circle info"); }
}

class Dot {
  accept(visitor) { visitor.visitDot(this); }
}`
  },
  {
    name: "Interpreter",
    type: "Behavioral",
    description: "Given a language, defines a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.",
    umlUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Interpreter_UML_class_diagram.svg",
    code: `class TerminalExpression {
  constructor(data) { this.data = data; }
  interpret(context) { return context.includes(this.data); }
}

class OrExpression {
  constructor(expr1, expr2) { this.expr1 = expr1; this.expr2 = expr2; }
  interpret(context) {
    return this.expr1.interpret(context) || this.expr2.interpret(context);
  }
}`
  }
];