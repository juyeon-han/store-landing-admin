import { useNavigate } from 'react-router-dom';

const NotFoundFallback = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>원하시는 페이지를 찾을 수 없습니다.</h1>
      <h2>
        찾으시는 페이지의 주소가 잘못 입력되었거나,
        <br /> 주소가 변경 또는 삭제되어 찾을 수 없습니다.
        <br /> 원하시는 페이지를 찾으시려면 주소를 다시 확인해주세요.
      </h2>
      <button onClick={handleHomeClick}>홈으로 돌아가기</button>
    </div>
  );
};

export default NotFoundFallback;
