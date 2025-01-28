const LanguageContext = () => { 
    return (
        <LanguageContext.Provider value={{ language: 'english' }}>
        {props.children}
        </LanguageContext.Provider>
    );
    };

export default LanguageContext;