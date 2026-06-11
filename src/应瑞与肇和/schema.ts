export const Schema = z.object({
  系统: z.object({
    当前场景: z.enum(['港区办公室', '东煌宿舍', '海滨', '训练场', '永恒之心舰内']).prefault('港区办公室'),
    项圈状态: z.enum(['指挥官', '永恒之心']).prefault('指挥官'),
  }).prefault({}),

  应瑞: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 200)).prefault(50),
    关系阶段: z.string().prefault('初识'),
    誓约: z.boolean().prefault(false),
    当前衣着: z.string().prefault('改良露肩白色紧身内衣 + 紫色宽袖刺绣外褂 + 白色百褶短裙 + 纯白过膝长筒袜'),
  }).prefault({}),

  肇和: z.object({
    好感度: z.coerce.number().transform(value => _.clamp(value, 0, 200)).prefault(50),
    关系阶段: z.string().prefault('初识'),
    誓约: z.boolean().prefault(false),
    当前衣着: z.string().prefault('红白相间旗袍领短款上衣 + 白色多层蓬松短裙 + 白色丝质长筒袜 + 红色描金高跟鞋'),
  }).prefault({}),
}).prefault({});

export type Schema = z.output<typeof Schema>;
