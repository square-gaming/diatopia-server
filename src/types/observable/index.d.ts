export interface Observer {
  handle(...args: any[]): void;
}

export interface Observable {
  observers: Observer[];

  notify(...args: any[]): void;

  add(observer: Observer): void;

  remove(observer: Observer): void;
}
