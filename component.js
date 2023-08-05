"use strict";

define("nodes/components/driver-hetzner/component", ["exports", "shared/mixins/node-driver", "./hetzner"], function (exports, _nodeDriver, _hetzner) {
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

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjaWYgbmVlZEFQSVRva2VufX0KICA8Zm9ybT4KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgci1tYjIwIj4KICAgICAgPHNwYW4+QWNjb3VudCBBY2Nlc3M8L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+QVBJIFRva2VuKjwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMTAiPgogICAgICAgIHt7aW5wdXQgdHlwZT0icGFzc3dvcmQiIHZhbHVlPW1vZGVsLmhldHpuZXJDb25maWcuYXBpVG9rZW4gY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBwbGFjZWhvbGRlcj0iWW91ciBIZXR6bmVyIENsb3VkIEFQSSBUb2tlbiJ9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5DcmVhdGUgaXQgYnkgc3dpdGNoaW5nIGludG8gdGhlCiAgICAgICAgICA8YSB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIiBocmVmPSJodHRwczovL2NvbnNvbGUuaGV0em5lci5jbG91ZCI+SGV0em5lciBDbG91ZCBDb25zb2xlPC9hPiwgY2hvb3NpbmcgYSBwcm9qZWN0LCBnbyB0byBBY2Nlc3MgJnJhcnI7IFRva2VucyBhbmQgY3JlYXRlIGEgbmV3IEFQSSB0b2tlbiB0aGVyZS48L3A+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAgICA8ZGl2IGNsYXNzPSJmb290ZXItYWN0aW9ucyI+CiAgICAgIHt7I2lmIGdldHRpbmdEYXRhfX0KICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJnLXByaW1hcnkgYnRuLWRpc2FibGVkIj4KICAgICAgICA8aSBjbGFzcz0iaWNvbiBpY29uLXNwaW5uZXIgaWNvbi1zcGluIj48L2k+IHt7dCAnZ2VuZXJpYy5sb2FkaW5nJ319PC9idXR0b24+CiAgICAgIHt7ZWxzZX19CiAgICAgIDxidXR0b24ge3thY3Rpb24gImdldERhdGEiIH19IGNsYXNzPSJidG4gYmctcHJpbWFyeSIgZGlzYWJsZWQ9e3tub3QgbW9kZWwuaGV0em5lckNvbmZpZy5hcGlUb2tlbn19PkNvbmZpZ3VyZSBTZXJ2ZXI8L2J1dHRvbj4KICAgICAge3svaWZ9fQogICAgICA8YnV0dG9uIHt7YWN0aW9uICJjYW5jZWwifX0gY2xhc3M9ImJ0biBiZy10cmFuc3BhcmVudCI+e3t0ICdnZW5lcmljLmNhbmNlbCd9fTwvYnV0dG9uPgogICAgPC9kaXY+CiAgPC9mb3JtPgogIHt7ZWxzZX19CiAgPGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KICAgIHt7IS0tIFRoaXMgcGFydGlhbCBjb250YWlucyB0aGUgcXVhbnRpdHksIG5hbWUsIGFuZCBkZXNjcmlwdGlvbiBmaWVsZHMgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+CiAgICAgIDxzcGFuPnt7dGVtcGxhdGVPcHRpb25zVGl0bGV9fTwvc3Bhbj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0ib3Zlci1ociByLW10MjAgci1tYjIwIj4KICAgICAgPHNwYW4+U2V0dGluZ3M8L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+UmVnaW9uPC9sYWJlbD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0xMCI+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17eyBhY3Rpb24gInVwZGF0ZVNlcnZlckxvY2F0aW9uIiB9fT4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IiIgc2VsZWN0ZWQ9e3tlcSBtb2RlbC5oZXR6bmVyQ29uZmlnLnNlcnZlckxvY2F0aW9uIGNob2ljZS5uYW1lfX0+PC9vcHRpb24+CiAgICAgICAgICB7eyNlYWNoIHJlZ2lvbkNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLm5hbWV9fSBzZWxlY3RlZD17e2VxIG1vZGVsLmhldHpuZXJDb25maWcuc2VydmVyTG9jYXRpb24gY2hvaWNlLm5hbWV9fT57e2Nob2ljZS5jaXR5fX08L29wdGlvbj4KICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgIDwvc2VsZWN0PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0icm93IGZvcm0tZ3JvdXAiPgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNvbnRyb2wtc3RhdGljIj5TZXJ2ZXIgVHlwZTwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtNCI+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17eyBhY3Rpb24gInVwZGF0ZVNlcnZlclR5cGUiIH19PgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iIiBzZWxlY3RlZD17e2VxIG1vZGVsLmhldHpuZXJDb25maWcuc2VydmVyVHlwZSBjaG9pY2UubmFtZX19Pjwvb3B0aW9uPgogICAgICAgICAge3sjZWFjaCBzZXJ2ZXJUeXBlQ2hvaWNlcyBhcyB8Y2hvaWNlfH19CiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2UubmFtZX19IHNlbGVjdGVkPXt7ZXEgbW9kZWwuaGV0em5lckNvbmZpZy5zZXJ2ZXJUeXBlIGNob2ljZS5uYW1lfX0+e3tjaG9pY2UuZGVzY3JpcHRpb259fSAtIHt7IGNob2ljZS5hcmNoaXRlY3R1cmUgfX0gLSB7e2Nob2ljZS5tZW1vcnl9fUdCIE1lbW9yeSAtIHt7Y2hvaWNlLmRpc2t9fUdCIERpc2sgc3BhY2U8L29wdGlvbj4KICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgIDwvc2VsZWN0PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+SW1hZ2U8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTQiPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gInVwZGF0ZUltYWdlIiB9fT4KICAgICAgICAgIDxvcHRpb24gdmFsdWU9IiIgc2VsZWN0ZWQ9e3tvciAoZXEgbW9kZWwuaGV0em5lckNvbmZpZy5pbWFnZUlkIGNob2ljZS5pZCkgKGVxIG1vZGVsLmhldHpuZXJDb25maWcuaW1hZ2UgY2hvaWNlLm5hbWUpfX0+PC9vcHRpb24+CiAgICAgICAgICB7eyNlYWNoIGltYWdlQ2hvaWNlcyBhcyB8Y2hvaWNlfH19CiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2UuaWR9fSBzZWxlY3RlZD17e29yIChlcSBtb2RlbC5oZXR6bmVyQ29uZmlnLmltYWdlSWQgY2hvaWNlLmlkKSAoZXEgbW9kZWwuaGV0em5lckNvbmZpZy5pbWFnZSBjaG9pY2UubmFtZSl9fT57e2Nob2ljZS5kZXNjcmlwdGlvbn19PC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJyb3cgZm9ybS1ncm91cCI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgICA8bGFiZWwgY2xhc3M9ImZvcm0tY29udHJvbC1zdGF0aWMiPgogICAgICAgICAgPGEgaHJlZj0iaHR0cHM6Ly9jbG91ZGluaXQucmVhZHRoZWRvY3MuaW8vZW4vbGF0ZXN0L3RvcGljcy9leGFtcGxlcy5odG1sIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIj5DbG91ZC1pbml0IENvbmZpZ3VyYXRpb248L2E+IChvcHRpb25hbCkKICAgICAgICA8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTEwIj4KICAgICAgICA8dGV4dGFyZWEgdmFsdWU9e3ttb2RlbC5oZXR6bmVyQ29uZmlnLnVzZXJEYXRhfX0gb25jaGFuZ2U9e3thY3Rpb24gKG11dCBtb2RlbC5oZXR6bmVyQ29uZmlnLnVzZXJEYXRhKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIiB9fSByb3dzPSIzIiBzdHlsZT0id2lkdGg6IDEwMCU7IHJlc2l6ZTogdmVydGljYWwiPjwvdGV4dGFyZWE+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNvbnRyb2wtc3RhdGljIj5OZXR3b3JrcyAoT3B0aW9uYWwuIFlvdSBoYXZlIHRvIGNyZWF0ZSB0aGVzZSBOZXR3b3JrcyBpbiB0aGUgPGEgaHJlZj0iaHR0cHM6Ly9jb25zb2xlLmhldHpuZXIuY2xvdWQiIHRhcmdldD0iX2JsYW5rIiByZWw9Im5vb3BlbmVyIG5vcmVmZXJyZXIiPkhldHpuZXIgQ2xvdWQgQ29uc29sZTwvYT4pPC9sYWJlbD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC00Ij4KICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uICdtb2RpZnlOZXR3b3JrcycgfX0gbXVsdGlwbGU9InRydWUiPgogICAgICAgICAge3sjZWFjaCBuZXR3b3JrQ2hvaWNlcyBhcyB8bmV0d29ya3x9fQogICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e25ldHdvcmsuaWR9fSBzZWxlY3RlZD17e2FycmF5LWluY2x1ZGVzIG1vZGVsLmhldHpuZXJDb25maWcubmV0d29ya3MgbmV0d29yay5pZH19Pnt7bmV0d29yay5uYW1lfX0gKHt7bmV0d29yay5pcF9yYW5nZX19KTwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiI+CiAgICAgICAgPGRpdiBjbGFzcz0iY2hlY2tib3giPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPnt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9bW9kZWwuaGV0em5lckNvbmZpZy51c2VQcml2YXRlTmV0d29ya319CiAgICAgICAgICAgIFVzZSBwcml2YXRlIG5ldHdvcmsgKGZpcnN0IHByaXZhdGUgbmV0d29yayB3aGljaCBpcyBhdHRhY2hlZCB3aWxsIGJlIHVzZWQgZm9yIGNvbW11bmljYXRpb24pCiAgICAgICAgICA8L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0yIj4KICAgICAgICA8bGFiZWwgY2xhc3M9ImZvcm0tY29udHJvbC1zdGF0aWMiPkZpcmV3YWxscyAoQmV0YSwgb3B0aW9uYWwuIFlvdSBoYXZlIHRvIGNyZWF0ZSB0aGVzZSBGaXJld2FsbHMgaW4gdGhlIDxhIGhyZWY9Imh0dHBzOi8vY29uc29sZS5oZXR6bmVyLmNsb3VkIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIj5IZXR6bmVyIENsb3VkIENvbnNvbGU8L2E+KTwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtNCI+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAnbW9kaWZ5RmlyZXdhbGxzJyB9fSBtdWx0aXBsZT0idHJ1ZSI+CiAgICAgICAgICB7eyNlYWNoIGZpcmV3YWxsQ2hvaWNlcyBhcyB8ZmlyZXdhbGx8fX0KICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tmaXJld2FsbC5pZH19IHNlbGVjdGVkPXt7YXJyYXktaW5jbHVkZXMgbW9kZWwuaGV0em5lckNvbmZpZy5maXJld2FsbHMgZmlyZXdhbGwuaWR9fT57e2ZpcmV3YWxsLm5hbWV9fTwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNvbnRyb2wtc3RhdGljIj5BZGRpdGlvbmFsIFNTSCBLZXlzPC9sYWJlbD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC00Ij4KICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uICdtb2RpZnlLZXlzJyB9fSBtdWx0aXBsZT0idHJ1ZSI+CiAgICAgICAgICB7eyNlYWNoIGtleUNob2ljZXMgYXMgfGtleXx9fQogICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2tleS5pZH19IHNlbGVjdGVkPXt7YXJyYXktaW5jbHVkZXMgbW9kZWwuaGV0em5lckNvbmZpZy5hZGRpdGlvbmFsS2V5IGtleS5wdWJsaWNfa2V5fX0+e3trZXkubmFtZX19ICh7e2tleS5maW5nZXJwcmludH19KTwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNvbnRyb2wtc3RhdGljIj5QbGFjZW1lbnQgZ3JvdXA8L2xhYmVsPgogICAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLmhldHpuZXJDb25maWcucGxhY2VtZW50R3JvdXApIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSIiIHNlbGVjdGVkPSJ7e25vdCBtb2RlbC5oZXR6bmVyQ29uZmlnLnBsYWNlbWVudEdyb3VwfX0iPjwvb3B0aW9uPgogICAgICAgICAgICB7eyNlYWNoIHBsYWNlbWVudEdyb3VwQ2hvaWNlcyBhcyB8cGxhY2VtZW50R3JvdXB8fX0KICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSJ7e3BsYWNlbWVudEdyb3VwLm5hbWV9fSIgc2VsZWN0ZWQ9e3tvciAoZXEgbW9kZWwuaGV0em5lckNvbmZpZy5wbGFjZW1lbnRHcm91cCBwbGFjZW1lbnRHcm91cC5uYW1lKSAoZXEgbW9kZWwuaGV0em5lckNvbmZpZy5wbGFjZW1lbnRHcm91cCBwbGFjZW1lbnRHcm91cC5pZCl9fT57e3BsYWNlbWVudEdyb3VwLm5hbWV9fSAoe3twbGFjZW1lbnRHcm91cC50eXBlfX0pPC9vcHRpb24+CiAgICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICAge3shLS0gVGhpcyBmb2xsb3dpbmcgY29udGFpbnMgdGhlIE5hbWUsIExhYmVscyBhbmQgRW5naW5lIE9wdGlvbnMgZmllbGRzIC0tfX0KICAgICB7e2Zvcm0tbmFtZS1kZXNjcmlwdGlvbiBtb2RlbD1tb2RlbCBuYW1lUmVxdWlyZWQ9dHJ1ZX19CiAgICAge3tmb3JtLXVzZXItbGFiZWxzIGluaXRpYWxMYWJlbHM9bGFiZWxSZXNvdXJjZS5sYWJlbHMgc2V0TGFiZWxzPShhY3Rpb24gJ3NldExhYmVscycpIGV4cGFuZEFsbD1leHBhbmRBbGwgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pIH19CiAgICAge3tmb3JtLWVuZ2luZS1vcHRzIG1hY2hpbmU9bW9kZWwgc2hvd0VuZ2luZVVybD1zaG93RW5naW5lVXJsIH19CiAgICAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19CiAgICAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQogICAgIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIHRoZSBDcmVhdGUgYW5kIENhbmNlbCBidXR0b25zIC0tfX0KICAgICB7e3NhdmUtY2FuY2VsIHNhdmU9InNhdmUiIGNhbmNlbD0oYWN0aW9uICJjYW5jZWwiKX19CiAgPC9kaXY+CiAge3svaWZ9fQo8L3NlY3Rpb24+Cg==";
  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'hetzner',
    config: alias('model.hetznerConfig'),
    app: service(),
    init: function init() {
      var _this = this;

      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-hetzner/template'
      });
      set(this, 'layout', template);
      var apiToken = this.get('model.hetznerConfig.apiToken');

      if (apiToken) {
        (0, _hetzner.apiRequest)(apiToken, '/v1/locations').then(function () {
          return _this.set('needAPIToken', false);
        }).catch(function () {
          return _this.set('needAPIToken', true);
        });
        this.actions.getData();
      } else {
        this.set('needAPIToken', true);
      }

      this._super.apply(this, arguments);
    },
    bootstrap: function bootstrap() {
      var config = get(this, 'globalStore').createRecord({
        type: 'hetznerConfig',
        additionalKey: [],
        serverType: '',
        serverLocation: '',
        image: '',
        imageId: "",
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
        var apiKey, _ref, _ref2, locations, serverTypes, sshKeys, firewalls, placementGroups;

        return regeneratorRuntime.async(function getData$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.set('gettingData', true);
                apiKey = this.get('model.hetznerConfig.apiToken');
                _context.prev = 2;
                _context.next = 5;
                return regeneratorRuntime.awrap(Promise.all([(0, _hetzner.apiRequest)(apiKey, '/v1/locations'), (0, _hetzner.apiRequest)(apiKey, '/v1/server_types'), (0, _hetzner.apiRequest)(apiKey, '/v1/ssh_keys'), (0, _hetzner.apiRequest)(apiKey, '/v1/firewalls'), (0, _hetzner.apiRequest)(apiKey, '/v1/placement_groups')]));

              case 5:
                _ref = _context.sent;
                _ref2 = _slicedToArray(_ref, 5);
                locations = _ref2[0];
                serverTypes = _ref2[1];
                sshKeys = _ref2[2];
                firewalls = _ref2[3];
                placementGroups = _ref2[4];
                this.setProperties({
                  errors: [],
                  needAPIToken: false,
                  gettingData: false,
                  regionChoices: locations.locations,
                  imageChoices: [],
                  serverTypeChoices: serverTypes.server_types,
                  networkChoices: [],
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
                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
                this.setProperties({
                  errors: ['Error received from Hetzner Cloud: ' + _context.t0.message],
                  gettingData: false
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, null, this, [[2, 15]]);
      },
      updateServerLocation: function updateServerLocation(select) {
        var apiKey, options, regionChoices, regionDetails, allNetworks, regionNetworks;
        return regeneratorRuntime.async(function updateServerLocation$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                apiKey = this.get('model.hetznerConfig.apiToken');
                options = _toConsumableArray(select.target.options).filter(function (o) {
                  return o.selected;
                });
                regionChoices = this.get('regionChoices');
                regionDetails = regionChoices.filter(function (i) {
                  return i.name == options[0].value;
                })[0];
                this.set('model.hetznerConfig.serverLocation', options[0].value);
                _context2.next = 7;
                return regeneratorRuntime.awrap((0, _hetzner.apiRequest)(apiKey, '/v1/networks'));

              case 7:
                allNetworks = _context2.sent.networks;
                _context2.next = 10;
                return regeneratorRuntime.awrap((0, _hetzner.getNetworksByZone)(apiKey, regionDetails.network_zone));

              case 10:
                _context2.t0 = function (i) {
                  return _objectSpread({}, i, {
                    id: i.id.toString()
                  });
                };

                regionNetworks = _context2.sent.map(_context2.t0);
                this.set('networkChoices', regionNetworks);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      },
      updateServerType: function updateServerType(select) {
        var apiKey, options, serverTypeChoices, choice, allImages;
        return regeneratorRuntime.async(function updateServerType$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                apiKey = this.get('model.hetznerConfig.apiToken');
                options = _toConsumableArray(select.target.options).filter(function (o) {
                  return o.selected;
                });
                serverTypeChoices = this.get('serverTypeChoices');
                choice = serverTypeChoices.filter(function (i) {
                  return i.name == options[0].value;
                })[0];
                _context3.next = 6;
                return regeneratorRuntime.awrap((0, _hetzner.apiRequest)(apiKey, '/v1/images', {
                  type: ['system', 'snapshot', 'backup'],
                  architecture: choice.architecture
                }));

              case 6:
                allImages = _context3.sent.images;
                this.set('imageChoices', allImages.sort(function (a, b) {
                  return a.name > b.name ? 1 : -1;
                }));
                this.set('model.hetznerConfig.serverType', options[0].value);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, null, this);
      },
      aupdateImage: function aupdateImage(select) {
        var options = _toConsumableArray(select.target.options).filter(function (o) {
          return o.selected;
        });

        var imageChoices = this.get('imageChoices');
        var imageChoice = imageChoices.filter(function (i) {
          return i.id.toString() === options[0].value;
        })[0];
        this.set('model.hetznerConfig.image', imageChoice.id);
        this.set('model.hetznerConfig.imageName', imageChoice.name);
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
        var _this2 = this;

        var options = _toConsumableArray(select.target.options).filter(function (o) {
          return o.selected;
        }).map(function (o) {
          return _this2.keyChoices.find(function (keyChoice) {
            return keyChoice.id == o.value;
          })["public_key"];
        });

        this.set('model.hetznerConfig.additionalKey', options);
      }
    }
  });
});;
"use strict";

define("nodes/components/driver-hetzner/hetzner", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.apiRequest = apiRequest;
  exports.getNetworksByZone = getNetworksByZone;

  var filterArrayToQuerystring = function filterArrayToQuerystring(key, filterValues) {
    return filterValues.map(function (i) {
      return key + '=' + i;
    }).join('&');
  };

  var filtersToQueryString = function filtersToQueryString(filters) {
    return Object.keys(filters).map(function (key) {
      return !Array.isArray(filters[key]) ? "".concat(key, "=").concat(filters[key]) : filterArrayToQuerystring(key, filters[key]);
    }).join("&");
  };

  function apiRequest(key, path) {
    var filters,
        filterString,
        _args = arguments;
    return regeneratorRuntime.async(function apiRequest$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filters = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            filterString = "?" + filtersToQueryString(filters);
            console.log('Requesting: ', 'https://api.hetzner.cloud' + path + (filterString === '?' ? '' : filterString));
            return _context.abrupt("return", fetch('https://api.hetzner.cloud' + path + (filterString === '?' ? '' : filterString), {
              headers: {
                'Authorization': "Bearer ".concat(key)
              }
            }).then(function (res) {
              return res.ok ? res.json() : Promise.reject(res.json());
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function getNetworksByZone(key, zone) {
    var allNetworks;
    return regeneratorRuntime.async(function getNetworksByZone$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(apiRequest(key, '/v1/networks'));

          case 2:
            allNetworks = _context2.sent.networks;
            return _context2.abrupt("return", allNetworks.filter(function (i) {
              return i.subnets.reduce(function (acc, a) {
                return acc || a.network_zone === zone;
              }, false);
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
});;
"use strict";

define("ui/components/driver-hetzner/hetzner", ["exports", "nodes/components/driver-hetzner/hetzner"], function (exports, _hetzner) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _hetzner.default;
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