import L from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './loader.module.css';

function Loader() {
  return (
    <div className={s.loader_container}>
      <L
        type="ThreeDots"
        color="#00BFFF"
        height={200}
        width={200}
        timeout={3000}
      />
    </div>
  );
}

export default Loader;
