import { menuItems } from 'components/MenuItems';

import * as S from './index.styles';
import Link from 'next/link';

const Header = () => {
    return (
        <S.Wrapper>
            <S.Header>
                {menuItems.map((item, index) => {
                    return (
                        <Link href={`/${item.link}`} key={index}>
                            <div>{item.icon}</div>
                        </Link>
                    );
                })}
            </S.Header>
            <img
                src="/p2.2.jpeg"
                style={{
                    width: '50px',
                    objectFit: 'cover',
                    height: '50px',
                    borderRadius: '50%',
                }}
            />
        </S.Wrapper>
    );
};

export default Header;
