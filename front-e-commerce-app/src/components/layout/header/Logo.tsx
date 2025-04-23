import { Link } from 'react-router-dom';

const Logo: React.FC = () => {

  return (
    <Link id='logo' to="/" className='flex items-center text-black text-[28px] font-semibold gap-4'>
      <img
        src="/images/logo/logo.png"
        alt="logo"
        width={160}
        height={50}
        style={{ width: 'auto', height: 'auto' }}
      />
      ELIXIR
    </Link>
  );
};

export default Logo;
