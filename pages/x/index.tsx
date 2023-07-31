import BodyContent from 'components/BodyContent';
import LoginRegisterPage from 'containers/HomeSection/LoginRegisterPage';

const Home = ({ child }) => {
    return (
        <div>
            <BodyContent
                child={<LoginRegisterPage child={child} />}
                auth={true}
            />
        </div>
    );
};

export default Home;
