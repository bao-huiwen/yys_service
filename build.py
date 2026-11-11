import csv,json,re,html,pathlib
D=pathlib.Path(__file__).parent
# Source of truth: latest six-column table supplied in conversation; tabs separate fields.
raw=r'''实体类|符箓大类|各种形式的符|详情咨询||有四种形式：三角形折纸符、画框符、法扇、卷轴。有三个品级：民间符箓、天师符箓、上古神符。根据形式不同，有效期有差别。详情具体咨询。
实体类|饰品|具体来图可定制|定制详情咨询||根据个人的属性，净化杂气，护佑平安，挡煞避凶，祈福助运，顺遂心意，咕咕buff。需定期寄回重新开光
实体类|香囊|端午香囊|36、58、88||36(安神，驱蚊，防疫，解暑，提神，疏肝解郁)；58(端午)；88(辟邪)
实体类|朱砂|铜仁·万山朱砂视频|6mm圆珠：10元一克。8mm圆珠：15元一克。10mm圆珠：20元一克。12mm圆珠：25元一克。各种雕花：25元一克。特殊朱砂：70元一克。|若开光（时效一年）|至阳之物，驱邪避凶，宁心安神。净化杂气，护佑平安，挡煞避凶，祈福助运，顺遂心意，咕咕buff。需定期寄回重新开光。特殊朱砂：1.特别处理过（供过半年以上，数量不多）；2.珐琅朱砂等特殊款朱砂。
食品类|修愈乐|红瓶（补血）|280/盒|20盒一箱|补血滋阴，健脾益肾，血虚为主，阴血不足，面色萎黄，唇甲色淡，头晕心悸，皮肤干燥，补精血。一盒起发，买一箱送刺梨桂花红茶
食品类|修愈乐|蓝瓶（补气）|280/盒|20盒一箱|益气养血，健脾扶正，定惊，气虚为主，劳倦内伤，针对易疲乏、气短、懒言、精神不振、动则汗出、劳倦后恢复慢。一盒起发，买一箱送刺梨桂花红茶
食品类|茶叶|刺梨桂花红茶|125/盒|60g盒装|好喝。全线产品买三送一（送价格最低的一盒茶叶）
食品类|茶叶|刺梨桂花红茶|375/盒|180g礼盒装|好喝。全线产品买三送一（送价格最低的一盒茶叶）
食品类|茶叶|祁门红茶|256/盒|100g盒装|好喝。全线产品买三送一（送价格最低的一盒茶叶）
食品类|茶叶|祁门红茶|580/盒|250g礼盒装|好喝。全线产品买三送一（送价格最低的一盒茶叶）
食品类|茶叶|祁门红茶|1100/盒|一斤礼盒装|好喝。全线产品买三送一（送价格最低的一盒茶叶）
食品类|茶叶|石阡苔茶（绿茶）|188/盒|100g盒装|好喝。全线产品买三送一（送价格最低的一盒茶叶）
食品类|茶叶|石阡苔茶（绿茶）|445/盒|250g礼盒装|好喝。全线产品买三送一（送价格最低的一盒茶叶）
食品类|茶叶|石阡苔茶（绿茶）|880/盒|一斤礼盒装|好喝。全线产品买三送一（送价格最低的一盒茶叶）
咨询类|中式心理学咨询|中式心理咨询|188+看情况随喜|15min|有明确问题，通过算卦配合一定程度上心理疏导手法，有效帮助各位能够有更多解决方案的灵感和参考。（具体问题）
咨询类|中式心理学咨询|中式心理咨询|388+看情况随喜|45min|不太有明确问题，通过命理的手法，配合一定程度上心理疏导手法，有效帮助各位能够有更多解决方案的灵感和参考。（选一项：事业、财富、田宅、父母、子女、兄弟、夫妻、健康、福德、迁移）
咨询类|中式心理学咨询|中式心理咨询|1280+看情况随喜|2h|相对迷茫、相对无解、以及想要更好地了解自身。手段不限。可以看八字，紫薇，全盘都看，问到你没的问。（事业、财富、田宅、父母、子女、兄弟、夫妻、健康、福德、迁移）
咨询类|中式心理学咨询|解卦决策月卡|2800|一个月|仅解卦+卦的决策，加送实体六十四卦，送实体玉瑶司本子
咨询类|中式心理学咨询|解卦决策年卡|16800|一年|仅解卦+卦的决策，加送实体六十四卦，送实体玉瑶司本子；可体验3次，收20%定金不退
咨询类|中式心理学咨询|月度成长计划|3650|一个月|每天1h定制服务+人生规划、就业指导、方向、思想提升等等，加送咕咕版新编道德经，送实体玉瑶司本子；可体验2天，收20%定金不退
咨询类|择日|合婚|88||合夫妻八字，选日子
咨询类|择日|择日|200||开业、迁居、挂牌择日、沐浴、祭祀、祈福、开光、设醮；纳采、冠笄；入宅、移徙、安床；动土、修造、上梁、竖柱；开市、立券、交易、纳财；出行、谒贵、求医；破土、启攒；裁衣、沐浴、收仓、栽种等。死人下葬不包括在内
咨询类|风水|风水咨询(线上)|详情咨询|平层|只看房屋是否有风水问题。如果没有风水问题，就再考虑别的情况。如果是房子的风水问题，需要线上调，就按照房屋面积收费。前期的288/388元可抵扣后期调风水的价格。可根据情况随喜。
咨询类|风水|风水咨询(线上)|详情咨询|自建房、别墅|只看房屋是否有风水问题。如果没有风水问题，就再考虑别的情况。如果是房子的风水问题，需要线上调，就按照房屋面积收费。前期的288/388元可抵扣后期调风水的价格。可根据情况随喜。
咨询类|风水|风水咨询(线上)|详情咨询|自建房|已入住，调整风水问题，不做局，只调气，理顺杂气。可根据情况随喜。
咨询类|风水|风水咨询(线上)|详情咨询|别墅|已入住，调整风水问题，不做局，只调气，理顺杂气。可根据情况随喜。
咨询类|风水|风水布置（实地）|详情咨询|从选址开始|从毛坯，设计开始。包含可各种特殊要求，比如财运，平安等（包含画符，器物开光，不包含器物）。可根据情况随喜。
咨询类|风水|风水布置（实地）|详情咨询|已建好的房子|装修好，清理，加理气，起势。（包含画符）。可根据情况随喜。
咨询类|风水|阴宅（寻龙点穴）|详情咨询|特殊殡葬服务。咕咕和咕咕师傅一起干。可根据情况随喜。|
课程类|秘法课程|秘法课|880|录制|静心，固财，安神。以群内通知为主
课程类|国学课程|国学基础班|1280|录制|以群内通知为主
课程类|术数课程|梅花易数|2000|直播|以群内通知为主
课程类|术数课程|梅花易数|2800|录制|以群内通知为主
课程类|术数课程|小六壬|免费+30元资料费（电子版）|一节直播（12人起）|以群内通知为主
法会|法会|新年福利-正月初五太岁+财神|详情咨询||功效：拜太岁、迎财神。安奉太岁，稳流年不顺；招聚财禄，旺事业机缘，扫除一年阻滞，迎新春祥瑞，护整年平安顺遂。
法会|法会|正月十五-天官赐福上元节|详情咨询||功效：天官赐福、祈福消灾、转运迎祥。天官赐福临身，消弭灾咎是非，驱散晦气，转运启新，助家宅安宁、诸事吉祥如意。
法会|法会|六月十九-慈航真人成道|详情咨询||功效：慈航真人成道祈福，保平安、消灾、慈悲护佑。慈航真人庇佑，护身心平安，消灾解难，平息烦忧焦虑，化解凶险，慈悲护持，安稳无虞。
法会|法会|七月十五-地官赦罪|详情咨询||功效：地官赦罪、超度祖先、忏悔消业、消灾。地官赦宥过往罪业，超度先祖、有缘宗亲，忏悔消障，化解霉运阻滞，减少是非不顺。
法会|法会|九月九日-重阳节|详情咨询||功效：为家中老人祈健康长寿、自身增补阳气，辟邪。祈家中长辈福寿绵长、身康体健；增补自身阳气，辟除邪祟阴扰，稳固气场，少病少忧。
法会|法会|十月十五-水官解厄|详情咨询||功效：水官解厄、化灾解厄、消灾转运。水官大帝圣寿，化解流年、身心、家宅、事业各类灾厄，清障除滞，扫除旧烦，纳安康顺遂。
法会|法会|文昌（公历6月）|详情咨询||功效：文昌帝君法会，助学业、考试、文职、升迁。文昌帝君加持，文思畅达，利学业应试、考场发挥，助文职晋升，化解阻滞，前程开阔。
法会|法会|二月十五-老君圣诞|详情咨询||功效：老君圣诞法会，有意想不到的效果。
法会|法会|四月十八-老君得道|详情咨询||功效：老君得道法会，有意想不到的效果。
法会|法会|腊月廿四-老君飞仙|详情咨询||功效：老君飞仙法会，有意想不到的效果。
法会|法会|冬至-庆祝新年|详情咨询||只代烧，自行把愿望寄过来
法会|法会|单人全年法会|详情咨询|全年|上面所有法会，符只包含招财符。
法会|个人法会|补财库（可线上线下）|定制|终身|需要根据八字单独测算。先清偿受生债，扫清禄运阻滞，化解无形耗财之障；再修补财库空缺，封堵漏财缺口，拓宽财源、稳固积蓄。依八字单独测算，线上线下均可安排，债清库实，财禄方能安稳留存。咕咕的师傅做。
法会|个人法会|私人定制法会（可线上线下）|3000起|单次单场|专属一对一专项禳解，针对个人流年症结、运势短板、生活阻滞单独上表通疏。可专项化解官非口舌、小人煞、病灾隐疾、感情阻碍、事业瓶颈、家宅不安、阴扰晦气、旧业纠缠、婴灵等各类疑难问题。消宿厄、净气场、破阻碍、开福运，按需定制科仪，精准针对性祈福转运，护佑全年顺遂安稳。
开光|物品供香|供香|500/一个月||50cm以内的物品。神像，照片除外。需定期寄回重新开光
开光|首饰类|首饰开光|300/件|一年|清净饰品杂气，敕令加持，随身护佑，挡避晦气小人，调和自身气场，助缘主平安纳福，诸事稳顺。需定期寄回重新开光
开光|镇物（非神像）|镇物开光（50cm以内）|800/件|终身|净化器物浊气，赋镇煞安宅之力，稳固家宅气场，化解周遭不利煞气，守宅安宁，护阖家平顺。
开光|镇物（非神像）|镇物开光（50cm以上）|1800/件|终身|净化器物浊气，赋镇煞安宅之力，稳固家宅气场，化解周遭不利煞气，守宅安宁，护阖家平顺。
开光|神像|神像开光（50cm以内）|1600/件|终身|择吉行科仪，点窍安灵，恭请神明驻像，承接神威，供祀祈愿有感，护佑家宅兴旺、福慧绵长。
开光|神像|神像开光（50cm以上）|2300/件|终身|择吉行科仪，点窍安灵，恭请神明驻像，承接神威，供祀祈愿有感，护佑家宅兴旺、福慧绵长。'''
CATS=['实体类','食品类','咨询类','课程类','法会','开光']
TAG_RULES={'姻缘':['姻缘','桃花','感情','夫妻','和合'],'求子':['求子','子女','婴灵'],'事业':['事业','就业','升迁','开业','职场','文职'],'财运':['财','财富','招财','固财','纳财','禄'],'学业':['学业','考试','文昌','文思','国学'],'平安':['平安','护佑','消灾','避凶','辟邪','安宅','镇煞'],'家宅':['家宅','房屋','房子','镇宅','田宅','入宅','迁居'],'风水':['风水','寻龙点穴','选址','理气'],'健康关切':['健康','头晕','心悸','气虚','血虚','疲乏','安神','病灾','益气','养血','疏肝'],'决策':['决策','解卦','算卦','命理','八字','选择'],'成长':['成长','规划','思想提升','迷茫','自身'],'婚姻':['合婚','夫妻','纳采','冠笄'],'祈福':['祈福','法会','加持','福运','转运','祈愿'],'开光':['开光','敕令','供香'],'择日':['择日','选日子','选日','择吉'],'学习':['课程','班','易数','小六壬','术数','国学','直播','录制'],'茶饮':['茶叶','红茶','绿茶','苔茶','好喝'],'供奉':['供香','神像','供祀'],'祖先祭祀':['祖先','先祖','超度','祭祀'],'节庆':['端午','正月','重阳','冬至','七月','六月','老君','水官','文昌','天官'],'人际':['小人','口舌','兄弟','父母','关系'],'定制':['定制','专项','特殊要求'],'长期':['月卡','年卡','月度','全年','一个月','一年']}
P=[]
for i,line in enumerate(raw.splitlines(),1):
 a=line.split('|');assert len(a)==6,(i,a)
 cat,sub,name,price,remark,description=a
 text=' '.join([sub,name,remark,description]);tags=[k for k,words in TAG_RULES.items() if any(w in text for w in words)]
 if cat=='实体类':tags+=['实体物品']
 if cat=='食品类':tags+=['食品']
 if cat=='咨询类':tags+=['咨询']
 if cat=='课程类':tags+=['学习']
 if cat=='法会':tags+=['法会','传统仪式']
 if cat=='开光':tags+=['开光','传统仪式']
 if sub=='符箓大类':tags+=['符箓','传统祈福']
 if sub=='风水':tags+=['风水']
 if sub=='择日':tags+=['择日']
 if sub=='修愈乐':tags+=['修愈乐']
 if sub=='茶叶':tags+=['茶饮']
 if sub=='香囊':tags+=['香囊']
 if sub=='饰品':tags+=['饰品']
 if sub=='朱砂':tags+=['朱砂']
 if sub=='个人法会':tags+=['个人法会']
 if '线上' in name or '线上' in description:tags+=['线上']
 if '线下' in name or '线下' in description or '实地' in name:tags+=['线下']
 P.append(dict(id=f'YY-{i:03d}',category=cat,subcategory=sub,name=name,price=price,remark=remark or '待补充',description=description or '待补充',tags=sorted(set(tags)),priceType=('consult' if '咨询' in price or price=='定制' else 'range' if '、' in price or '：' in price else 'fixed_or_start'),spec=remark or '待补充'))
