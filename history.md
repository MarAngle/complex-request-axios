### ToDo

### 0.5.10
- 依赖升级

### 0.5.6/7/8/9
- 适配更改

### 0.5.5
- 优化类型传递

### 0.5.4
- refreshToken的数据保存

### 0.5.2/3
- rule.login添加trigger参数，确认登录触发来源
- _request替换isRefresh为trigger参数，实现判断请求是否来自于refresh/login成功后的回调
- responseType.status添加refresh状态
- responseType.status === 'refresh'时认为需要刷新token，调用refresh进行token刷新，刷新成功后重新请求再次触发refresh则直接调用login进行登录
- responseType.status === 'login'时直接调用login进行登录

### 0.5.1
- 依赖升级

### 0.4.6/7
- 优化axios请求方式，通过创建单独实例请求，可实现初始化参数

### 0.4.4/5
- 依赖升级

### 0.4.1/2/3
- BaseRequest的rule简化为单选，简化判断逻辑，需要多个rule可生成多个BaseRequest实例单独实现

### 0.3.6
- 优化undefined校验

### 0.3.5
- responseFormat=>responseParse
- Rule的原format函数更改为parse函数，添加新format函数在请求前实现规则的格式化

### 0.3.0/1/2/3/4
- 依赖大版本升级

### 0.2.1
- 升级依赖（重要）
- 扩展传参类型

### 0.2.0
- 优化函数命名规则：外部函数以字母开头，内部函数以$开头，私有函数以_开头

### 0.1.6/7
- 升级依赖（重要）
- 类型：扩展返回值类型

### 0.1.5
- 升级依赖（重要）

### 0.1.4
- 升级依赖（重要）

### 0.1.2/3
- 优化适配逻辑

### 0.1.1
- 实现基础功能
