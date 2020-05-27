
export class KibaException extends Error {
  public statusCode: number;

  public constructor(message: string, statusCode?: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
  }
}
