import React from 'react';
import { ArrowDown, ArrowUp } from '../../../assets/common-icons';
import Regular from '../../../presentation/typography/regular-text';
import SemiBold from '../../../presentation/typography/semibold-text';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';
import Row from '../../atoms/row';
const ArrowRow = ({
    title = 'I am Title',
    value='',
    isDown=false,
    style,
    children
}) => {
    return (
        <Row style={{ borderBottomWidth: 0.5, borderColor: colors.GD8D8D8, paddingVertical: mvs(7),...style }}>
            <Regular label={title} size={mvs(14)} />
            <Row alignItems='center' justifyContent='flex-end'>
                <SemiBold label={`${value} `} />
                {isDown?<ArrowDown />:<ArrowUp/>}
            </Row>
        </Row>
    );
};
export default ArrowRow;