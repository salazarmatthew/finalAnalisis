class ObserverList {
  constructor() {
    this.observers = [];
  }

  add(func) {
    this.observers.push(func);
  }

  remove(func) {
    this.observers = this.observers.filter((f) => {
      return f !== func;
    });
  }

  notify(value) {
    this.observers.forEach((observer) => {
      observer(value);
    });
  }
}

class LoginObservable {
  constructor() {
    this.observerList = new ObserverList();
  }

  subscribe(func) {
    this.observerList.add(func);
    console.log(this.observerList.observers);
  }

  unsubscribe(func) {
    this.observerList.remove(func);
  }

  notify(value) {
    this.observerList.notify(value);
  }
}

export default new LoginObservable();