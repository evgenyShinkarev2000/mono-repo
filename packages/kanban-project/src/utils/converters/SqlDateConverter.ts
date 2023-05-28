export class SqlDateConverter
{
  public static toJs(dateString: string): Date
  {
    const date = new Date(dateString);

    return date;
  }

  public static toSql(date: Date): string{
    const newDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ')    

    return newDate;
  }
}