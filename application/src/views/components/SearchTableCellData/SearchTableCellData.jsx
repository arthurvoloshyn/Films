import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

import { isBoolean, isObjectOrNull } from '../../../utils/utils';

const SearchTableCellData = ({ cellData }) => {
  if (isBoolean(cellData)) return <Checkbox checked={cellData} disabled />;

  if (Array.isArray(cellData)) {
    return (
      <>
        {cellData.length ? (
          <>
            {cellData.map(({ name }, key) => (
              <div key={name}>
                {`${key + 1}. `}
                {name}
              </div>
            ))}
          </>
        ) : (
          'No data'
        )}
      </>
    );
  }

  if (isObjectOrNull(cellData)) return cellData?.name || 'No data';

  return cellData;
};

SearchTableCellData.propTypes = {
  cellData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    PropTypes.shape({ name: PropTypes.string }),
  ]),
};

SearchTableCellData.defaultProps = {
  cellData: undefined,
};

export default SearchTableCellData;
