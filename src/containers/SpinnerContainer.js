import React from 'react';
import {useSelector} from 'react-redux';
import {SpinnerCenter} from '@components';

const SpinnerContainer = () => {
  const {isFetching} = useSelector(state => state.data);

  return <SpinnerCenter isVisible={isFetching} />;
};

export default SpinnerContainer;
