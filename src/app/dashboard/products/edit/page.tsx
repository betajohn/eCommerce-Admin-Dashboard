export default async function Page({
  searchParams,
}: {
  searchParams?: {
    _id?: string;
  };
}) {
  const query = searchParams?._id || '';

  return <div className="w-full">{query}</div>;
}
