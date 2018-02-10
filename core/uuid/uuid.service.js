/* eslint no-magic-numbers: 'off' */
(angular => {
  'use strict'

  /* define service factory */
  function Service() {
    // define lookup table
    const lut = Array(256).fill().map((_, i) => (i < 16 ? '0' : '') + (i).toString(16))

    // psuedo-random number generator
    const prnGesus = () => {
      const dvals = new Uint32Array(4)
      window.crypto.getRandomValues(dvals)
      return {
        d0: dvals[0],
        d1: dvals[1],
        d2: dvals[2],
        d3: dvals[3],
      }
    }

    const formatUuid = ({ d0, d1, d2, d3 }) => {
      return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
      lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' +
      lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
      lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' +
      lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
      lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] +
      lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff]
    }

    const generateUuid = () => formatUuid(prnGesus())

    // TODO figure out how to return a singleton for use like: new Uuid
    //return String(generateUuid())
    return generateUuid
  }

  /* inject service dependencies */
  Service.$inject = []

  /* register service to our module */
  angular
    .module('core.uuid')
    .factory('Uuid', Service)
})(window.angular)
