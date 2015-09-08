# Reflect-Program
Given a shader program, returns an object containing it's uniform and attribute
locations.

## Usage
`npm i reflect-program`

```js
var getAttibutes = require('reflect-program').getAttributes;
var getUniforms = require('reflect-program').getUniforms;

// create a gl program
var attributes = getAttibutes(glProgram);
var uniforms = getUniforms(glProgram);

gl.uniform1f(uniforms.uAlpha, 0.5);
```

## Testing
`npm t`
