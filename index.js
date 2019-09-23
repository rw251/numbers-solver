const createTarget = () => 100 + Math.floor(Math.random() * 900);

const shuffle = (array) => {
  const arrayToReturn = array.slice(0);
  for (let i = arrayToReturn.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [arrayToReturn[i], arrayToReturn[j]] = [arrayToReturn[j], arrayToReturn[i]];
  }
  return arrayToReturn;
}

const pick = (selection, n) => {
  const randomSelection = shuffle(selection);
  return randomSelection.slice(0, n);
}

const pickLarge = (n) => pick([25, 50, 75, 100], n);

const pickSmall = (n) => pick([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10], n);

const pickNumbers = (nLarge) => pickLarge(nLarge).concat(pickSmall(6 - nLarge));

const ops = [
  (a,b) => ({val: a.val+b.val, op: `(${a.op}+${b.op})`, nums: a.nums.concat(b.nums).sort()}),
  (a,b) => ({val: a.val-b.val, op: `(${a.op}-${b.op})`, nums: a.nums.concat(b.nums).sort()}),
  (a,b) => ({val: a.val*b.val, op: `(${a.op}*${b.op})`, nums: a.nums.concat(b.nums).sort()}),
  (a,b) => ({val: a.val/b.val, op: `(${a.op}/${b.op})`, nums: a.nums.concat(b.nums).sort()}),
];

let solution;
let best;
let mem = {};

const recursiveSolve = (S, T) => {
  if(solution) return solution;
  if(mem[S.map(x => x.val).join(',')]) return mem[S.map(x => x.val).join(',')];
  if(S.length === 1) {
    if(S[0].val === T) solution = S[0];
    return [S[0]];
  }
  let rtn = [];
  
  for (let ix = 0; ix < S.length - 1; ix++) {
    if(solution) break;
    for (let jx = ix + 1; jx < S.length; jx++) {
      if(solution) break;
      ops.forEach((op,i) => {
        if(solution) return;
        const val = S[ix].val > S[jx].val
          ? op(S[ix], S[jx])
          : op(S[jx], S[ix]);
        if(val.val>0 && 
           Math.floor(val.val)-val.val===0 &&
            (val.val !== S[ix].val || i===4 || i===5) &&
            (val.val !== S[jx].val || i===4 || i===5)){
          if(val.val === T) {
            solution = val;
            return;
          }
          if(Math.abs(val.val - T) < Math.abs(best.val - T)) {
            best = val;
          }
          const localS = S.slice();
          localS.splice(jx,1);
          localS.splice(ix,1);
          localS.push(val);
          localS.sort((a,b) => b.val - a.val);
          rtn = rtn.concat(recursiveSolve(localS, T));
        }
      });
    }
  }
  if(solution) return solution;
  
  const obj={}
  const realrtn = [];
  rtn.forEach(x => {
    if(!obj[x.val]) {
      obj[x.val] = [x.nums];
      realrtn.push(x);
    }
    else {
      if(obj[x.val].filter(y => y.join(',') === x.nums.join(',')).length === 0) {
        obj[x.val].push(x.nums);
        realrtn.push(x);
      }
    }
  });
  mem[S.map(x => x.val).join(',')] = realrtn;
  return realrtn;
};

const solve = (selection, target) => {
  const modSelection = selection.sort((a,b) => b-a).map(x => ({val:x, op: x, nums: [x]}));
  solution = null;
  best = {val:-1000};
  const answer = recursiveSolve(modSelection, target);
  return answer.val
    ? answer 
    : best;
}

export { createTarget, pickNumbers, solve };