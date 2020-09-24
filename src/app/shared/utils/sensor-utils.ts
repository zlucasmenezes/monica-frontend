class SensorUtils {
  public getDefaultCode(): string {
    return `/*
  Create a function to calculate the sensor\'s value of interest based on the board pin reading.

  The variable value has the value that was read on the board.
  The variable resolution has the value of the resolution(1024 or 4096) of the board.

  It\'s possible to create variables and use all javascript features on this editor.
*/

const result = (value / resolution) * 100;
return result;`;
  }
}
export default new SensorUtils();
