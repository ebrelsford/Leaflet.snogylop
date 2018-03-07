(function () {
    // Use public isFlat if available, else fall back to private _flat
    var isFlat = L.LineUtil.isFlat ? L.LineUtil.isFlat : L.LineUtil._flat;

    function defineSnogylop(L) {

        var worldLatlngs = [
            L.latLng([90, 180]),
            L.latLng([90, -180]),
            L.latLng([-90, -180]),
            L.latLng([-90, 180])
        ];

        if (L.version < '1.0.0') {
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
                }

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
                }
            });
        }
        else {
            var OriginalPolygon = {
                toGeoJSON: L.Polygon.prototype.toGeoJSON
            };

            L.extend(L.Polygon.prototype, {
                _setLatLngs: function(latlngs) {
                    this._originalLatLngs = latlngs;
                    if (isFlat(this._originalLatLngs)) {
                        this._originalLatLngs = [this._originalLatLngs];
                    }
                    if (this.options.invert) {
                        worldLatlngs = (this.options.worldLatLngs ?
                            this.options.worldLatLngs :
                            worldLatlngs);
                        // Create a new set of latlngs, adding our world-sized ring
                        // first
                        var newLatlngs = [];
                        newLatlngs.push(worldLatlngs);

                        for (var l in latlngs) {
                            newLatlngs.push(latlngs[l]);
                        }
                        latlngs = [newLatlngs];
                    }
                    L.Polyline.prototype._setLatLngs.call(this, latlngs);
                },

                getBounds: function () {
                    if (this._originalLatLngs) {
                        // Don't return the world-sized ring's bounds, that's not
                        // helpful!
                        return new L.LatLngBounds(this._originalLatLngs);
                    }
                    return new L.LatLngBounds(this.getLatLngs());
                },

                getLatLngs: function() {
                    return this._originalLatLngs;
                },

                toGeoJSON: function (precision) {
                    if (!this.options.invert) return OriginalPolygon.toGeoJSON.call(this, precision);

                    var holes = !isFlat(this._originalLatLngs),
                        multi = holes && !isFlat(this._originalLatLngs[0]);

                    var coords = L.GeoJSON.latLngsToCoords(this._originalLatLngs, multi ? 2 : holes ? 1 : 0, true, precision);

                    if (!holes) {
                        coords = [coords];
                    }

                    return L.GeoJSON.getFeature(this, {
                        type: (multi ? 'Multi' : '') + 'Polygon',
                        coordinates: coords
                    });
                }
            });
        }

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
