function getQualifiersPartial(parameter, storage) {
  var getActive = "getActive" + storage;
  var getLocation = "get" + storage + "Location";
  return function (gl, program) {
    var len = gl.getProgramParameter(program, parameter);
    var qualifiers = {};
    var qualifier = null;
    for (var i = 0; i < len; ++i) {
      qualifier = gl[getActive](program, i).name;
      qualifiers[qualifier] = gl[getLocation](program, qualifier);
    }
    return qualifiers;
  };
};

var webGLProto = WebGLRenderingContext.prototype;

module.exports = {
  getAttributes: getQualifiersPartial(webGLProto.ACTIVE_ATTRIBUTES, "Attrib"),
  getUniforms: getQualifiersPartial(webGLProto.ACTIVE_UNIFORMS, "Uniform"),
};

