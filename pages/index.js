import { useEffect, useState } from "react";
import Prism from "prismjs";

export default function Home() {
  const [spec, setSpec] = useState(null);
  const [search, setSearch] = useState("");
  const [tryOutResponses, setTryOutResponses] = useState({});

  useEffect(() => {
    fetch("/swagger.json") // ganti dengan URL JSON spec backendmu
      .then(res => res.json())
      .then(data => setSpec(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [tryOutResponses]);

  if (!spec) return <div className="loading">Loading Swagger Spec...</div>;

  const paths = Object.entries(spec.paths || {});

  const handleTryOut = async (path, method) => {
    const url = path;
    const options = {
      method: method.toUpperCase(),
      headers: { "Content-Type": "application/json" }
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setTryOutResponses(prev => ({ ...prev, [`${method}-${path}`]: JSON.stringify(data, null, 2) }));
    } catch (err) {
      setTryOutResponses(prev => ({ ...prev, [`${method}-${path}`]: err.message }));
    }
  };

  const copyCurl = (path, method) => {
    const curlCmd = `curl -X ${method.toUpperCase()} "${path}" -H "Content-Type: application/json"`;
    navigator.clipboard.writeText(curlCmd);
    alert("cURL copied!");
  };

  return (
    <div className="container">
      <header>
        <h1>{spec.info?.title || "API Documentation"}</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search endpoint..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search"
          />
          <button id="darkToggle">Toggle Dark Mode</button>
        </div>
      </header>
      <div className="main">
        <aside className="sidebar">
          <h3>Endpoints</h3>
          <ul>
            {paths
              .filter(([path]) => path.includes(search))
              .map(([path]) => (
                <li key={path} onClick={() => {
                  const element = document.getElementById(path);
                  if(element) element.scrollIntoView({ behavior: "smooth" });
                }}>{path}</li>
              ))}
          </ul>
        </aside>
        <section className="content">
          {paths
            .filter(([path]) => path.includes(search))
            .map(([path, methods]) => (
              <div key={path} className="endpoint" id={path}>
                <h2>{path}</h2>
                {Object.entries(methods).map(([method, details]) => (
                  <div key={method} className="method">
                    <div className={`method-header ${method}`}>
                      <span className="method-name">{method.toUpperCase()}</span>
                      <span>{details.summary || ""}</span>
                    </div>
                    <div className="method-body">
                      {details.parameters && details.parameters.length > 0 && (
                        <div>
                          <h4>Parameters:</h4>
                          <ul>
                            {details.parameters.map((p, i) => (
                              <li key={i}>
                                <b>{p.name}</b> ({p.in}) - {p.description || "-"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {details.responses && (
                        <div>
                          <h4>Responses:</h4>
                          <ul>
                            {Object.entries(details.responses).map(([code, resp]) => (
                              <li key={code}>
                                <b>{code}</b> - {resp.description}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="actions">
                        <button onClick={() => copyCurl(path, method)}>Copy cURL</button>
                        <button onClick={() => handleTryOut(path, method)}>Try It Out</button>
                      </div>
                      {tryOutResponses[`${method}-${path}`] && (
                        <pre className="language-json response">
                          <code className="language-json">{tryOutResponses[`${method}-${path}`]}</code>
                        </pre>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </section>
      </div>
      <footer>© YUDZXML Allright Reserved</footer>
    </div>
  );
}