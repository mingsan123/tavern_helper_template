export const Schema = z.object({
  系统: z.object({
    项圈状态: z.enum(['佩戴', '摘下']),
    当前身份: z.enum(['指挥官', '冥灵']),
    当前时间: z.string(),
    当前地点: z.string(),
  }),
  冥灵: z.object({
    身体适应度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    淫乱度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    攻守值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    兴奋度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    当前阶段: z.enum(['新生期', '适应期', '成长期', '完全期']),
    衣着: z.object({
      上衣: z.string(),
      下衣: z.string(),
      内衣: z.string(),
      内裤: z.string(),
      颈部: z.string(),
      手部: z.string(),
      腿部: z.string(),
      脚部: z.string(),
    }),
    身体状态: z.object({
      乳房: z.string(),
      阴蒂: z.string(),
      尿道: z.string(),
      小穴: z.string(),
      肛门: z.string(),
      臀部: z.string(),
    }),
  }),
});
export type Schema = z.output<typeof Schema>;
