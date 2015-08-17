(function () {

    function defineSnogylop(L) {

        var worldLatlngs = [
            L.latLng([90, 180]),
            L.latLng([90, -180]),
            L.latLng([-90, -180]),
            L.latLng([-90, 180])
        ];

        L.extend(L.Polygon.prototype, {

            initialize: function (latlngs, options) {
                worldLatlngs = (options.worldLatLngs ? options.worldLatLngs : worldLatlngs);

                if (options && options.invert && !options.invertMultiPolygon) {
                    // Create a new set of latlngs, adding our world-sized ring
                    // first
                    var newLatlngs = [];
                    newLatlngs.push(worldLatlngs);
                    newLatlngs.push(latlngs[0]);
                    latlngs = newLatlngs;
                }

                L.Polyline.prototype.initialize.call(this, latlngs, options);
                this._initWithHoles(latlngs);
            },

            getBounds: function () {
                if (this.options.invert) {
                    // Don't return the world-sized ring's bounds, that's not
                    // helpful!
                    return new L.LatLngBounds(this._holes);
                }
                return new L.LatLngBounds(this.getLatLngs());
            },

        });

        L.extend(L.MultiPolygon.prototype, {

            initialize: function (latlngs, options) {
                worldLatlngs = (options.worldLatLngs ? options.worldLatLngs : worldLatlngs);
                this._layers = {};
                this._options = options;

                if (options.invert) {
                    // Let Polygon know we're part of a MultiPolygon
                    options.invertMultiPolygon = true;

                    // Create a new set of latlngs, adding our world-sized ring
                    // first
                    var newLatlngs = [];
                    newLatlngs.push(worldLatlngs);
                    for (var l in latlngs) {
                        newLatlngs.push(latlngs[l][0]);
                    }
                    latlngs = [newLatlngs];
                }

                this.setLatLngs(latlngs);
            },

        });

    }

    if (typeof define === 'function' && define.amd) {
        // Try to add snogylop to Leaflet using AMD
        define(['leaflet'], function (L) {
            defineSnogylop(L);
        });
    }
    else {
        // Else use the global L
        defineSnogylop(L);
    }

})();
