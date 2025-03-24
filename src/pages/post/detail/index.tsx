import { useEffect, useState } from 'react';
import { useParams } from 'node_modules/react-router-dom/dist';

function PostDetail() {
  const [initId, setInitId] = useState<string>('');
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) setInitId(params.id);
  }, [params]);

  return (
    <div>
      <h1>{initId} Post Page</h1>
    </div>
  );
}

export default PostDetail;
