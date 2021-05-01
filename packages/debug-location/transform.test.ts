import { transform } from './transform'
import { Project } from 'ts-morph'
import path from 'path'

test('transform', () => {
  const file = path.join(__dirname, '__TMP__.ts').replace(/\\/g, '\/')
  expect(
    parse(`debug()`)
  ).toBe(
    `debug.bind({ file: "${file}", line: 0, col: 0 })();`
  )
})


function parse(code: string) {
  const project = new Project()
  project.createSourceFile('__TMP__.ts', code)
  const result = project.emitToMemory({
    customTransformers: {
      after: [ transform() ]
    }
  })
  return result.getFiles()[0].text.trim()
}
