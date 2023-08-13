import BodyContent from 'components/BodyContent';
import LoginRegisterPage from 'containers/LoginRegisterPage';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Home = ({ child }) => {
    return (
        <div>
            <BodyContent
                child={<LoginRegisterPage child={child} />}
                auth={true}
                nickName={(data) => console.log(data)}
            />
        </div>
    );
};

export default Home;
