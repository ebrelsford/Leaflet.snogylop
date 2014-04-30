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


## Usage

Include `leaflet.snogylop.js` on your page, set the options on your GeoJSON 
layer as specified below.

Leaflet.snogylop is only tested on Leaflet version 0.7 or greater with L.GeoJSON
layers. It may work with older Leaflets and should work with other layers. Pull
requests in this direction are welcome.

AMD compatible.


### Options

Define the following option in the vector options when creating a layer (eg, 
an `L.GeoJSON`):

 - **invert**: (boolean) True to invert. False by default.


### Examples

Create a GeoJSON layer, set `invert` to `true`:

```javascript
L.geoJson(data, {
    invert: true
}).addTo(map);
```


## License

Leaflet.snogylop is free software, and may be redistributed under the MIT
License.


 [Leaflet]: https://github.com/Leaflet/Leaflet
 [polygon]: http://ebrelsford.github.io/Leaflet.snogylop/polygon.html
 [multipolygon]: http://ebrelsford.github.io/Leaflet.snogylop/multipolygon.html
