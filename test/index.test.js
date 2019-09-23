import { createTarget, pickNumbers, solve } from '../index';

describe('solve', () => {
  test('solves trivial', () => {
    const answer = solve([1,2], 3);
    expect(answer.val).toBe(3);
  });
  test('solves trivial 2', () => {
    const answer = solve([1,2,3], 9);
    expect(answer.val).toBe(9);
  });
  test('real example 1', () => {
    const answer = solve([75,5,2,5,6,9],266);
    expect(answer.val).toBe(266);
  });
  test('no solution', () => {
    const answer = solve([75,25,50,100,1,2],734);
    expect(answer.val).toBe(730);
  });

  test('Real', () => {
    const answer = solve([9, 6, 3, 4, 3, 1], 584);
    expect(answer.val).toBe(585);
  });
  test('Real', () => {
    const answer = solve([3, 6, 1, 7, 3, 7], 518);
    expect(answer.val).toBe(518);
  });
  test('Real', () => {
    const answer = solve([75, 7, 3, 3, 7, 1], 306);
    expect(answer.val).toBe(306);
  });
  test('Real', () => {
    const answer = solve([50, 25, 6, 4, 3, 7], 458);
    expect(answer.val).toBe(458);
  });
  test('Was failing', () => {
    const answer = solve([50, 100, 75, 25, 5, 2], 716);
    expect(answer.val).toBe(716);
  })
});

describe('pickNumbers', () => {

  test('picks 6 small', () => {
    for(let i = 0; i < 100; i++) {
      const selection = pickNumbers(0).sort((a,b) => a-b);
      expect(selection.length).toBe(6);
      expect(selection[0]).toBeGreaterThan(0);
      expect(selection[5]).toBeLessThan(11);
    }
  });

  test('picks 5 small', () => {
    for(let i = 0; i < 100; i++) {
      const selection = pickNumbers(1).sort((a,b) => a-b);
      expect(selection.length).toBe(6);
      expect(selection[0]).toBeGreaterThan(0);
      expect(selection[4]).toBeLessThan(11);
      expect([25,50,75,100]).toContain(selection[5]);
    }
  });

  test('picks 4 small', () => {
    for(let i = 0; i < 100; i++) {
      const selection = pickNumbers(2).sort((a,b) => a-b);
      expect(selection.length).toBe(6);
      expect(selection[0]).toBeGreaterThan(0);
      expect(selection[3]).toBeLessThan(11);
      expect([25,50,75,100]).toContain(selection[4]);
      expect([25,50,75,100]).toContain(selection[5]);
    }
  });

  test('picks 3 small', () => {
    for(let i = 0; i < 100; i++) {
      const selection = pickNumbers(3).sort((a,b) => a-b);
      expect(selection.length).toBe(6);
      expect(selection[0]).toBeGreaterThan(0);
      expect(selection[2]).toBeLessThan(11);
      expect([25,50,75,100]).toContain(selection[3]);
      expect([25,50,75,100]).toContain(selection[4]);
      expect([25,50,75,100]).toContain(selection[5]);
    }
  });

  test('picks 2 small', () => {
    for(let i = 0; i < 100; i++) {
      const selection = pickNumbers(4).sort((a,b) => a-b);
      expect(selection.length).toBe(6);
      expect(selection[0]).toBeGreaterThan(0);
      expect(selection[1]).toBeLessThan(11);
      expect([25,50,75,100]).toContain(selection[2]);
      expect([25,50,75,100]).toContain(selection[3]);
      expect([25,50,75,100]).toContain(selection[4]);
      expect([25,50,75,100]).toContain(selection[5]);
    }
  });

});

describe('createTarget', () => {

  test('creates a number', () => {
    expect(typeof createTarget()).toBe('number');
  });

  test('be in the range 100-999', () => {
    let minVal = 500;
    let maxVal = 500;
    for(let i = 0; i < 10000; i++) {
      const val = createTarget();
      if(val > maxVal) maxVal = val;
      if(val < minVal) minVal = val;
    }
    expect(minVal).toBeGreaterThan(99);
    expect(maxVal).toBeLessThan(1000);
  });
});