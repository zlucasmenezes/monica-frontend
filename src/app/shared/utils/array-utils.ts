class ArrayUtils {
  public filter(array: any, filter: string, fields?: string[]): any[] {
    return array.filter(item => {
      if (fields) {
        let match = false;

        fields.forEach(field => {
          let value: any = item;
          field.split('.').forEach(f => {
            value = value[f];
          });

          if (String(value).toLocaleLowerCase().includes(filter?.toLocaleLowerCase())) {
            match = true;
            return;
          }
        });

        return match;
      } else {
        return String(item).toLocaleLowerCase().includes(filter?.toLocaleLowerCase());
      }
    });
  }

  public orderBy(array: any, order: orderType, field?: string): any[] {
    if (field) {
      return array.sort((a: any, b: any) => {
        return order === 'ASC'
          ? a[field] < b[field]
            ? -1
            : a[field] > b[field]
            ? 1
            : 0
          : a[field] > b[field]
          ? -1
          : a[field] < b[field]
          ? 1
          : 0;
      });
    } else {
      return array.sort((a: any, b: any) => {
        return order === 'ASC' ? (a < b ? -1 : a > b ? 1 : 0) : a > b ? -1 : a < b ? 0 : 1;
      });
    }
  }
}
export default new ArrayUtils();

type orderType = 'ASC' | 'DESC';
