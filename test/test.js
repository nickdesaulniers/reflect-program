var test = require('tape');
var compile = require('compile-shader');
var link = require('link-shader');
var reflect = require('..');

test('finds all attributes and uniforms', function (t) {
  t.plan(8);
  var gl = document.createElement('canvas').getContext('webgl');
  var type = gl.VERTEX_SHADER;
  var src = 'attribute vec2 aA; uniform vec2 uB; void main () { gl_Position = vec4(aA.x, aA.y, uB.x, uB.y); }';
  var vertexShader = compile(gl, type, src);

  type = gl.FRAGMENT_SHADER;
  src = 'precision mediump float; uniform vec4 uC; void main () { gl_FragColor = uC; }'
  var fragmentShader = compile(gl, type, src);

  var program = link(gl, vertexShader, fragmentShader);

  var attributes = reflect.getAttributes(gl, program);
  var uniforms = reflect.getUniforms(gl, program);

  console.log(attributes, uniforms);

  t.ok(Object.keys(attributes).length === 1, 'correct number of attributes');
  t.ok(Object.keys(uniforms).length === 2, 'correct number of uniforms');
  t.ok('aA' in attributes, 'found attribute in vertex shader');
  t.ok('uB' in uniforms, 'found uniform in vertex shader');
  t.ok('uC' in uniforms, 'found uniform in fragment shader');
  t.ok(attributes.aA === 0, 'correct attribute location');
  t.ok(uniforms.uB instanceof WebGLUniformLocation, 'uniform location correct type');
  t.ok(uniforms.uC instanceof WebGLUniformLocation, 'uniform location correct type');

  window.close();
});


