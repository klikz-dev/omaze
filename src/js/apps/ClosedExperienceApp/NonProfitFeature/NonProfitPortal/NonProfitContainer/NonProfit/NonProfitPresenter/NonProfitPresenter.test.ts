import { NonProfitPresenter } from './NonProfitPresenter';

describe('NonProfitPresenter', (): void => {
    it('should get all classnames', (): void => {
        expect(NonProfitPresenter.getAllClassNames()).toEqual({
            container: 'container',
        });
    });
});
