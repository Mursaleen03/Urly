import useFetch from "@/hooks/use-fetch";
import { getLongUrl, storeClicks } from "db/apiUrls";
import { useParams } from "react-router-dom"

const RedirectLink = () => {

  const {id} = useParams();
  const {loading, data, fn} = useFetch(getLongUrl, id);

  const { loadingl: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  return (
    <div>Redirect Link</div>
  )
}

export default RedirectLink