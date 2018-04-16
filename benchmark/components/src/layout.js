export default (props, children) => {
  // support for hyperapp
  children = props.children || children

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Acme Company Directory</title>
      </head>
      <body>
        <header role="banner" className="Header">
          <a href="/" title="Click to go to the home page">
            <img
              className="Header-img"
              src="https://placehold.it/200x100"
              width="200"
              height="100"
            />
          </a>
        </header>
        <nav role="navigation" className="Nav" id="site-navigation">
          {props.navigation.map((item, i) => (
            <a
              href={item.url}
              key={`nav-${i}`}
              className={`Nav-link Nav-link--${item.selected ? 'active' : ''}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <main role="main" id="site-content">
          {children}
        </main>
        <footer role="contentinfo" className="Footer">
          <p style={{ marginBottom: 0 }} className="Footer-smallprint">
            <small>{`© ${new Date().getFullYear()} Acme inc.`}</small>
          </p>
        </footer>
      </body>
    </html>
  )
}
