import panelFunc from '../logic';

describe('Panel-logic function', () => {
  describe('Checking argument types', () => {
    it('should throw a error', () => {
      expect(() => {
        panelFunc('1');
      }).toThrow();
    });
    it('should throw a error', () => {
      expect(() => {
        panelFunc(1.1);
      }).toThrow();
    });
    it('should NOT throw a error', () => {
      const func = jest.fn(num => {
        panelFunc(num);
      });
      func(1);
      expect(func).toHaveReturned();
    });
  });
});
