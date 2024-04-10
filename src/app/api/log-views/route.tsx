import { NextRequest } from 'next/server';
import { saveViews } from '@/database/dbSave';
import { PageViewType } from '@/database/models/PageView';

const views: PageViewType[] = [];

export async function POST(request: NextRequest) {
  const body = await request.json();
  let view: PageViewType = {
    ip: request.ip ?? 'undefined',
    referrer: request.referrer,
    geo: request.geo,
    path: body.pathname,
    timestamp: body.timestamp,
  };
  views.push(view);
  try {
    if (views.length > 20) {
      await saveViews(views);
      views.length = 0;
    }
    return Response.json('ok');
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}
