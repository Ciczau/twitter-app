'use client';
import BodyContent from 'components/BodyContent';
import NotificationSection from 'containers/NotificationSection';

const Notifications = () => {
    return (
        <BodyContent auth={false} activeHeaderItem="Notifications">
            <NotificationSection />
        </BodyContent>
    );
};

export default Notifications;
