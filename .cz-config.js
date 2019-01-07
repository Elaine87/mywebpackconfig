'use strict';
module.exports = {
  // 不要更改types, 只允许出现这几种
  types: [{
      value: 'feat',
      name: 'feat:        新功能 (feature)'
    },
    {
      value: 'fix',
      name: 'fix:         修复bug'
    },
    {
      value: 'docs',
      name: 'docs:        文档 (documentation)'
    },
    {
      value: 'chore',
      name: 'chore:       构建过程或辅助工具的变动'
    },
    {
      value: 'style',
      name: 'style:       格式 (不影响代码运行的变动)'
    },
    {
      value: 'performace',
      name: 'performace:   优化项目性能'
    },
    {
      value: 'refactor',
      name: 'refactor:    重构 (即不是新增功能，也不是修改bug的代码变动)'
    },
    {
      value: 'test',
      name: 'test:        增加测试'
    }
  ],
  // 按照项目模块, 自行配置
  scopes: [{
      name: 'src'
    },
    {
      name: 'build'
    },
    {
      name: 'bin'
    },
    {
      name: 'docs'
    },
    {
      name: 'lib'
    },
    {
      name: '/'
    },
  ],
  // 可以根据匹配的类型不同, 显示不一样的scope, 动手实践下!
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */

  // 可以根据项目配置，设置提交项信息
  messages: {
    type: '选择本次提交涉及的类型：\n',
    scope: '\n选择本地提交涉及的范围(可以为空：如果变动是全局的或者无法指定到某一个组件)：',
    // used if allowCustomScopes is true
    customScope: '自定义更新范围:',
    subject: '简短的描述本次提交修改的内容:\n',
    body: '详细描述本地修改的内容 (optional). 使用 "|" 换行:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: '列出本次提交而修复的任何问题 (optional). E.g.: #31, #34:\n',
    confirmCommit: '您确定要继续进行上述提交吗?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix']
};
