
export const getYears = (diff: number = 0) => {
  
  return new Date().getFullYear() + diff;
}