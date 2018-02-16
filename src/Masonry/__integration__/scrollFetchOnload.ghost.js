/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

describe('Masonry > ScrollFetch onload', () => {
  it('Limits scrollFetch count', async () => {
    ghost.close();
    await ghost.open('http://localhost:3000/Masonry?manualFetch=1', {
      viewportSize: {
        width: 400,
        height: 400,
      },
    });

    const initialFetchCount = await ghost.script(
      () => window.TEST_FETCH_COUNTS
    );
    assert.equal(initialFetchCount, null);

    // Fetches 1 time if the viewport is big enough
    ghost.close();
    await ghost.open('http://localhost:3000/Masonry', {
      viewportSize: {
        width: 2000,
        height: 1000,
      },
    });
    await ghost.script(() => window.NEXT_FETCH());
    await ghost.wait(async () => {
      const largerFetchCount = await ghost.script(
        () => window.TEST_FETCH_COUNTS
      );
      return largerFetchCount >= 1;
    });
  });
});
