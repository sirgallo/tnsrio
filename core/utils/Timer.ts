export class Timer {
  private _timerMap: Map<string, { start: Date, stop: Date }> = new Map();
  constructor(private _label: string) {}

  get name() { return this._label; }

  start = (name: string) => {
    const now = new Date();
    const payload = { start: now, stop: null };
    this._timerMap.set(name, payload);
  }

  stop = (name: string) => {
    const now = new Date();
    const payload = this._timerMap.get(name);
    if (! payload) throw new Error('current timer not in timer map');

    const updatedPayload = { ...payload, stop: now };
    this._timerMap.set(name, updatedPayload);
  }

  getResults = (name: string): { start: Date, stop: Date, elapsed: number } => {
    const payload = this._timerMap.get(name);
    if (! payload || ! payload.stop) throw new Error('missing or unfinished timer');

    return { ...payload, elapsed: payload.stop.getTime() - payload.start.getTime() };
  }

  clear = () => { this._timerMap.clear(); }
}