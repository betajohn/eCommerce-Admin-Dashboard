import dbConnect from '@/database/dbConnect';
import { PageViewModel } from '@/database/models/PageView';
import { PageViewType } from '@/database/models/PageView';

await dbConnect();

export async function saveViews(views: PageViewType[]) {
  await PageViewModel.create(views);
}
