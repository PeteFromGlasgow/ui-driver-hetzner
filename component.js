"use strict";

define("nodes/components/driver-hetzner/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjaWYgbmVlZEFQSVRva2VufX0KICA8Zm9ybT4KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgci1tYjIwIj4KICAgICAgPHNwYW4+QWNjb3VudCBBY2Nlc3M8L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+QVBJIFRva2VuKjwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMTAiPgogICAgICAgIHt7aW5wdXQgdHlwZT0icGFzc3dvcmQiIHZhbHVlPW1vZGVsLmhldHpuZXJDb25maWcuYXBpVG9rZW4gY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBwbGFjZWhvbGRlcj0iWW91ciBIZXR6bmVyIENsb3VkIEFQSSBUb2tlbiJ9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5DcmVhdGUgaXQgYnkgc3dpdGNoaW5nIGludG8gdGhlCiAgICAgICAgICA8YSB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIiBocmVmPSJodHRwczovL2NvbnNvbGUuaGV0em5lci5jbG91ZCI+SGV0em5lciBDbG91ZCBDb25zb2xlPC9hPiwgY2hvb3NpbmcgYSBwcm9qZWN0LCBnbyB0byBBY2Nlc3MgJnJhcnI7IFRva2VucyBhbmQgY3JlYXRlIGEgbmV3IEFQSSB0b2tlbiB0aGVyZS48L3A+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAgICA8ZGl2IGNsYXNzPSJmb290ZXItYWN0aW9ucyI+CiAgICAgIHt7I2lmIGdldHRpbmdEYXRhfX0KICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJnLXByaW1hcnkgYnRuLWRpc2FibGVkIj4KICAgICAgICA8aSBjbGFzcz0iaWNvbiBpY29uLXNwaW5uZXIgaWNvbi1zcGluIj48L2k+IHt7dCAnZ2VuZXJpYy5sb2FkaW5nJ319PC9idXR0b24+CiAgICAgIHt7ZWxzZX19CiAgICAgIDxidXR0b24ge3thY3Rpb24gImdldERhdGEiIH19IGNsYXNzPSJidG4gYmctcHJpbWFyeSIgZGlzYWJsZWQ9e3tub3QgbW9kZWwuaGV0em5lckNvbmZpZy5hcGlUb2tlbn19PkNvbmZpZ3VyZSBTZXJ2ZXI8L2J1dHRvbj4KICAgICAge3svaWZ9fQogICAgICA8YnV0dG9uIHt7YWN0aW9uICJjYW5jZWwifX0gY2xhc3M9ImJ0biBiZy10cmFuc3BhcmVudCI+e3t0ICdnZW5lcmljLmNhbmNlbCd9fTwvYnV0dG9uPgogICAgPC9kaXY+CiAgPC9mb3JtPgogIHt7ZWxzZX19CiAgPGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KICAgIHt7IS0tIFRoaXMgcGFydGlhbCBjb250YWlucyB0aGUgcXVhbnRpdHksIG5hbWUsIGFuZCBkZXNjcmlwdGlvbiBmaWVsZHMgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+CiAgICAgIDxzcGFuPnt7dGVtcGxhdGVPcHRpb25zVGl0bGV9fTwvc3Bhbj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0ib3Zlci1ociByLW10MjAgci1tYjIwIj4KICAgICAgPHNwYW4+U2V0dGluZ3M8L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+UmVnaW9uPC9sYWJlbD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0xMCI+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLmhldHpuZXJDb25maWcuc2VydmVyTG9jYXRpb24pIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAge3sjZWFjaCByZWdpb25DaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5uYW1lfX0gc2VsZWN0ZWQ9e3tlcSBtb2RlbC5oZXR6bmVyQ29uZmlnLnNlcnZlckxvY2F0aW9uIGNob2ljZS5uYW1lfX0+e3tjaG9pY2UuY2l0eX19PC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+SW1hZ2U8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTQiPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBtb2RlbC5oZXR6bmVyQ29uZmlnLmltYWdlSWQpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAge3sjZWFjaCBpbWFnZUNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLmlkfX0gc2VsZWN0ZWQ9e3tvciAoZXEgbW9kZWwuaGV0em5lckNvbmZpZy5pbWFnZUlkIGNob2ljZS5pZCkgKGVxIG1vZGVsLmhldHpuZXJDb25maWcuaW1hZ2UgY2hvaWNlLm5hbWUpfX0+e3tjaG9pY2UuZGVzY3JpcHRpb259fTwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiI+IAogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+U2l6ZTwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtNCI+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLmhldHpuZXJDb25maWcuc2VydmVyVHlwZSkgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0+CiAgICAgICAgICB7eyNlYWNoIHNpemVDaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5uYW1lfX0gc2VsZWN0ZWQ9e3tlcSBtb2RlbC5oZXR6bmVyQ29uZmlnLnNlcnZlclR5cGUgY2hvaWNlLm5hbWV9fT57e2Nob2ljZS5kZXNjcmlwdGlvbn19IC0ge3tjaG9pY2UubWVtb3J5fX1HQiBNZW1vcnkgLSB7e2Nob2ljZS5kaXNrfX1HQiBEaXNrIHNwYWNlPC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+CiAgICAgICAgICA8YSBocmVmPSJodHRwczovL2Nsb3VkaW5pdC5yZWFkdGhlZG9jcy5pby9lbi9sYXRlc3QvdG9waWNzL2V4YW1wbGVzLmh0bWwiIHRhcmdldD0iX2JsYW5rIiByZWw9Im5vb3BlbmVyIG5vcmVmZXJyZXIiPkNsb3VkLWluaXQgQ29uZmlndXJhdGlvbjwvYT4gKG9wdGlvbmFsKQogICAgICAgIDwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMTAiPgogICAgICAgIDx0ZXh0YXJlYSB2YWx1ZT17e21vZGVsLmhldHpuZXJDb25maWcudXNlckRhdGF9fSBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLmhldHpuZXJDb25maWcudXNlckRhdGEpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19IHJvd3M9IjMiIHN0eWxlPSJ3aWR0aDogMTAwJTsgcmVzaXplOiB2ZXJ0aWNhbCI+PC90ZXh0YXJlYT4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgICA8bGFiZWwgY2xhc3M9ImZvcm0tY29udHJvbC1zdGF0aWMiPk5ldHdvcmtzIChPcHRpb25hbC4gWW91IGhhdmUgdG8gY3JlYXRlIHRoZXNlIE5ldHdvcmtzIGluIHRoZSA8YSBocmVmPSJodHRwczovL2NvbnNvbGUuaGV0em5lci5jbG91ZCIgdGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIgbm9yZWZlcnJlciI+SGV0em5lciBDbG91ZCBDb25zb2xlPC9hPik8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTQiPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gJ21vZGlmeU5ldHdvcmtzJyB9fSBtdWx0aXBsZT0idHJ1ZSI+CiAgICAgICAgICB7eyNlYWNoIG5ldHdvcmtDaG9pY2VzIGFzIHxuZXR3b3JrfH19CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7bmV0d29yay5pZH19IHNlbGVjdGVkPXt7YXJyYXktaW5jbHVkZXMgbW9kZWwuaGV0em5lckNvbmZpZy5uZXR3b3JrcyBuZXR3b3JrLmlkfX0+e3tuZXR3b3JrLm5hbWV9fSAoe3tuZXR3b3JrLmlwX3JhbmdlfX0pPC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgICA8ZGl2IGNsYXNzPSJjaGVja2JveCI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+e3tpbnB1dCB0eXBlPSJjaGVja2JveCIgY2hlY2tlZD1tb2RlbC5oZXR6bmVyQ29uZmlnLnVzZVByaXZhdGVOZXR3b3JrfX0KICAgICAgICAgICAgVXNlIHByaXZhdGUgbmV0d29yayAoZmlyc3QgcHJpdmF0ZSBuZXR3b3JrIHdoaWNoIGlzIGF0dGFjaGVkIHdpbGwgYmUgdXNlZCBmb3IgY29tbXVuaWNhdGlvbikKICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+RmlyZXdhbGxzIChCZXRhLCBvcHRpb25hbC4gWW91IGhhdmUgdG8gY3JlYXRlIHRoZXNlIEZpcmV3YWxscyBpbiB0aGUgPGEgaHJlZj0iaHR0cHM6Ly9jb25zb2xlLmhldHpuZXIuY2xvdWQiIHRhcmdldD0iX2JsYW5rIiByZWw9Im5vb3BlbmVyIG5vcmVmZXJyZXIiPkhldHpuZXIgQ2xvdWQgQ29uc29sZTwvYT4pPC9sYWJlbD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC00Ij4KICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uICdtb2RpZnlGaXJld2FsbHMnIH19IG11bHRpcGxlPSJ0cnVlIj4KICAgICAgICAgIHt7I2VhY2ggZmlyZXdhbGxDaG9pY2VzIGFzIHxmaXJld2FsbHx9fQogICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2ZpcmV3YWxsLmlkfX0gc2VsZWN0ZWQ9e3thcnJheS1pbmNsdWRlcyBtb2RlbC5oZXR6bmVyQ29uZmlnLmZpcmV3YWxscyBmaXJld2FsbC5pZH19Pnt7ZmlyZXdhbGwubmFtZX19PC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgICA8bGFiZWwgY2xhc3M9ImZvcm0tY29udHJvbC1zdGF0aWMiPkFkZGl0aW9uYWwgU1NIIEtleXM8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTQiPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gJ21vZGlmeUtleXMnIH19IG11bHRpcGxlPSJ0cnVlIj4KICAgICAgICAgIHt7I2VhY2gga2V5Q2hvaWNlcyBhcyB8a2V5fH19CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7a2V5LmlkfX0gc2VsZWN0ZWQ9e3thcnJheS1pbmNsdWRlcyBtb2RlbC5oZXR6bmVyQ29uZmlnLmFkZGl0aW9uYWxLZXkga2V5LnB1YmxpY19rZXl9fT57e2tleS5uYW1lfX0gKHt7a2V5LmZpbmdlcnByaW50fX0pPC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgICA8bGFiZWwgY2xhc3M9ImZvcm0tY29udHJvbC1zdGF0aWMiPlBsYWNlbWVudCBncm91cDwvbGFiZWw+CiAgICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwuaGV0em5lckNvbmZpZy5wbGFjZW1lbnRHcm91cCkgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0+CiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9IiIgc2VsZWN0ZWQ9Int7bm90IG1vZGVsLmhldHpuZXJDb25maWcucGxhY2VtZW50R3JvdXB9fSI+PC9vcHRpb24+CiAgICAgICAgICAgIHt7I2VhY2ggcGxhY2VtZW50R3JvdXBDaG9pY2VzIGFzIHxwbGFjZW1lbnRHcm91cHx9fQogICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9Int7cGxhY2VtZW50R3JvdXAubmFtZX19IiBzZWxlY3RlZD17e29yIChlcSBtb2RlbC5oZXR6bmVyQ29uZmlnLnBsYWNlbWVudEdyb3VwIHBsYWNlbWVudEdyb3VwLm5hbWUpIChlcSBtb2RlbC5oZXR6bmVyQ29uZmlnLnBsYWNlbWVudEdyb3VwIHBsYWNlbWVudEdyb3VwLmlkKX19Pnt7cGxhY2VtZW50R3JvdXAubmFtZX19ICh7e3BsYWNlbWVudEdyb3VwLnR5cGV9fSk8L29wdGlvbj4KICAgICAgICAgICAge3svZWFjaH19CiAgICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICAgICB7eyEtLSBUaGlzIGZvbGxvd2luZyBjb250YWlucyB0aGUgTmFtZSwgTGFiZWxzIGFuZCBFbmdpbmUgT3B0aW9ucyBmaWVsZHMgLS19fQogICAgIHt7Zm9ybS1uYW1lLWRlc2NyaXB0aW9uIG1vZGVsPW1vZGVsIG5hbWVSZXF1aXJlZD10cnVlfX0KICAgICB7e2Zvcm0tdXNlci1sYWJlbHMgaW5pdGlhbExhYmVscz1sYWJlbFJlc291cmNlLmxhYmVscyBzZXRMYWJlbHM9KGFjdGlvbiAnc2V0TGFiZWxzJykgZXhwYW5kQWxsPWV4cGFuZEFsbCBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikgfX0KICAgICB7e2Zvcm0tZW5naW5lLW9wdHMgbWFjaGluZT1tb2RlbCBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwgfX0KICAgICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyBlcnJvcnMgcHJvZHVjZWQgYnkgdmFsaWRhdGUoKSBpbiB0aGUgY29tcG9uZW50IC0tfX0KICAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAgICAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgdGhlIENyZWF0ZSBhbmQgQ2FuY2VsIGJ1dHRvbnMgLS19fQogICAgIHt7c2F2ZS1jYW5jZWwgc2F2ZT0ic2F2ZSIgY2FuY2VsPShhY3Rpb24gImNhbmNlbCIpfX0KICA8L2Rpdj4KICB7ey9pZn19Cjwvc2VjdGlvbj4K";
  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'hetzner',
    needAPIToken: true,
    config: alias('model.hetznerConfig'),
    app: service(),
    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-hetzner/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);
    },
    bootstrap: function bootstrap() {
      var config = get(this, 'globalStore').createRecord({
        type: 'hetznerConfig',
        additionalKey: [],
        serverType: 'cx21',
        serverLocation: 'nbg1',
        image: '',
        imageId: "168855",
        userData: '',
        networks: [],
        firewalls: [],
        usePrivateNetwork: false,
        serverLabel: [''],
        placementGroup: ''
      });
      set(this, 'model.hetznerConfig', config);
    },
    validate: function validate() {
      this._super();

      if (!this.get('model.hetznerConfig.networks')) this.set('model.hetznerConfig.networks', []);
      if (!this.get('model.hetznerConfig.firewalls')) this.set('model.hetznerConfig.firewalls', []);
      if (!this.get('model.hetznerConfig.serverLabel')) this.set('model.hetznerConfig.serverLabel', []);
      if (!this.get('model.hetznerConfig.additionalKey')) this.set('model.hetznerConfig.additionalKey', []);
      var errors = get(this, 'errors') || [];
      if (!get(this, 'model.name')) errors.push('Name is required');

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    },
    actions: {
      getData: function getData() {
        var that, _ref, _ref2, locations, images, serverTypes, networks, sshKeys, firewalls, placementGroups;

        return regeneratorRuntime.async(function getData$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.set('gettingData', true);
                that = this;
                _context.prev = 2;
                _context.next = 5;
                return regeneratorRuntime.awrap(Promise.all([this.apiRequest('/v1/locations'), this.apiRequest('/v1/images'), this.apiRequest('/v1/server_types'), this.apiRequest('/v1/networks'), this.apiRequest('/v1/ssh_keys'), this.apiRequest('/v1/firewalls'), this.apiRequest('/v1/placement_groups')]));

              case 5:
                _ref = _context.sent;
                _ref2 = _slicedToArray(_ref, 7);
                locations = _ref2[0];
                images = _ref2[1];
                serverTypes = _ref2[2];
                networks = _ref2[3];
                sshKeys = _ref2[4];
                firewalls = _ref2[5];
                placementGroups = _ref2[6];
                this.setProperties({
                  errors: [],
                  needAPIToken: false,
                  gettingData: false,
                  regionChoices: locations.locations,
                  imageChoices: images.images.map(function (image) {
                    return _objectSpread({}, image, {
                      id: image.id.toString()
                    });
                  }),
                  sizeChoices: serverTypes.server_types,
                  networkChoices: networks.networks.map(function (network) {
                    return _objectSpread({}, network, {
                      id: network.id.toString()
                    });
                  }),
                  keyChoices: sshKeys.ssh_keys.map(function (key) {
                    return _objectSpread({}, key, {
                      id: key.id.toString()
                    });
                  }),
                  firewallChoices: firewalls.firewalls.map(function (firewall) {
                    return _objectSpread({}, firewall, {
                      id: firewall.id.toString()
                    });
                  }),
                  placementGroupChoices: placementGroups.placement_groups
                });
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
                this.setProperties({
                  errors: ['Error received from Hetzner Cloud: ' + _context.t0.message],
                  gettingData: false
                });

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, null, this, [[2, 17]]);
      },
      modifyNetworks: function modifyNetworks(select) {
        var options = _toConsumableArray(select.target.options).filter(function (o) {
          return o.selected;
        }).map(function (o) {
          return o.value;
        });

        this.set('model.hetznerConfig.networks', options);
      },
      modifyFirewalls: function modifyFirewalls(select) {
        var options = _toConsumableArray(select.target.options).filter(function (o) {
          return o.selected;
        }).map(function (o) {
          return o.value;
        });

        this.set('model.hetznerConfig.firewalls', options);
      },
      setLabels: function setLabels(labels) {
        var labels_list = labels.map(function (l) {
          return l.key + "=" + l.value;
        });
        this.set('model.hetznerConfig.serverLabel', labels_list);

        this._super(labels);
      },
      modifyKeys: function modifyKeys(select) {
        var _this = this;

        var options = _toConsumableArray(select.target.options).filter(function (o) {
          return o.selected;
        }).map(function (o) {
          return _this.keyChoices.find(function (keyChoice) {
            return keyChoice.id == o.value;
          })["public_key"];
        });

        this.set('model.hetznerConfig.additionalKey', options);
      }
    },
    apiRequest: function apiRequest(path) {
      var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var filterString = "?" + Object.keys(filters).map(function (key) {
        return "".concat(key, "=").concat(filters[key]);
      }).join("&");
      console.log('Requesting: ', 'https://api.hetzner.cloud' + path + (filterString === '?' ? '' : filterString));
      return fetch('https://api.hetzner.cloud' + path + filterString === '?' ? '' : filterString, {
        headers: {
          'Authorization': 'Bearer ' + this.get('model.hetznerConfig.apiToken')
        }
      }).then(function (res) {
        return res.ok ? res.json() : Promise.reject(res.json());
      });
    }
  });
});;
"use strict";

define("ui/components/driver-hetzner/component", ["exports", "nodes/components/driver-hetzner/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});