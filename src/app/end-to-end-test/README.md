# Cypress

- 用户输入邮箱和密码
- 点击登录按钮
- 应用向后端发出请求
- 获取 JWT token 并保存到 localStorage
- 跳转到 Dashboard 页面
- 页面显示当前用户信息和欢迎语

- 单元测试不能覆盖 UI 和路由跳转	login.component.ts 的函数可以被测，但无法确保用户输入时是否真正影响 DOM，或者点击按钮是否真的跳转
- Unit Test 不能测试后端交互	即便用 mock，不能验证真实 API 的响应是否处理正确
- Unit Test 无法保证多个模块整合正确	比如 LoginService + AuthGuard + Router + DashboardComponent


举例常见需要进行E2E逻辑
- 用户注册、登录、登出流程	用户关键路径必须验证
- 购物车添加商品，结账流程	涉及多个模块组合（商品、库存、订单）
- 设置中心保存修改后刷新页面	需要验证持久化和 UI 保持一致
- 权限控制（切换角色）	是否能正确控制按钮/页面的显示与访问

```typescript
describe('Login Flow', () => {
  it('should login and navigate to dashboard', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="welcome-text"]').should('contain', 'Welcome, Test User');
  });
});

```
