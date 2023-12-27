export class UndoHistory<T> {
  private static instances = new Map<string, UndoHistory<unknown>>();
  private data: T;
  private history: T[];

  private constructor(data: T) {
    this.data = data;
    this.history = [];
  }

  private static keyFromData<T>(data: T): string {
    return JSON.stringify(data);
  }

  public static create<T>(data: T): UndoHistory<T> {
    const key = this.keyFromData<T>(data);
    if (!this.instances.has(key)) {
      this.instances = new Map();
      this.instances.set(key, new UndoHistory<T>(data));
    }
    return this.instances.get(key) as UndoHistory<T>;
  }

  public getData(): T {
    return this.data;
  }

  public setData(newData: T): T {
    this.history.push(this.data);
    this.data = newData;
    return newData;
  }

  public undo(): T | undefined {
    const lastState = this.history.pop();
    if (lastState) {
      this.data = lastState;
    }
    return lastState;
  }
}
