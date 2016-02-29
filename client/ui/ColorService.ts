
export default class ColorService {
  constructor(private colors: string[] = [
      '#8CD4D8',
      '#8CD891',
      '#D8D38C',
      '#D88C8C',
      '#8F8CD8',
      '#CF8CD8'
  ]){}
  private hasher(string) {
    let hash = 0, i, chr, len;
    if (string.length === 0) return hash;
    for (i = 0, len = string.length; i < len; i++) {
        chr   = string.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  getRandomColor(){
    return this.colors[Math.floor(Math.random() * 6)];
  }
  getColorForString(input){
    console.log('getting color: ', input, this.colors);
    const number = Math.abs(this.hasher(input));
    return this.colors[Math.floor(number % this.colors.length)];
  };
};
