import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exams } from './exams.ts';

test('lists the Foundations and Professional exams', () => {
  assert.deepEqual(exams.map((e) => e.code), ['CCDV-F', 'CCDV-P']);
});

for (const exam of exams) {
  test(`${exam.code}: 8 domains`, () => {
    assert.equal(exam.domains.length, 8);
  });

  test(`${exam.code}: domain weights sum to 100`, () => {
    const total = exam.domains.reduce((sum, d) => sum + d.weight, 0);
    assert.equal(total, 100);
  });

  test(`${exam.code}: every domain has skills`, () => {
    for (const d of exam.domains) {
      assert.ok(d.skills.length > 0, `${d.name} has no skills`);
    }
  });
}
