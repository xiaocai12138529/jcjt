/*  Global class for simulating the movement of particle through a 1km wind grid

    credit: All the credit for this work goes to: https://github.com/cambecc for creating the repo:
      https://github.com/cambecc/earth. The majority of this code is directly take nfrom there, since its awesome.

    This class takes a canvas element and an array of data (1km GFS from http://www.emc.ncep.noaa.gov/index.php?branch=GFS)
    and then uses a mercator (forward/reverse) projection to correctly map wind vectors in "map space".

    The "start" method takes the bounds of the map at its current extent and starts the whole gridding,
    interpolation and animation process.
*/
export const WindyV2 = function (t) {
  var e,
    i,
    n,
    a,
    s,
    r,
    o,
    h,
    d,
    l,
    c = t.minVelocity || 0,
    u = t.maxVelocity || 10,
    p =
      (t.velocityScale || 0.005) *
      (Math.pow(window.devicePixelRatio, 1 / 3) || 1),
    f = t.particleAge || 90,
    m = t.lineWidth || 1,
    g = t.particleMultiplier || 1 / 300,
    v = Math.pow(window.devicePixelRatio, 1 / 3) || 1.6,
    w = 1e3 / (t.frameRate || 15),
    y = t.colorScale || [
      "rgb(36,104, 180)",
      "rgb(60,157, 194)",
      "rgb(128,205,193 )",
      "rgb(151,218,168 )",
      "rgb(198,231,181)",
      "rgb(238,247,217)",
      "rgb(255,238,159)",
      "rgb(252,217,125)",
      "rgb(255,182,100)",
      "rgb(252,150,75)",
      "rgb(250,112,52)",
      "rgb(245,64,32)",
      "rgb(237,45,28)",
      "rgb(220,24,32)",
      "rgb(180,0,35)",
    ],
    b = [NaN, NaN, null],
    M = t.data,
    x = function (t, e, i, n, a, s) {
      var r = 1 - t,
        o = 1 - e,
        h = r * o,
        d = t * o,
        l = r * e,
        c = t * e,
        u = i[0] * h + n[0] * d + a[0] * l + s[0] * c,
        p = i[1] * h + n[1] * d + a[1] * l + s[1] * c;
      return [u, p, Math.sqrt(u * u + p * p)];
    },
    _ = function (t) {
      var e = null,
        i = null;
      return (
        t.forEach(function (t) {
          switch (t.header.parameterCategory + "," + t.header.parameterNumber) {
            case "1,2":
            case "2,2":
              e = t;
              break;
            case "1,3":
            case "2,3":
              i = t;
          }
        }),
        (function (t, e) {
          var i = t.data,
            n = e.data;
          return {
            header: t.header,
            data: function (t) {
              return [i[t], n[t]];
            },
            interpolate: x,
          };
        })(e, i)
      );
    },
    C = function (t, n) {
      if (!i) return null;
      var h,
        d = I(t - a, 360) / r,
        l = (s - n) / o,
        c = Math.floor(d),
        u = c + 1,
        p = Math.floor(l),
        f = p + 1;
      if ((h = i[p])) {
        var m = h[c],
          g = h[u];
        if (E(m) && E(g) && (h = i[f])) {
          var v = h[c],
            w = h[u];
          if (E(v) && E(w)) return e.interpolate(d - c, l - p, m, g, v, w);
        }
      }
      return null;
    },
    E = function (t) {
      return null != t;
    },
    I = function (t, e) {
      return t - e * Math.floor(t / e);
    },
    L = function (t, e, i, n, a, s, r, o) {
      var h = r[0] * s,
        d = r[1] * s,
        l = T(t, e, i, n, a, o);
      return (r[0] = l[0] * h + l[2] * d), (r[1] = l[1] * h + l[3] * d), r;
    },
    T = function (t, e, i, n, a, s) {
      var r = 2 * Math.PI,
        o = Math.pow(10, -5.2),
        h = e < 0 ? o : -o,
        d = i < 0 ? o : -o,
        l = P(i, e + h, s),
        c = P(i + d, e, s),
        u = Math.cos((i / 360) * r);
      return [
        (l[0] - n) / h / u,
        (l[1] - a) / h / u,
        (c[0] - n) / d,
        (c[1] - a) / d,
      ];
    },
    k = function (t, e, i) {
      function n(e, i) {
        var n = t[Math.round(e)];
        return (n && n[Math.round(i)]) || b;
      }

      (n.release = function () {
        t = [];
      }),
        (n.randomize = function (t) {
          var i,
            a,
            s = 0;
          do {
            (i = Math.round(Math.floor(Math.random() * e.width) + e.x)),
              (a = Math.round(Math.floor(Math.random() * e.height) + e.y));
          } while (null === n(i, a)[2] && s++ < 30);
          return (t.x = i), (t.y = a), t;
        }),
        i(e, n);
    },
    S = function (t) {
      return (t / 180) * Math.PI;
    },
    U = function (t) {
      return t / (Math.PI / 180);
    },
    D = function (t, e, i) {
      var n = i.east - i.west,
        a = ((i.width / U(n)) * 360) / (2 * Math.PI),
        s =
          (a / 2) * Math.log((1 + Math.sin(i.south)) / (1 - Math.sin(i.south))),
        r = (i.height + s - e) / a,
        o = (180 / Math.PI) * (2 * Math.atan(Math.exp(r)) - Math.PI / 2);
      return [U(i.west) + (t / i.width) * U(n), o];
    },
    A = function (t) {
      return Math.log(Math.tan(t / 2 + Math.PI / 4));
    },
    P = function (t, e, i) {
      var n = A(i.south),
        a = A(i.north),
        s = i.width / (i.east - i.west),
        r = i.height / (a - n),
        o = A(S(t));
      return [(S(e) - i.west) * s, (o = (a - o) * r)];
    },
    W = function (e, i) {
      var n,
        a,
        s =
          ((n = c),
          (a = u),
          (y.indexFor = function (t) {
            return Math.max(
              0,
              Math.min(
                y.length - 1,
                Math.round(((t - n) / (a - n)) * (y.length - 1))
              )
            );
          }),
          y),
        r = s.map(function () {
          return [];
        }),
        o = Math.round(e.width * e.height * g);
      /android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i.test(
        navigator.userAgent
      ) && (o *= v);
      for (var h = [], d = 0; d < o; d++)
        h.push(
          i.randomize({
            age: Math.floor(Math.random() * f) + 0,
          })
        );
      var p = t.canvas.getContext("2d");
      (p.lineWidth = m),
        (p.fillStyle = "rgba(0, 0, 0, 0.97)"),
        (p.globalAlpha = 0.6);
      var b = Date.now();
      !(function t() {
        l = requestAnimationFrame(t);
        var n = Date.now(),
          a = n - b;
        a > w &&
          ((b = n - (a % w)),
          r.forEach(function (t) {
            t.length = 0;
          }),
          h.forEach(function (t) {
            t.age > f && (i.randomize(t).age = 0);
            var e = t.x,
              n = t.y,
              a = i(e, n),
              o = a[2];
            if (null === o) t.age = f;
            else {
              var h = e + a[0],
                d = n + a[1];
              null !== i(h, d)[2]
                ? ((t.xt = h), (t.yt = d), r[s.indexFor(o)].push(t))
                : ((t.x = h), (t.y = d));
            }
            t.age += 1;
          }),
          (p.globalCompositeOperation = "destination-in"),
          p.fillRect(e.x, e.y, e.width, e.height),
          (p.globalCompositeOperation = "lighter"),
          (p.globalAlpha = 0.9),
          r.forEach(function (t, e) {
            t.length > 0 &&
              (p.beginPath(),
              (p.strokeStyle = s[e]),
              t.forEach(function (t) {
                p.moveTo(t.x, t.y),
                  p.lineTo(t.xt, t.yt),
                  (t.x = t.xt),
                  (t.y = t.yt);
              }),
              p.stroke());
          }));
      })();
    },
    F = function () {
      H.field && H.field.release(), l && cancelAnimationFrame(l);
    },
    H = {
      params: t,
      start: function (t, l, c, u) {
        var f = {
          south: S(u[0][1]),
          north: S(u[1][1]),
          east: S(u[1][0]),
          west: S(u[0][0]),
          width: l,
          height: c,
        };
        F(),
          (function (t, l) {
            var c = (e = _(t)).header;
            (a = c.lo1),
              (s = c.la1),
              (r = c.dx),
              (o = c.dy),
              (h = c.nx),
              (d = c.ny),
              (n = new Date(c.refTime)).setHours(n.getHours() + c.forecastTime),
              (i = []);
            for (var u = 0, p = Math.floor(h * r) >= 360, f = 0; f < d; f++) {
              for (var m = [], g = 0; g < h; g++, u++) m[g] = e.data(u);
              p && m.push(m[0]), (i[f] = m);
            }
            l({
              date: n,
              interpolate: C,
            });
          })(M, function (e) {
            !(function (t, e, i, n) {
              var a = {},
                s = (i.south - i.north) * (i.west - i.east),
                r = p * Math.pow(s, 0.4),
                o = [],
                h = e.x;

              function d(n) {
                for (var s = [], h = e.y; h <= e.yMax; h += 2) {
                  var d = D(n, h, i);
                  if (d) {
                    var l = d[0],
                      c = d[1];
                    if (isFinite(l)) {
                      var u = t.interpolate(l, c);
                      u &&
                        ((u = L(a, l, c, n, h, r, u, i)),
                        (s[h + 1] = s[h] = u));
                    }
                  }
                }
                o[n + 1] = o[n] = s;
              }

              !(function t() {
                for (var i = Date.now(); h < e.width; )
                  if ((d(h), (h += 2), Date.now() - i > 1e3))
                    return void setTimeout(t, 25);
                k(o, e, n);
              })();
            })(
              e,
              (function (t, e, i) {
                var n = t[0],
                  a = t[1],
                  s = Math.round(n[0]),
                  r = Math.max(Math.floor(n[1], 0), 0);
                return (
                  Math.min(Math.ceil(a[0], e), e - 1),
                  {
                    x: s,
                    y: r,
                    xMax: e,
                    yMax: Math.min(Math.ceil(a[1], i), i - 1),
                    width: e,
                    height: i,
                  }
                );
              })(t, l, c),
              f,
              function (t, e) {
                (H.field = e), W(t, e);
              }
            );
          });
      },
      stop: F,
      createField: k,
      interpolatePoint: C,
      setData: function (t) {
        M = t;
      },
      colorScale: y,
      min_velocity_intensity: c,
      max_velocity_intensity: u,
    };
  return H;
};
export const Windy = function (params) {
  var VELOCITY_SCALE = 0.011; // scale for wind velocity (completely arbitrary--this value looks nice)
  var INTENSITY_SCALE_STEP = 10; // step size of particle intensity color scale
  var MAX_WIND_INTENSITY = 40; // wind velocity at which particle intensity is maximum (m/s)
  var MAX_PARTICLE_AGE = 100; //default 100 max number of frames a particle is drawn before regeneration
  var PARTICLE_LINE_WIDTH = 1; // line width of a drawn particle
  var PARTICLE_MULTIPLIER = 1 / 300; // default 1/30 particle count scalar (completely arbitrary--this values looks nice)
  var PARTICLE_REDUCTION = 0.75; // reduce particle count to this much of normal for mobile devices
  var FRAME_RATE = 60; // default 20 desired milliseconds per frame
  // var BOUNDARY = 0.45;

  var NULL_WIND_VECTOR = [NaN, NaN, null]; // singleton for no wind in the form: [u, v, magnitude]
  // var TRANSPARENT_BLACK = [255, 0, 0, 0];

  // var τ = 2 * Math.PI;
  // var H = Math.pow(10, -5.2);

  // interpolation for vectors like wind (u,v,m)
  var bilinearInterpolateVector = function (x, y, g00, g10, g01, g11) {
    var rx = 1 - x;
    var ry = 1 - y;
    var a = rx * ry,
      b = x * ry,
      c = rx * y,
      d = x * y;
    var u = g00[0] * a + g10[0] * b + g01[0] * c + g11[0] * d;
    var v = g00[1] * a + g10[1] * b + g01[1] * c + g11[1] * d;
    return [u, v, Math.sqrt(u * u + v * v)];
  };

  var createWindBuilder = function (uComp, vComp) {
    var uData = uComp.data,
      vData = vComp.data;
    return {
      header: uComp.header,
      //recipe: recipeFor("wind-" + uComp.header.surface1Value),
      data: function (i) {
        return [uData[i], vData[i]];
      },
      interpolate: bilinearInterpolateVector,
    };
  };

  var createBuilder = function (data) {
    var uComp = null,
      vComp = null
      // scalar = null;

    data.forEach(function (record) {
      switch (
        record.header.parameterCategory +
        "," +
        record.header.parameterNumber
      ) {
        case "2,2":
          uComp = record;
          break;
        case "2,3":
          vComp = record;
          break;
        default:
          // scalar = record;
      }
    });

    return createWindBuilder(uComp, vComp);
  };

  var buildGrid = function (data, callback) {
    var builder = createBuilder(data);

    var header = builder.header;
    var λ0 = header.lo1,
      φ0 = header.la1; // the grid's origin (e.g., 0.0E, 90.0N)
    var Δλ = header.dx,
      Δφ = header.dy; // distance between grid points (e.g., 2.5 deg lon, 2.5 deg lat)
    var ni = header.nx,
      nj = header.ny; // number of grid points W-E and N-S (e.g., 144 x 73)
    var date = new Date(header.refTime);
    date.setHours(date.getHours() + header.forecastTime);

    // Scan mode 0 assumed. Longitude increases from λ0, and latitude decreases from φ0.
    // http://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_table3-4.shtml
    var grid = [],
      p = 0;
    var isContinuous = Math.floor(ni * Δλ) >= 360;
    for (var j = 0; j < nj; j++) {
      var row = [];
      for (var i = 0; i < ni; i++, p++) {
        row[i] = builder.data(p);
      }
      if (isContinuous) {
        // For wrapped grids, duplicate first column as last column to simplify interpolation logic
        row.push(row[0]);
      }
      grid[j] = row;
    }

    function interpolate(λ, φ) {
      var i = floorMod(λ - λ0, 360) / Δλ; // calculate longitude index in wrapped range [0, 360)
      var j = (φ0 - φ) / Δφ; // calculate latitude index in direction +90 to -90

      var fi = Math.floor(i),
        ci = fi + 1;
      var fj = Math.floor(j),
        cj = fj + 1;

      var row;
      if ((row = grid[fj])) {
        var g00 = row[fi];
        var g10 = row[ci];
        if (isValue(g00) && isValue(g10) && (row = grid[cj])) {
          var g01 = row[fi];
          var g11 = row[ci];
          if (isValue(g01) && isValue(g11)) {
            // All four points found, so interpolate the value.
            return builder.interpolate(i - fi, j - fj, g00, g10, g01, g11);
          }
        }
      }
      return null;
    }
    callback({
      date: date,
      interpolate: interpolate,
    });
  };

  /**
   * @returns {Boolean} true if the specified value is not null and not undefined.
   */
  var isValue = function (x) {
    return x !== null && x !== undefined;
  };

  /**
   * @returns {Number} returns remainder of floored division, i.e., floor(a / n). Useful for consistent modulo
   *          of negative numbers. See http://en.wikipedia.org/wiki/Modulo_operation.
   */
  var floorMod = function (a, n) {
    return a - n * Math.floor(a / n);
  };

  /**
   * @returns {Number} the value x clamped to the range [low, high].
   */
  // var clamp = function (x, range) {
  //   return Math.max(range[0], Math.min(x, range[1]));
  // };

  /**
   * @returns {Boolean} true if agent is probably a mobile device. Don't really care if this is accurate.
   */
  var isMobile = function () {
    return /android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i.test(
      navigator.userAgent
    );
  };

  /**
   * Calculate distortion of the wind vector caused by the shape of the projection at point (x, y). The wind
   * vector is modified in place and returned by this function.
   */
  var distort = function (projection, λ, φ, x, y, scale, wind, windy) {
    var u = wind[0] * scale;
    var v = wind[1] * scale;
    var d = distortion(projection, λ, φ, x, y, windy);

    // Scale distortion vectors by u and v, then add.
    wind[0] = d[0] * u + d[2] * v;
    wind[1] = d[1] * u + d[3] * v;
    return wind;
  };

  var distortion = function (projection, λ, φ, x, y, windy) {
    var τ = 2 * Math.PI;
    var H = Math.pow(10, -5.2);
    var hλ = λ < 0 ? H : -H;
    var hφ = φ < 0 ? H : -H;

    var pλ = project(φ, λ + hλ, windy);
    var pφ = project(φ + hφ, λ, windy);

    // Meridian scale factor (see Snyder, equation 4-3), where R = 1. This handles issue where length of 1º λ
    // changes depending on φ. Without this, there is a pinching effect at the poles.
    var k = Math.cos((φ / 360) * τ);
    return [
      (pλ[0] - x) / hλ / k,
      (pλ[1] - y) / hλ / k,
      (pφ[0] - x) / hφ,
      (pφ[1] - y) / hφ,
    ];
  };

  var createField = function (columns, bounds, callback) {
    /**
     * @returns {Array} wind vector [u, v, magnitude] at the point (x, y), or [NaN, NaN, null] if wind
     *          is undefined at that point.
     */
    function field(x, y) {
      var column = columns[Math.round(x)];
      return (column && column[Math.round(y)]) || NULL_WIND_VECTOR;
    }

    // Frees the massive "columns" array for GC. Without this, the array is leaked (in Chrome) each time a new
    // field is interpolated because the field closure's context is leaked, for reasons that defy explanation.
    field.release = function () {
      columns = [];
    };

    field.randomize = function (o) {
      // UNDONE: this method is terrible
      var x, y;
      var safetyNet = 0;
      do {
        x = Math.round(Math.floor(Math.random() * bounds.width) + bounds.x);
        y = Math.round(Math.floor(Math.random() * bounds.height) + bounds.y);
      } while (field(x, y)[2] === null && safetyNet++ < 30);
      o.x = x;
      o.y = y;
      return o;
    };

    //field.overlay = mask.imageData;
    //return field;
    callback(bounds, field);
  };

  var buildBounds = function (bounds, width, height) {
    var upperLeft = bounds[0];
    var lowerRight = bounds[1];
    var x = Math.round(upperLeft[0]); //Math.max(Math.floor(upperLeft[0], 0), 0);
    var y = Math.max(Math.floor(upperLeft[1], 0), 0);
    // var xMax = Math.min(Math.ceil(lowerRight[0], width), width - 1);
    var yMax = Math.min(Math.ceil(lowerRight[1], height), height - 1);
    return {
      x: x,
      y: y,
      xMax: width,
      yMax: yMax,
      width: width,
      height: height,
    };
  };

  var deg2rad = function (deg) {
    return (deg / 180) * Math.PI;
  };

  var rad2deg = function (ang) {
    return ang / (Math.PI / 180.0);
  };

  var invert = function (x, y, windy) {
    var mapLonDelta = windy.east - windy.west;
    var worldMapRadius =
      ((windy.width / rad2deg(mapLonDelta)) * 360) / (2 * Math.PI);
    var mapOffsetY =
      (worldMapRadius / 2) *
      Math.log((1 + Math.sin(windy.south)) / (1 - Math.sin(windy.south)));
    var equatorY = windy.height + mapOffsetY;
    var a = (equatorY - y) / worldMapRadius;

    var lat = (180 / Math.PI) * (2 * Math.atan(Math.exp(a)) - Math.PI / 2);
    var lon = rad2deg(windy.west) + (x / windy.width) * rad2deg(mapLonDelta);
    return [lon, lat];
  };

  var mercY = function (lat) {
    return Math.log(Math.tan(lat / 2 + Math.PI / 4));
  };

  var project = function (lat, lon, windy) {
    // both in radians, use deg2rad if neccessary
    var ymin = mercY(windy.south);
    var ymax = mercY(windy.north);
    var xFactor = windy.width / (windy.east - windy.west);
    var yFactor = windy.height / (ymax - ymin);

    var y = mercY(deg2rad(lat));
    var x = (deg2rad(lon) - windy.west) * xFactor;
    y = (ymax - y) * yFactor; // y points south
    return [x, y];
  };

  var interpolateField = function (grid, bounds, extent, callback) {
    var projection = {};
    var velocityScale = VELOCITY_SCALE;

    var columns = [];
    var x = bounds.x;

    function interpolateColumn(x) {
      var column = [];
      for (var y = bounds.y; y <= bounds.yMax; y += 2) {
        var coord = invert(x, y, extent);
        if (coord) {
          var λ = coord[0],
            φ = coord[1];
          if (isFinite(λ)) {
            var wind = grid.interpolate(λ, φ);
            if (wind) {
              wind = distort(
                projection,
                λ,
                φ,
                x,
                y,
                velocityScale,
                wind,
                extent
              );
              column[y + 1] = column[y] = wind;
            }
          }
        }
      }
      columns[x + 1] = columns[x] = column;
    }

    (function batchInterpolate() {
      var start = Date.now();
      while (x < bounds.width) {
        interpolateColumn(x);
        x += 2;
        if (Date.now() - start > 1000) {
          //MAX_TASK_TIME) {
          setTimeout(batchInterpolate, 25);
          return;
        }
      }
      createField(columns, bounds, callback);
    })();
  };

  var animate = function (bounds, field) {
    // function asColorStyle(r, g, b, a) {
    //   return "rgba(" + 243 + ", " + 243 + ", " + 238 + ", " + a + ")";
    // }

    function hexToR(h) {
      return parseInt(cutHex(h).substring(0, 2), 16);
    }
    function hexToG(h) {
      return parseInt(cutHex(h).substring(2, 4), 16);
    }
    function hexToB(h) {
      return parseInt(cutHex(h).substring(4, 6), 16);
    }
    function cutHex(h) {
      return h.charAt(0) == "#" ? h.substring(1, 7) : h;
    }

    function windIntensityColorScale(step, maxWind) {
      var result = [
        /* blue to red
        "rgba(" + hexToR('#178be7') + ", " + hexToG('#178be7') + ", " + hexToB('#178be7') + ", " + 0.5 + ")",
        "rgba(" + hexToR('#8888bd') + ", " + hexToG('#8888bd') + ", " + hexToB('#8888bd') + ", " + 0.5 + ")",
        "rgba(" + hexToR('#b28499') + ", " + hexToG('#b28499') + ", " + hexToB('#b28499') + ", " + 0.5 + ")",
        "rgba(" + hexToR('#cc7e78') + ", " + hexToG('#cc7e78') + ", " + hexToB('#cc7e78') + ", " + 0.5 + ")",
        "rgba(" + hexToR('#de765b') + ", " + hexToG('#de765b') + ", " + hexToB('#de765b') + ", " + 0.5 + ")",
        "rgba(" + hexToR('#ec6c42') + ", " + hexToG('#ec6c42') + ", " + hexToB('#ec6c42') + ", " + 0.5 + ")",
        "rgba(" + hexToR('#f55f2c') + ", " + hexToG('#f55f2c') + ", " + hexToB('#f55f2c') + ", " + 0.5 + ")",
        "rgba(" + hexToR('#fb4f17') + ", " + hexToG('#fb4f17') + ", " + hexToB('#fb4f17') + ", " + 0.5 + ")",
        "rgba(" + hexToR('#fe3705') + ", " + hexToG('#fe3705') + ", " + hexToB('#fe3705') + ", " + 0.5 + ")",
        "rgba(" + hexToR('#ff0000') + ", " + hexToG('#ff0000') + ", " + hexToB('#ff0000') + ", " + 0.5 + ")"
        */
        "rgba(" +
          hexToR("#00ffff") +
          ", " +
          hexToG("#00ffff") +
          ", " +
          hexToB("#00ffff") +
          ", " +
          0.5 +
          ")",
        "rgba(" +
          hexToR("#64f0ff") +
          ", " +
          hexToG("#64f0ff") +
          ", " +
          hexToB("#64f0ff") +
          ", " +
          0.5 +
          ")",
        "rgba(" +
          hexToR("#87e1ff") +
          ", " +
          hexToG("#87e1ff") +
          ", " +
          hexToB("#87e1ff") +
          ", " +
          0.5 +
          ")",
        "rgba(" +
          hexToR("#a0d0ff") +
          ", " +
          hexToG("#a0d0ff") +
          ", " +
          hexToB("#a0d0ff") +
          ", " +
          0.5 +
          ")",
        "rgba(" +
          hexToR("#b5c0ff") +
          ", " +
          hexToG("#b5c0ff") +
          ", " +
          hexToB("#b5c0ff") +
          ", " +
          0.5 +
          ")",
        "rgba(" +
          hexToR("#c6adff") +
          ", " +
          hexToG("#c6adff") +
          ", " +
          hexToB("#c6adff") +
          ", " +
          0.5 +
          ")",
        "rgba(" +
          hexToR("#d49bff") +
          ", " +
          hexToG("#d49bff") +
          ", " +
          hexToB("#d49bff") +
          ", " +
          0.5 +
          ")",
        "rgba(" +
          hexToR("#e185ff") +
          ", " +
          hexToG("#e185ff") +
          ", " +
          hexToB("#e185ff") +
          ", " +
          0.5 +
          ")",
        "rgba(" +
          hexToR("#ec6dff") +
          ", " +
          hexToG("#ec6dff") +
          ", " +
          hexToB("#ec6dff") +
          ", " +
          0.5 +
          ")",
        "rgba(" +
          hexToR("#ff1edb") +
          ", " +
          hexToG("#ff1edb") +
          ", " +
          hexToB("#ff1edb") +
          ", " +
          0.5 +
          ")",
      ];
      /*
      var result = [];
      for (var j = 225; j >= 100; j = j - step) {
        result.push(asColorStyle(j, j, j, 1));
      }
      */
      const result_gosur = [
        "rgb(36,104, 180)",
        "rgb(60,157, 194)",
        "rgb(128,205,193 )",
        "rgb(151,218,168 )",
        "rgb(198,231,181)",
        "rgb(238,247,217)",
        "rgb(255,238,159)",
        "rgb(252,217,125)",
        "rgb(255,182,100)",
        "rgb(252,150,75)",
        "rgb(250,112,52)",
        "rgb(245,64,32)",
        "rgb(237,45,28)",
        "rgb(220,24,32)",
        "rgb(180,0,35)",
      ];
      result = result_gosur;
      result.indexFor = function (m) {
        // map wind speed to a style
        return Math.floor(
          (Math.min(m, maxWind) / maxWind) * (result.length - 1)
        );
      };
      return result;
    }

    var colorStyles = windIntensityColorScale(
      INTENSITY_SCALE_STEP,
      MAX_WIND_INTENSITY
    );
    var buckets = colorStyles.map(function () {
      return [];
    });

    var particleCount = Math.round(
      bounds.width * bounds.height * PARTICLE_MULTIPLIER
    );
    if (isMobile()) {
      particleCount *= PARTICLE_REDUCTION;
    }

    // default 0.97
    var fadeFillStyle = "rgba(0, 0, 0, 0.6)";

    var particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push(
        field.randomize({
          age: Math.floor(Math.random() * MAX_PARTICLE_AGE) + 0,
        })
      );
    }

    function evolve() {
      buckets.forEach(function (bucket) {
        bucket.length = 0;
      });
      particles.forEach(function (particle) {
        if (particle.age > MAX_PARTICLE_AGE) {
          field.randomize(particle).age = 0;
        }
        var x = particle.x;
        var y = particle.y;
        var v = field(x, y); // vector at current position
        var m = v[2];
        if (m === null) {
          particle.age = MAX_PARTICLE_AGE; // particle has escaped the grid, never to return...
        } else {
          var xt = x + v[0];
          var yt = y + v[1];
          if (field(xt, yt)[2] !== null) {
            // Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
            particle.xt = xt;
            particle.yt = yt;
            buckets[colorStyles.indexFor(m)].push(particle);
          } else {
            // Particle isn't visible, but it still moves through the field.
            particle.x = xt;
            particle.y = yt;
          }
        }
        particle.age += 1;
      });
    }

    var g = params.canvas.getContext("2d");
    g.lineWidth = PARTICLE_LINE_WIDTH;
    g.fillStyle = fadeFillStyle;

    function draw() {
      // Fade existing particle trails.
      var prev = g.globalCompositeOperation;
      g.globalCompositeOperation = "destination-in";
      g.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
      g.globalCompositeOperation = prev;

      // Draw new particle trails.
      buckets.forEach(function (bucket, i) {
        if (bucket.length > 0) {
          g.beginPath();
          g.strokeStyle = colorStyles[i];
          bucket.forEach(function (particle) {
            g.moveTo(particle.x, particle.y);
            g.lineTo(particle.xt, particle.yt);
            particle.x = particle.xt;
            particle.y = particle.yt;
          });
          g.stroke();
        }
      });
    }

    (function frame() {
      try {
        windy.timer = setTimeout(function () {
          requestAnimationFrame(frame);
          evolve();
          draw();
        }, 1000 / FRAME_RATE);
      } catch (e) {
        console.error(e);
      }
    })();
  };

  var start = function (bounds, width, height, extent) {
    var mapBounds = {
      south: deg2rad(extent[0][1]),
      north: deg2rad(extent[1][1]),
      east: deg2rad(extent[1][0]),
      west: deg2rad(extent[0][0]),
      width: width,
      height: height,
    };

    stop();

    // build grid
    buildGrid(params.data, function (grid) {
      // interpolateField
      interpolateField(
        grid,
        buildBounds(bounds, width, height),
        mapBounds,
        function (bounds, field) {
          // animate the canvas with random points
          windy.field = field;
          animate(bounds, field);
        }
      );
    });
  };

  var stop = function () {
    if (windy.field) windy.field.release();
    if (windy.timer) clearTimeout(windy.timer);
  };

  var windy = {
    params: params,
    start: start,
    stop: stop,
  };

  return windy;
};

// shim layer with setTimeout fallback
window.requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 20);
    }
  );
})();
