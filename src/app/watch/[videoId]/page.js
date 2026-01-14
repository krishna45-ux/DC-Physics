import WatchVideoClient from './WatchVideoClient';

export default async function Page({ params }) {
  const { videoId } = await params;
  return <WatchVideoClient videoId={videoId} />;
}
