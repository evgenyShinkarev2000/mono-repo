export class SqlDateConverter
{
  public static toJs(dateString: string): Date
  {
    const date = new Date(dateString ?? undefined);
    if (isNaN(date.getDate())){
      throw new Error(`Can't parse ${dateString} to Date`);
    }

    return date;
  }

  public static toJsFromTimeOnly(dateString: string): Date{
    const date = new Date(`0000-00-00 ${dateString}`);
    if (isNaN(date.getDate())){
      throw new Error(`Can't parse 1970-01-01 ${dateString} to Date`);
    }

    return date;
  }

  public static toSql(date: Date): string{
    const newDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');  

    return newDate;
  }

  public static toSqlTimeOnly(date: Date): string{
    return SqlDateConverter.toSql(date).split(" ")[1];
  }
}