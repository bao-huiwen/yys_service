# 玉瑶司 · 问心寻解

## 文件
- `index.html`：完整离线运行的原生 HTML/CSS/JavaScript 版本，无外部依赖。**此文件不是 SugarCube 编译产物**。
- `yuyaosi.twee`：Twine/Tweego 可导入的 SugarCube 2.37.3 故事源码。
- `products.json`、`products.csv`：全部 60 条原始记录及标签。
- `decision-tree.json`：分支和评分规则。
- `app.js`、`style.css`：维护源文件。

## 部署 GitHub Pages
将 `index.html` 放到仓库根目录，Settings → Pages → Deploy from a branch → main / root，保存。Pages 地址由 GitHub 生成。无需服务器或 API。

## Twine / SugarCube 版本
用 Twine 2 导入 `yuyaosi.twee`（或使用 Tweego 编译），确保安装并选择 SugarCube 2.37.3，然后发布到文件。当前环境无法获取 SugarCube 2.37.3 引擎，因此未伪称 index.html 是已编译的 SugarCube 故事。

## 修改联系方式
在 index.html 中搜索 `window.YY_CONTACT`，填入真实的 `wechat`、`url`、`qr`。外部 URL 应为 HTTPS。

## 修改产品
以 `products.json` 为维护源，按原结构新增记录、唯一 ID 和需求标签。部署文件内的数据被内嵌，更新 JSON 后需重新运行 `python build.py`（或自行同步内嵌 JSON）。`build.py` 的原始记录常量为当前导入源，若编辑 products.json 后直接运行会覆盖，请先更新 build.py 数据源。

## 注意
- 所有 60 条产品记录保留。`适用范围`、`服务说明` 等无原始依据的字段标为待补充。
- 需求标签为原始描述的初步推断，建议逐项人工核验后再正式商用。
- 价格为区间、按件、按克、定制等时，不应使用简单数值比较做硬性预算判断；上线前应继续完善价格模型。
- 不收集个人身份信息；探索状态存在 `sessionStorage`。
- 未配置咨询联系方式时显示待配置，不捏造联系方式。
