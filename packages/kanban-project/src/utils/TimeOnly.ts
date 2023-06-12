export class TimeOnly{
  private _allSeconds: number = 0;

  public get hours(): number{
    return Math.floor(this._allSeconds / (60 * 60));
  }

  public get minutes(): number{
    return Math.floor((this._allSeconds % (60 * 60)) / 60);
  }

  public get seconds(): number{
    return this._allSeconds % 60;
  }

  constructor(seconds: number){
    if (seconds < 0 || seconds > 60 * 60 * 24 - 1 || seconds % 1 !== 0){
      throw new Error(`Can't create TimeOnly from ${seconds} seconds. Expected Z from 0 to 151199`);
    }

    this._allSeconds = seconds;
  }

  public static parseFromString(timeString: string): TimeOnly{
    const [isSuccessful, result] = TimeOnly.tryParseFromString(timeString);

    if (isSuccessful){
      return result;
    }

    throw new Error(result);
  }

  public static tryParseFromString(timeString: string): [true, TimeOnly] | [false, string]{
    const tokens = timeString.split(":");
    if (tokens.length !== 3){
      return [false, `Can't parse ${timeString} to TimeOnly. Expected from 00:00:00 to 23:59:59`];
    }

    const numbers = tokens.map(t => parseInt(t));
    if (numbers.some(n => isNaN(n) || n < 0 || n % 1 !== 0)){
      return [false, `Can't convert ${numbers.join(" ")} to hh:mm:ss TimeOnly format`];
    }

    const [hours, minutes, seconds] = numbers;
    const islimits = [hours <= 23, minutes <= 59, seconds <= 59];
    if (islimits.some(l => !l)){
      return [false, `${hours} must be <=23, ${minutes} <= 59, ${seconds} <= 59. Every must be whole number >= 0`];
    }

    try{
      const timeOnly = new TimeOnly(hours * 60 * 60 + minutes * 60 + seconds);

      return [true, timeOnly];
    }
    catch(e){
      return [false, `unknown error ${e}`];
    }
  }

  public toString(): string{
    return `${this.getFormattedString(this.hours)}:${this.getFormattedString(this.minutes)}:${this.getFormattedString(this.seconds)}`;
  }

  public toSeconds(): number{
    return this._allSeconds;
  }

  private getFormattedString(n: number, wantedLength: number = 2): string{
    const numberLength = n > 0 ? Math.floor(Math.log10(n) + 1) : 1;
    if (numberLength < wantedLength){
      return "0".repeat(wantedLength - numberLength) + n;
    }

    return n.toString();
  }
}