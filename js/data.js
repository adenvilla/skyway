/* Skyway — indicative rate data + demo tracking records.
   All figures are planning estimates in KES, not firm quotes. */
window.SKYWAY_DATA = {
  origins: {
    china:  { sea: 36000, air: 980,  min: 18000, seaDays: [30, 40], airDays: [4, 7] },
    uk:     { sea: 44000, air: 1150, min: 22000, seaDays: [32, 45], airDays: [7, 10] },
    dubai:  { sea: 30000, air: 820,  min: 15000, seaDays: [18, 26], airDays: [3, 6] },
    turkey: { sea: 38000, air: 900,  min: 18000, seaDays: [24, 34], airDays: [4, 7] },
    usa:    { sea: 52000, air: 1250, min: 26000, seaDays: [38, 50], airDays: [7, 10] },
    mombasa:{ sea: 12000, air: 0,    min: 12000, seaDays: [0, 0],  airDays: [1, 2] }
  },
  truckBase: { nairobi: 38000, mombasa: 22000, eldoret: 72000, kisumu: 68000, nakuru: 55000 },
  handling: { air: 6500, sea: 9500, door: 12000, truck: 4000 },
  kgPerCbm: 167
};
