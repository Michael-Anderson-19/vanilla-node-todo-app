const Header = ({ setTheme }) => {

    const handleThemeToggle = () => {
        setTheme(previousTheme => {
            return !previousTheme
        })
    }

    return (<div className="header">
        <div className="header__title">
            <h1>TODO LIST</h1>
        </div>
        <div className="header__icon-container">

            <div className="git-icon-wrapper icon-wrapper button-press">
                <a href="https://github.com/Michael-Anderson-19/vanilla-node-todo-app"><i className="fab fa-github"></i></a>
                <div className="tool-tip">
                    <p>go to the repository for this project</p>
                </div>
            </div>

            <div className="linkedin-wrapper icon-wrapper button-press">
                <a href="https://www.linkedin.com/in/michael-anderson-59ba26220/"><i className="fab fa-linkedin"></i></a>
                <div className="tool-tip">
                    <p>Go to developers linkedin</p>
                </div>
            </div>

            <div className="dark-mode-wrapper icon-wrapper button-press" onClick={handleThemeToggle}>
                <i className="fas fa-adjust"></i>
                <div className="tool-tip">
                    <p>toggle light or dark mode</p>
                </div>
            </div>

        </div>
    </div>);


}

export default Header;