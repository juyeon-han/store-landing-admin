import { useGetTestApi } from '@/api/service/testApi';

function Post() {
  const { data } = useGetTestApi();
  console.log(data);

  return (
    <div>
      <h1>Post Page</h1>
    </div>
  );
}

export default Post;
