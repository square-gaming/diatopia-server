class Time {
  static TICK_PERIOD = 33;
  static DAY_PERIOD = 24000;

  public lastTime: number;
  public dayTime: number;

  constructor() {
    this.lastTime = 0;
    this.dayTime = 0;
    setInterval(this.update.bind(this), Time.TICK_PERIOD);
  }

  private update() {
    if (this.dayTime === Time.DAY_PERIOD - 1) {
      this.dayTime = 0;
    } else {
      this.dayTime += 1;
    }
    this.lastTime += 1;
  }
}

export default Time;
