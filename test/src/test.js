import assert from 'assert';
import chai from 'chai';

import leaflet from 'leaflet';
import '../../src/leaflet.snogylop';
import * as data from './data';

describe('Snogylop', () => {
  describe('no errors', () => {
    it('should throw no errors', () => {
      const invertedLayer = L.geoJson(data.polygon, {
          invert: true
      }).addTo(map);
    });
  });

  describe('getBounds', () => {
    it('should have the same bounds as the original polygon', () => {
      const invertedLayer = L.geoJson(data.polygon, {
          invert: true
      }).addTo(map);
      const noninvertedLayer = L.geoJson(data.polygon).addTo(map);
      assert.deepEqual(invertedLayer.getBounds(), noninvertedLayer.getBounds());
    });
  });
});
