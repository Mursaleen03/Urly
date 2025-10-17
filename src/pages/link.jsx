import Error from "@/components/error";
import { UrlState } from "@/context"
import useFetch from "@/hooks/use-fetch";
import { getClicksForUrl } from "db/apiClicks";
import { deleteUrl, getUrl } from "db/apiUrls";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Link = () => {

  const {id} = useParams();
  const {user} = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, {id, user_id: user?.id});

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,

  } = useFetch(getClicksForUrl, id);

  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, [])

  if(error) {
    navigate("/dashboard")
  }
  
  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  return (
    <>
    {(loading || loadingStats) && (
      <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
    )}
    <div className="px-5">
      <div>
        <span>{url?.title}</span>
        <a href="">
          {link}
        </a>
      </div>
      <div></div>
    </div>
    </>
  )
}

export default Link