// Just a mock data

const asyncRoutes = [
  {
    path: '/permission',
    id: '101',
    isCatalog: '10',
    title: '我的权限',
    icon: 'lock',
    children: [
      {
        path: '/permission/page',
        id: '1001',
        isCatalog: '20',
        name: 'PagePermission',
        title: '权限1',
        children: [
          {
            path: '/tab/index',
            id: '10001',
            isCatalog: '20',
            name: 'DirectivePermissionindex',
            title: '三级目录'
          }
        ]
      },
      {
        path: '/permission/directive',
        id: '1002',
        isCatalog: '20',
        name: 'DirectivePermission',
        title: 'directivePermission'
      },
      {
        path: '/permission/role',
        id: '1003',
        isCatalog: '20',
        name: 'RolePermission',
        title: '权限33'
      }
    ]
  },
  {
    path: '/icons/index',
    isCatalog: '20',
    name: 'icon',
    id: '201',
    icon: 'icon',
    title: '图标'
  },
  {
    path: '/mulu/index',
    isCatalog: '10',
    name: 'mulu',
    id: '202',
    icon: 'icon',
    title: '是目录'
  },
  {
    path: '/sysManage',
    isCatalog: '10',
    name: 'sysManage-mulu',
    id: '1999',
    icon: 'el-icon-s-tools',
    title: '系统管理',
    children: [
      {
        path: '/sysManage/rolePermissions/index',
        isCatalog: '20',
        name: 'rolePermissions',
        id: '19991',
        title: '角色权限'
      },
      {
        path: '/sysManage/icons/index',
        isCatalog: '20',
        name: 'icons',
        id: '19992',
        title: '图标管理'
      }
    ]
  }
]

module.exports = {
  asyncRoutes
}
