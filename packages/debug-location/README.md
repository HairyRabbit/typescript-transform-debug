# debug-location

transform 

```ts
debug('foo')
```

to 

```ts
debug.bind({ file: 'sourcefile', line: 0, col: 0 })()
```
