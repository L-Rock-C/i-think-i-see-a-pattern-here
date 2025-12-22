const STORAGE_KEY = 'patterns_quiz_history_v1';

export const getHistory = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {
        totalQuestionsAnswered: 0,
        categories: {
            Creational: { correct: 0, total: 0 },
            Structural: { correct: 0, total: 0 },
            Behavioral: { correct: 0, total: 0 }
        }
    };
};

export const saveSessionResults = (sessionResults) => {
    const history = getHistory();
    
    // sessionResults deve ser um array de objetos: { category, isCorrect }
    sessionResults.forEach(result => {
        history.totalQuestionsAnswered++;
        
        if (!history.categories[result.category]) {
            history.categories[result.category] = { correct: 0, total: 0 };
        }

        history.categories[result.category].total++;
        if (result.isCorrect) {
            history.categories[result.category].correct++;
        }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return history;
};

export const getWeakestCategories = () => {
    const history = getHistory();
    const categories = Object.entries(history.categories).map(([name, data]) => {
        const accuracy = data.total === 0 ? 100 : (data.correct / data.total) * 100;
        return { name, ...data, accuracy };
    });

    // Ordena do menor acerto para o maior (os que o usuário mais erra aparecem primeiro)
    return categories.sort((a, b) => a.accuracy - b.accuracy);
};