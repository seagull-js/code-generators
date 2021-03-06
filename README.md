# Seagull Code Generators

[![Build Status](https://travis-ci.org/seagull-js/code-generators.svg?branch=master)](https://travis-ci.org/seagull-js/code-generators)
[![npm version](https://badge.fury.io/js/%40seagull%2Fcode-generators.svg)](https://badge.fury.io/js/%40seagull%2Fcode-generators)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](http://www.gnu.org/licenses/lgpl-3.0)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)


This repo maintains the scaffolding capabilities and tooling for AST transforms
for seagull apps. The primary use case is within the seagul CLI tool, but
other seagull plugins may use the app skeletton generator for their testsuites.

## Example Usage

```typescript
import { App } from '@seagull/code-generators'

new App('demo').toFolder('path/to/folder')
```
