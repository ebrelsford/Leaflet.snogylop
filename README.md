Leaflet.snogylop
================

Leaflet.snogylop is a [Leaflet][] plugin that inverts polygons.

Why? you ask. Sometimes you want to highlight a region of a map by
de-emphasizing the rest of the map. Using this plugin you can set a relatively
high opacity in order to de-emphasize everything outside of a polygon or
multipolygon.


## Demos

An inverted [polygon][].

An inverted [multipolygon][].

Custom [worldLatLngs][], eg for polygons near the antimeridian.


## Usage

Include `leaflet.snogylop.js` on your page, set the options on your GeoJSON 
layer as specified below.

Leaflet.snogylop is tested on Leaflet version 0.7 and 1.x with L.GeoJSON
layers. It may work with older Leaflets and should work with other layers. Pull
requests in this direction are welcome.

AMD compatible.

Available through [bower][]: `bower install --save leaflet.snogylop`


### Options

Define the following option in the vector options when creating a layer (eg, 
an `L.GeoJSON`):

 - **invert**: (boolean) True to invert. False by default.
 - **worldLatLngs**: (coordinate array) Optional, the coordinates of the outer 
   ring of the inverted polygon that will be created.


### Examples

Create a GeoJSON layer, set `invert` to `true`:

```javascript
L.geoJson(data, {
    invert: true
}).addTo(map);
```

The default worldLatLngs can be overriden by using the `worldLatLngs` option:

```javascript
L.geoJson(data, {
    invert: true,
    worldLatLngs: [
        L.latLng([90, 360]),
        L.latLng([90, -180]),
        L.latLng([-90, -180]),
        L.latLng([-90, 360])
    ]
}).addTo(map);
```


## License

Leaflet.snogylop is free software, and may be redistributed under the MIT
License.


 [Leaflet]: https://github.com/Leaflet/Leaflet
 [polygon]: http://ebrelsford.github.io/Leaflet.snogylop/examples/polygon.html
 [multipolygon]: http://ebrelsford.github.io/Leaflet.snogylop/examples/multipolygon.html
 [worldLatLngs]: http://ebrelsford.github.io/Leaflet.snogylop/examples/custom_world.html
 [bower]: https://github.com/bower/bower
