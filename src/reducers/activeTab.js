const activeTab = (state = '1', action) => {
    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            return action.filter
        default:
            return state
    }
};

export default activeTab;