# Codebase Scanner

Searches for given keyword in your codebase path.

## Sample Config

```
with:
  scan-keyword: 'console.log'
  codebase-path: './codebase/src'
  extension-filter: '.js'
  pass-fail: 'false'
```

## Sample Workflow


```
name: Codebase Scanner

on:
  push:
    branches: [ main ]

jobs:
  scan_for_keyword:
    runs-on: ubuntu-20.04
    steps:
      - name: Get Code Into Codebase
        uses: actions/checkout@v2
        with:
          path: ./codebase
      - name: Codebase Scanner
        id: codebase-scanner
        uses: kiliczsh/codebase-scanner@v1.0.0
        with:
          scan-keyword: 'console.log'
          codebase-path: './codebase/src'
          extension-filter: '.js'
          pass-fail: 'true'
      - name: Display Result
        run: echo " ${{ steps.keyword-scan.outputs.results }}"


```
