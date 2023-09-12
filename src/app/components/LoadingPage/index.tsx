import { FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 10;
    background-color: black;
`;
const Icon = styled(FaTwitter)`
    width: 50px;
    color: white;
`;
const LoadingPage = () => {
    return (
        <AnimatePresence>
            <Wrapper>
                <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                    <Icon size="100%" />
                </motion.div>
            </Wrapper>
        </AnimatePresence>
    );
};

export default LoadingPage;
