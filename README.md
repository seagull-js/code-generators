# Seagull Code Generators

This repo maintains the scaffolding capabilities and tooling for AST transforms
for seagull apps. The primary use case is within the seagul CLI tool, but
other seagull plugins may use the app skeletton generator for their testsuites.

## Example Usage

```typescript
import { App } from '@seagull/code-generators'

new App('demo').toFolder('path/to/folder')
```