assert len(P)==54,len(P)
(D/'products.json').write_text(json.dumps(P,ensure_ascii=False,indent=2),encoding='utf8')
with (D/'products.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=['id','category','subcategory','name','price','remark','description','tags','priceType']);w.writeheader();w.writerows([{**{k:p[k] for k in w.fieldnames if k!='tags'},'tags':'、'.join(p['tags'])} for p in P])
print('Products:',len(P),'Categories:',{c:sum(p['category']==c for p in P) for c in CATS})
# Fine-grained needs based on explicit descriptions, not invented efficacy.
for p in P:
 if p['name']=='红瓶（补血）':p['tags']+=['血虚']
 if p['name']=='蓝瓶（补气）':p['tags']+=['气虚']
 if p['name']=='秘法课':p['tags']+=['秘法','静心']
 if p['name']=='梅花易数' or p['name']=='小六壬':p['tags']+=['术数']
 if p['name']=='国学基础班':p['tags']+=['国学']
 if p['subcategory']=='符箓大类':p['tags']+=['求子','姻缘'] # Universal navigation only, not a documented specific effect.
 p['tags']=sorted(set(p['tags']))
(D/'products.json').write_text(json.dumps(P,ensure_ascii=False,indent=2),encoding='utf8')
with (D/'products.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=['id','category','subcategory','name','price','remark','description','tags','priceType']);w.writeheader();w.writerows([{**{k:p[k] for k in w.fieldnames if k!='tags'},'tags':'、'.join(p['tags'])} for p in P])
css=(D/'style.css').read_text(encoding='utf8');js=(D/'app.js').read_text(encoding='utf8');data=json.dumps(P,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
page='''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#102820"><title>玉瑶司 · 问心寻解</title><style>'''+css+'''</style></head><body><div id="app"></div><script>window.YY_PRODUCTS='''+data+''';</script><script>'''+js+'''</script></body></html>'''
(D/'index.html').write_text(page,encoding='utf8')
# Twine 2 / Tweego importable SugarCube story. UI is rendered by the same shared JS engine;
# SugarCube State.variables holds the active navigation state, and can be inspected in Twine.
twine_js='''window.YY_PRODUCTS='''+data+''';\n'''+js.replace("function persist(){try{sessionStorage.setItem('yy_v2',JSON.stringify(S))}catch{}}", "function persist(){try{sessionStorage.setItem('yy_v2',JSON.stringify(S));if(window.State&&State.variables)State.variables.yy=S}catch{}}")
twee=''':: StoryTitle\n玉瑶司 · 问心寻解\n\n:: StoryData\n{"ifid":"7C08B946-4A9F-47E2-BF18-CA56AB679C41","format":"SugarCube","format-version":"2.37.3","start":"Start"}\n\n:: StoryStylesheet [stylesheet]\n'''+css+'''\n\n:: StoryJavaScript [script]\n'''+twine_js+'''\n\n:: Start\n<div id="app"></div>\n'''
# Story JavaScript runs before Start renders. Delay initialization until passage is present.
twee=twee.replace("window.YY_APP={products:P,matches,start,render,ROOT,SUB};render();", "window.YY_APP={products:P,matches,start,render,ROOT,SUB};if(document.querySelector('#app'))render();else {let tries=0;let timer=setInterval(()=>{if(document.querySelector('#app')){clearInterval(timer);render()}else if(++tries>100)clearInterval(timer)},30)};")
(D/'yuyaosi.twee').write_text(twee,encoding='utf8')
tree={'start':'见 app.js 的 ROOT（11个入口）','subbranches':'见 app.js 的 SUB（各入口对应细分选项）','helpForms':['咨询','仪式','物品','事务','学习','食品','不限'],'step4':'帮助形式决定细化选项','step5':'预算可跳过；咨询价不当作确定价格','finish':'匹配推荐最多3项；无充分匹配则建议进一步深入沟通','universal_option':'各种形式的符可作为传统祈福咨询选项；不保证解决任何实际问题','contact':'可以在群里或者联系曾曾或火火进行进一步沟通'}
(D/'decision-tree.json').write_text(json.dumps(tree,ensure_ascii=False,indent=2),encoding='utf8')
(D/'README.md').write_text(f'''# 玉瑶司 · 问心寻解（新版）\n\n## 交付文件\n- `index.html`：完整自包含网页，可直接双击预览、部署 GitHub Pages；**原生 HTML/JS 构建，不是 SugarCube 编译产物**。\n- `yuyaosi.twee`：可导入 Twine/Tweego 的 SugarCube 2.37.3 故事源码；需在本机 Twine/Tweego 中选择 SugarCube 2.37.3 编译发布。\n- `products.json`、`products.csv`：本次最新六列表格的全部 **{len(P)} 条记录**，保留相同名称的不同规格/时长记录。\n- `decision-tree.json`：起点、分支和匹配规则。\n- `app.js`、`style.css`：维护源码。`build.py`：重新生成打包文件。\n\n## 产品分类\n{chr(10).join(f'- {c}：{sum(p["category"]==c for p in P)} 条' for c in CATS)}\n\n## 设计与规则\n- 服务图鉴：六个原始大类 → 原始分类2 → 仅名称、价格（同名多规格补充规格提示）→ 详情。\n- 探索：关注方向（含姻缘、求子）→ 细分 → 帮助形式 → 偏好 → 预算可跳过。\n- 匹配：主要需求 +65、大方向 +25、形式 +30（冲突 -45）、细化 +24（冲突 -12）；固定价格超过预算则排除。咨询价、起价、区间价**不做精确价格承诺**，建议人工确认。\n- `各种形式的符` 在所有完成初步探索的路径中作为**可进一步咨询的传统祈福选项**，并不声称其一定能解决任何问题。\n- 无推荐：显示“推荐进一步深入沟通”；咨询提示只写群里、曾曾、火火，不出现联系方式。\n- 页面不收集身份信息；选择只存在浏览器 sessionStorage，不上传服务器。\n\n## GitHub Pages 部署\n1. 新建公开 GitHub 仓库。\n2. 将 `index.html` 上传至仓库根目录并提交。\n3. Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save。\n4. 等待 GitHub Pages 发布；网站访问地址由 GitHub 生成。\n\n## Twine 版本\n在 Twine 2 导入 `yuyaosi.twee`，确保故事格式安装并选择 **SugarCube 2.37.3**，然后 Publish to File。当前运行环境没有可用的 SugarCube 引擎，也无法联网下载，因此不能声称已实际编译出 SugarCube 版 HTML。`index.html` 为独立运行版。\n\n## 维护\n`build.py` 中 `raw` 是当前产品记录源。修改/添加产品时先修改其中六列数据，执行 `python build.py` 重新生成 `products.json`、`products.csv`、`index.html`、`yuyaosi.twee`。标签规则位于 `TAG_RULES`，特殊标签在文件末尾补充。**请勿只编辑 JSON 然后直接运行 build.py，否则会被原始数据覆盖。**\n\n## 需要人工确认\n- 最新表格中 `阴宅（寻龙点穴）` 的“备注”包含特殊殡葬服务说明，“详细描述”为空；因此详细描述标记“待补充”。\n- 部分传统功效描述按原文保留于详情页，不代表科学验证或保证。\n- 部分项目报价为“详情咨询”“定制”“3000起”，需人工核实。\n- 无法在此环境完成真实浏览器点击/手机端/GitHub Pages线上部署测试；请上线前做终端验收。\n''',encoding='utf8')
