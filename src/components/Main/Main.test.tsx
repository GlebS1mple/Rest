import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import Main from './Main';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore({})
const render = (component: any) => {
    <Provider store={store}>
        {component}
    </Provider>
}

test('renders main', () => {
    render(<Main />);
});
