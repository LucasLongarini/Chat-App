import apiService from './apiService';

async function getConversations() {
    try {
        const response = await apiService.get('/conversations');
        return response.conversations;
    }
    catch {
        return undefined;
    }
}

async function searchUsers(username) {
    try {
        username = username.trim();
        const response = await apiService.get(`/users/search?username=${username}`);
        return response.users;
    }
    catch {
        return undefined;
    }
}

async function createNewConversation(userId) {
    const response = await apiService.post(`/conversations`, {
        userIds: [userId]
    });

    return response.conversation;
}

const conversationService = {
    createNewConversation,
    getConversations,
    searchUsers,
}
export default conversationService