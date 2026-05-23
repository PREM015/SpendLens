import { rest } from 'msw';
import { mockAuditResponse } from './data';

export const handlers = [
  rest.post('*/api/v1/audit', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAuditResponse));
  }),
  rest.post('*/api/v1/lead', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: "success" }));
  }),
  rest.post('*/api/v1/summary', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ summary: "Mock AI summary." }));
  }),
  rest.get('*/api/v1/share/:token', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAuditResponse));
  })
];
