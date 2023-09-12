'use client';
import BodyContent from 'components/BodyContent';
import MessageSection from 'containers/MessageSection';

const Messages = () => {
    return (
        <BodyContent auth={false} activeHeaderItem="Messages">
            <MessageSection type="chats" />
        </BodyContent>
    );
};

export default Messages;
