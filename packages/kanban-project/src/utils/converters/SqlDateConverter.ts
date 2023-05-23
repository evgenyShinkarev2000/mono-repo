export class SqlDateConverter
{
  public static toJs(dateString: string): Date
  {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + 1);

    return date;
  }

  public static toSql(date: Date): string{
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);

    return newDate.toISOString();
  }
}