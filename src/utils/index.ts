class Utils {
  /**
   * Converts digits of given number to persian digits.
   * @param number - A number to convert it to persian.
   * @returns a number with persian digits as string.
   */
  static convertEnglishNumberToPersian(number: number | string): string {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.toString().replace(/\d/g, (x: any) => persianNumbers[x]);
  }

  /**
   * Adds comma to the given number for every thrid digit form the right.
   * @param number - A number to be formatted with comma.
   * @returns a number formatted with commas.
   */
  static formatNumberWithComma(number: string): string {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default Utils;
