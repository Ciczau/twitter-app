import BodyContent from 'components/BodyContent';
import LoginRegisterPage from 'containers/LoginRegisterPage';

const Home = ({ child }) => {
    return (
        <div>
            <BodyContent auth={true} nickName={(data) => console.log(data)}>
                <LoginRegisterPage child={child} />
            </BodyContent>
        </div>
    );
};

export default Home;
