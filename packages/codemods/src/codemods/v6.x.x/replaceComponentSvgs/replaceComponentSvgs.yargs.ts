import path from 'path'

import fg from 'fast-glob'
import task, { TaskInnerAPI } from 'tasuku'

import { getPaths } from '@redwoodjs/project-config'

import runTransform from '../../../lib/runTransform'

export const command = 'replace-component-svgs'
export const description =
  '(v5.x.x->v6.x.x) Converts imported SVGs used as components to React components'

export const handler = () => {
  task('Replace Component Svgs', async ({ setOutput }: TaskInnerAPI) => {
    await runTransform({
      transformPath: path.join(__dirname, 'replaceComponentSvgs.js'),
      targetPaths: fg.sync('**/*.{js,jsx,tsx}', {
        cwd: getPaths().web.src,
        absolute: true,
      }),
    })

    setOutput('All done! Run `yarn rw lint --fix` to prettify your code')
  })
}
