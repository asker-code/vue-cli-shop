'use strict'
const chalk = require('chalk') //定义输入终端样式
const semver = require('semver') // 版本👌
const packageConfig = require('../package.json')
const shell = require('shelljs')  //shell 执行终端命令

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

//版本要求
const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version), //当前node版本
    versionRequirement: packageConfig.engines.node
  }
]

// npm 版本
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), //执行命令拿到版本
    versionRequirement: packageConfig.engines.npm
  })
}

// 导出函数 循环版本要求数组  检测是否符合制定版本 并打印
module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
