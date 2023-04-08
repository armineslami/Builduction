class Utils {
  static convertEnglishNumberToPersian(number: number | string): string {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.toString().replace(/\d/g, (x: any) => persianNumbers[x]);
  }

  static formatNumberWithComma(number: string): string {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default Utils;
