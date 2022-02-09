import { renderURLs } from '../../utils/enums';
import { getFetchURL } from '../../utils/getFetchUrl';

describe('getFetchURL', () => {
    it('return updated url with given parameter', () => {
        const format = 'mp4';
        const url = getFetchURL(format);
        expect(url).toEqual(
            `${renderURLs.BASE_URL}/rendering?outputType=${format}&fps=30&layoutId=0&pixelRatio=1&encoding=rawRgba&socket=false`,
        );
    });
});