import apiService from './apiService';

async function getConversations() {
    const response = await apiService.get('/conversations');
    return response.conversations;
}

const conversationService = {
    getConversations,
}
export default conversationService